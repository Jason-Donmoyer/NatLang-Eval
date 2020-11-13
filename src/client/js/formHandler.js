const fetch = require('node-fetch');

const {
    checkForValidUrl
} = require('./validityCheck');



function handleSubmit(event) {
    event.preventDefault();

    let formInputUrl = document.querySelector('#targetUrl').value;
    console.log(formInputUrl);
    console.log("::: Form Submitted :::");

    if (checkForValidUrl(formInputUrl)) {
        console.log('Valid input...')

        fetch('http://localhost:8080/results', {
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
                console.log(res.confidence);
                document.querySelector('#confidence').textContent = res.confidence;
                document.querySelector('#subjectivity').textContent = res.subjectivity;
                document.querySelector('#score').textContent = scoreName(res.score_tag);
                document.querySelector('#irony').textContent = res.irony;
            });
    } else {
        console.log('Not A Valid URL!');
    }
}

const scoreName = (scoreAbbr) => {
    switch (scoreAbbr) {
        case 'P+':
            return 'Very Positive';
            break;
        case 'P':
            return 'Positive';
            break;
        case 'N':
            return 'Negative';
            break;
        case 'N+':
            return 'Very Negative';
            break;
        case 'NEU':
            return 'Neutral';
            break;
        case 'NONE':
            return 'No Sentiment';
            break;
        default:
            return 'Invalid Data';
            break;
    }
}

export {
    handleSubmit,
    scoreName
}