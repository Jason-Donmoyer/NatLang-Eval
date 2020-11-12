const dotenv = require('dotenv');
dotenv.config();
const PORT = 8080;

const serverMsg = [
    'Server is eagerly waiting on port:',
    'Server is cocked, locked and ready to rock on port:',
    'Server is hot to trot on port:',
    'Server is eavesdropping on port:',
    'Have you talked to your server today? It\'s listening on port:',
];

const displayMsg = serverMsg[Math.floor(Math.random() * serverMsg.length)];

let projectData = [];


//const path = require('path');
const mockAPIResponse = require('./mockAPI');
const fetch = require("node-fetch");

const API_KEY = process.env.API_KEY;
const ApiBaseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.text());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

// Test server route
app.get('/test', (req, res) => {
    res.send(mockAPIResponse);
});

// Post data from API call
app.post('/results', async (req, res) => {
    const response = await fetch(`${ApiBaseUrl}${API_KEY}&lang=auto&url=${req.body}`);

    try {
        const data = await response.json();
        projectData = {
            confidence: data.confidence,
            subjectivity: data.subjectivity,
            score_tag: data.score_tag,
            irony: data.irony,
        };
        res.send(data);
    } catch (err) {
        console.log('error', err);
    }
});

app.get('/results', (req, res) => {
    res.send(projectData);
})

// Server port
app.listen(PORT, () => {
    console.log(`${displayMsg} ${PORT}`);
});