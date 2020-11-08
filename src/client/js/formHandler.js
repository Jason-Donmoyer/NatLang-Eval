const checkForValidUrl = require('./validityCheck');

const

function handleSubmit(event) {
    event.preventDefault();

    let formInputUrl = document.querySelector('#targetUrl').value;
    console.log("::: Form Submitted :::");

    if (checkForValidUrl(formInputUrl)) {
        console.log('Valid input...')

        fetch('https://localhost:8080/results', {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: formInputUrl,
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);


            });
    } else {
        console.log('Not A Valid URL!');
    }
}

export {
    handleSubmit
};



// async function handleSubmit(event) {
//     event.preventDefault()



//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     //checkForName(formText)

//     let nlpData = await analyzeData('http://localhost:8081/sentiment', formText)
//         .then(nplData => nlpData.json())
//         .then((result) => {
//             console.log(result)
//         })







//     //console.log(req.body);
//     // fetch('http://localhost:8080/test')
//     //     .then(res => res.json())
//     //     .then(function (res) {
//     //         document.getElementById('results').innerHTML = res.message
//     //     })
// }

// const analyzeData = async function (apiUrl, userUrl) {
//     let res = await fetch(apiUrl, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'text/plain'
//         },
//         body: userUrl,
//     })

//     return res
// }