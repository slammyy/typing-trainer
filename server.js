const { insertWpm, getMaxWpm, getWords } = require('./db');
const express = require('express');
const app = express();
const port = process.env.NODEPORT || 3000;

app.listen(port, console.log(`Server listening port ${port}`));
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.get('/get_max_wpm', async (req, res) => {
    res.json(await getMaxWpm());
    res.end();
});

app.get('/get_words/:language', async (req, res) => {
    res.json(await getWords(req.params.language));
    res.end();
});

// POST method to request WPM
app.post('/request_wpm', (req, res) => {
    insertWpm(req.body.wpm);
    res.end();
});

app.get('*', (req, res) => {
    res.sendStatus(404);
    res.end();
});

