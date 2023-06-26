const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
});

// function to insert WPM into database
const insertWpm = (wpm) => {
    pool.query(`insert into records(wpm) values (${wpm});`);
}

// funtion to get max WPM from database
const getMaxWpm = async () => {
    const maxWpm = await pool.query('select max(wpm) as max_wpm from records;');
    return maxWpm.rows[0].max_wpm;
}

const getWords = async (language) => {
    const words = await pool.query(`select word from ${language}_words order by random() limit 100;`);
    return words.rows;
}

module.exports = {pool, insertWpm, getMaxWpm, getWords};
