const express = require('express');
const metascraper = require('metascraper');
const got = require('got');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.send(`
    For more information visit <a target="_blank" href="https://github.com/Dario0117/metascrapper-implementation">https://github.com/Dario0117/metascrapper-implementation</a>
    `)
})

app.post('/', async (req, res) => {
    let { url } = req.body;
    const { body: html } = await got(url)
    const metadata = await metascraper({ html, url })
    res.json(metadata);
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});