import { insertWpm, getMaxWpm, testsCompletedAmount, averageWpm} from './db.js';
import express from 'express';

const app = express();
const port = process.env.NODEPORT || 3000;

app.listen(port, console.log(`Server listening port ${port}`));
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.get('/get_max_wpm', async (req, res) => {
    res.json(await getMaxWpm());
    res.end();
});

app.get('/get_total_completed', async (req, res) => {
    res.json(await testsCompletedAmount());
    res.end();
});

app.get('/get_average_wpm', async (req, res) => {
    res.json(await averageWpm());
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

