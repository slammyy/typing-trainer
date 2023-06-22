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
    pool.query(`insert into records(wpm) values (${wpm})`)
}

module.exports = {pool, insertWpm};
