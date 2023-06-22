const { insertWpm, getMaxWpm } = require('./db');
const express = require('express');
const app = express();
const port = process.env.NODEPORT || 3000;

app.listen(port, console.log(`Server listening port ${port}`));
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));


app.get('/getMaxWpm', async (req, res) => {
    res.json(await getMaxWpm());
    res.end();
});

// POST method to request WPM
app.post('/requestWpm', (req, res) => {
    insertWpm(req.body.wpm);
    res.end();
});

app.get('*', (req, res) => {
    res.sendStatus(404);
    res.end();
});

