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

export const getUserInfo = () =>  {
  return axios.all([getUser()])
  .then(
    axios.spread((user) => {
      return {
        user: user.data
      }
    })
  )

}

//all API calls will go here