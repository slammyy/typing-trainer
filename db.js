import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;
const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
});

// function to insert WPM into database
export const insertWpm = (wpm) => {
    pool.query(`insert into records(wpm) values (${wpm});`);
}

export const getMaxWpm = async () => {
    const maxWpm = await pool.query('select max(wpm) as max_wpm from records;');
    return maxWpm.rows[0].max_wpm;
}

export const testsCompletedAmount = async () => {
    const testsCompleted = await pool.query('select id from records \
                                             order by id desc limit 1;');
    return testsCompleted.rows[0].id;
}

export const averageWpm = async () => {
    const wpmSum = await pool.query('select sum(wpm) as wpm_sum from records;');
    const wpmSumData = await wpmSum.rows[0].wpm_sum;
    const testsCompleted = await testsCompletedAmount();
    return await wpmSumData / await testsCompleted;
}
