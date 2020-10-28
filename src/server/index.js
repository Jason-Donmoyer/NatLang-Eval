const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const projectData = {};

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
    console.log(`Your API key is ${process.env.API_KEY}`);
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
    'method': 'POST',
    'hostname': 'api.meaningcloud.com',
    'path': `/sentiment-2.1?key=${process.env.API_KEY}&lang=en&of=json&txt=happy%20happy%20every`,
    'headers': {},
    'maxRedirects': 20
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        console.log(JSON.parse(body));
        // console.log(body.sentence_list.toString());
        // console.log(body.toJSON());
        const data = JSON.parse(body);
        projectData.data = data;
    });

    res.on("error", function (error) {
        console.error(error);
    });
});

// app.post('/add', function (req, res) {
//     res.send(projectData);
// });

app.get('/sentiment', (req, res) => {
    res.send(JSON.stringify(projectData));
    console.log('Get route called');
});

req.end();