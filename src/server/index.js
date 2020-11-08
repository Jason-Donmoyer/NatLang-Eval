//REQUIRE MODULES

// allow env file access
const dotenv = require('dotenv');
dotenv.config;

const path = require('path');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');
const PORT = 8080;

const express = require('express');
const app = express();

const bodyParser = require(body - parser);
app.use(bodyParser.text());

const cors = require('cors');
app.use(cors);

// API path and credentials
const baseApiUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const ApiKey = process.env.API_KEY;


///////////////////////////////////////////
app.use(express.static('dist'));

// ROUTES

app.get('/', (req, res) => {
    res.sendfile('dist/index.html');
});

app.get('/test', (req, res) => {
    res.send(mockAPIResponse);
});

// POST route and API call
app.post('/results', async (req, res) => {
    const response = await fetch(`${baseApiUrl}${ApiKey}&lang=auto&url=${req.body}`);

    try {
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log('There has been an error....', error);
    }
});

// SERVER PORT
app.listen(PORT, () => {
    console.log(`Server is cocked, locked and ready to rock on port: ${PORT}`);
});






// const dotenv = require('dotenv');
// dotenv.config();
// var path = require('path')
// const express = require('express')
// var bodyParser = require('body-parser')
// const minipassFetch = require("minipass-fetch")
// const mockAPIResponse = require('./mockAPI.js')

// const projectData = {};

// const app = express()

// app.use(express.static('dist'))

// // app.use(bodyParser.urlencoded({
// //     extended: false
// // }))

// app.use(bodyParser.text())

// console.log(__dirname)

// app.get('/', function (req, res) {
//     // res.sendFile('dist/index.html')
//     res.sendFile(path.resolve('src/client/views/index.html'))
// })

// // designates what port the app will listen to for incoming requests
// app.listen(8080, function () {
//     console.log('Example app listening on port 8080!')
//     console.log(`Your API key is ${process.env.API_KEY}`);
// })

// // app.get('/test', function (req, res) {
// //     res.send(mockAPIResponse)
// // })

// var https = require('follow-redirects').https;
// var fs = require('fs');

// var options = {
//     'method': 'POST',
//     'hostname': 'api.meaningcloud.com',
//     'path': `/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&url=http://www.twitter.com`,
//     'headers': {},
//     'maxRedirects': 20
// };

// // app.post('/sentiment', function (request, resolve) {

// //     var req = https.request(options, function (res) {
// //         var chunks = [];

// //         res.on("data", function (chunk) {
// //             chunks.push(chunk);
// //         });

// //         res.on("end", function (chunk) {
// //             var body = Buffer.concat(chunks);
// //             console.log(body.toString());
// //             console.log(JSON.parse(body));
// //             // console.log(body.sentence_list.toString());
// //             // console.log(body.toJSON());
// //             const data = JSON.parse(body);
// //             projectData.data = data;
// //             console.log([data.status.code, data.status.msg, data.confidence]);
// //         });

// //         res.on("error", function (error) {
// //             console.error(error);
// //         });
// //     });
// // })

// app.post('/sentiment', getDataCall)

// async function getDataCall(req, res) {
//     console.log(req.body.name);
//     const apiUrl = `/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&url=${req.body.name}`
//     const response = await minipassFetch(apiUrl)
//     const recievedData = await response.json()
//     console.log(recievedData)
//     res.send(recievedData)
// }

// // app.post('/', function (req, res) {
// //     res.send(projectData);
// // });

// // app.get('/sentiment', (req, res) => {
// //     res.send(JSON.stringify(projectData));
// //     console.log('Get route called');
// // });



// // req.end();