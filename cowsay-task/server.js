const express = require('express');
const cowsay = require('cowsay');

const app = express();
const port = 3000;

//http://localhost:3000/cow/think
app.get('/', function (req, res) {
    const result = cowsay.say({
        text : `I'm a cow`
    });
    res.send(result);
});
app.get('/:actor/:method', function (req, res) {
    const method = req.params.method;
    const actor = req.params.actor === "cow" ? "default" : req.params.actor;
    console.log(actor);

    const result = cowsay[method]({
        text : `I'm a ${actor} and I can ${method}`,
        f: actor
    });
    res.send(result);
});
app.get('/:actor/:method/:message', function (req, res) {
    const method = req.params.method;
    const actor = req.params.actor === "cow" ? "default" : req.params.actor;

    const result = cowsay[method]({
        text : req.params.message,
        f: actor
    });
    res.send(result);
});

app.listen(port, function () {
  console.log(`Cowsay listen on http://localhost:${port}!`);
});
