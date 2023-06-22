const { insertWpm } = require('./db');
const express = require('express');
const app = express();
const port = process.env.NODEPORT || 3000;

app.listen(port, console.log(`Server listening port ${port}`));
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

// POST method to request WPM
app.post('/wpm', (req, res) => {
    insertWpm(req.body.data);
    res.end();
});
