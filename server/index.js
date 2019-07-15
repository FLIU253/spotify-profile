// SPOTIFY WEB API AUTHORIZATION CODE FLOW
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
// https://github.com/spotify/web-api-auth-examples

const express = require('express');
const keys = require('./keys'); 
const cors = require('cors');

const CLIENT_ID = keys.client_id;
const CLIENT_SECRET = keys.client_secret;
let REDIRECT_URI = 'http://localhost:8888/callback';
let FRONTEND_URI = 'localhost:3000';

const port = process.env.PORT || 8888;
const app = express();

app.use(cors());

app.get('/', (req,res) => {
    res.send("Hello World");
});

app.listen(port, ()=> {
    console.log("server started");
});