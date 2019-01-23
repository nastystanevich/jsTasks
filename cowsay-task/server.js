const express = require('express');
const cowsay = require('cowsay');

const app = express();
const port = 3000;

app.get('/', function (req, res) {
    const queryString = getQueryString(req);
    res.redirect(`/cow/say?${queryString}`);
});
app.get('/:actor', function (req, res) {
    const queryString = getQueryString(req);
    res.redirect(`/${req.params.actor}/say?${queryString}`);
});
app.get('/:actor/:method', function (req, res) {
    const method = req.params.method || "say";
    const actor = req.params.actor === "cow" ? "default" : req.params.actor;
    const textToSay = req.query['phrase'] || `I'm a ${actor === "default" ? "cow" : actor} and I can ${method}`

    const result = cowsay[method]({
        text : textToSay,
        f: actor
    });
    res.send(result);
});

app.listen(port, function () {
  console.log(`Cowsay listen on http://localhost:${port}!`);
});

function getQueryString(req) {
    let queryStringParts = new Array();
    for(const key in req.query) {
        queryStringParts.push(key + '=' + encodeURIComponent(req.query[key]));
    }
    const queryString = queryStringParts.join('&');
    return queryString;
};
