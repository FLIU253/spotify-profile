import axios from 'axios';

function getHashParams(){
    let hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
      }
    return hashParams;
}

export const params = getHashParams();
export const access_token = params.access_token;

const headers = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
};

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });

export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

export const getUserInfo = () => {
  return axios
    .all([getUser(), getFollowing(), getPlaylists(), getTopArtistsLong(), getTopTracksLong()])
    .then(
      axios.spread((user, followedArtists, playlists, topArtists, topTracks) => {
        return {
          user: user.data,
          followedArtists: followedArtists.data,
          playlists: playlists.data,
          topArtists: topArtists.data,
          topTracks: topTracks.data,
        };
      }),
    );
};

export const getRandTopTrackAndArtist = () => {
  return axios.all([getTopArtistsLong(), getTopTracksLong()])
  .then(
    axios.spread((topArtists, topTracks) => {
      const randArtistID = topArtists.data.items[Math.floor(Math.random() * topArtists.data.items.length)].id;
      const randTracksID = topTracks.data.items[Math.floor(Math.random() * topTracks.data.items.length)].id;
        return{
          artistID: randArtistID,
          trackID: randTracksID,
        };
    }),
  );
};

//5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
export const getRecommendations = (artistID, trackID) =>{
  return axios.get(`https://api.spotify.com/v1/recommendations?limit=20&seed_artists=${artistID}&seed_tracks=${trackID}`, { headers });

}

export const createPlaylist = (userId, name) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = JSON.stringify({ name });
  return axios({ method: 'post', url, headers, data });
}

export const addTracksToPlaylist = (playlistId, uris) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
  return axios({ method: 'post', url, headers });
};

export const getAPlaylist = (playlistId) => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });