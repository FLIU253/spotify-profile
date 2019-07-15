// SPOTIFY WEB API AUTHORIZATION CODE FLOW
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
// https://github.com/spotify/web-api-auth-examples

const express = require('express');
const keys = require('./keys'); 
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request');

const CLIENT_ID = keys.client_id;
const CLIENT_SECRET = keys.client_secret;
let REDIRECT_URI = 'http://localhost:8888/callback';
let FRONTEND_URI = 'localhost:3000';
const port = process.env.PORT || 8888;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
const stateKey = 'spotify_auth_state';


const app = express();
app.use(cors()).use(cookieParser());

app.get('/', (req,res) => {
    res.send("Hello World");
});

app.get('/login', function(req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    //your application requests authorization
    const scope ='user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

    res.redirect(
        `https://accounts.spotify.com/authroize${querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        })}`
    );
});

app.get('/callback', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        },
        headers: {
          Authorization: `Basic ${new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
        json: true,
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          const refresh_token = body.refresh_token;

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            `${FRONTEND_URI}/#${querystring.stringify({
              access_token,
              refresh_token,
            })}`,
          );
        } else {
          res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
        }
      });
    }
  });

  app.get('/refresh_token', function(req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({ access_token });
      }
    });
  });
app.listen(port, ()=> {
    console.log("server started");
});