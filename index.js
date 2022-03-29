const express = require('express');
const bodyParser = require('body-parser');
const cookieParser  = require('cookie-parser');
const { readFileSync } = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.get('/', (_req, res) => {
    res
        .cookie('secret', 'i am batman', { httpOnly: true })
        .send(readFileSync('./index.html', 'utf-8'));
});

app.post('/hello', (req, res) => {
    const date = Date.now().toString()

    res.cookie('date', date).send(date);
});

app.post('/beacon-4', (req, res) => {
    console.log('beacon: got body', req.body);
    console.log('beakon: got cookie', req.cookies);

    res.status(200).send(Date.now().toString());
});

app.listen(8144, () => {
    console.log('App is running and listenning 8144');
});