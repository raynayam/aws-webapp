const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000;
const pg = require('pg')
const { Client } = pg

// Initialize PostgreSQL Client
const client = new Client({
  // Ensure you configure database connection details here
  connectionString: process.env.DATABASE_URL, // or other connection
});

// Connect to PostgreSQL
client.connect().then(() => {
  console.log('Connected to PostgreSQL!')
}).catch((err) => {
  console.log('Connection failed:', err)
});

app.use(express.json());

app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/questions', async function (req, res) {
  try {
    const result = await client.query(`
      SELECT
        (
          SELECT
             questions.uuid
          FROM questions
          WHERE
            questions.uuid NOT IN (
              SELECT question_id FROM answers
            )
          LIMIT 1
        ) as question_index,
         (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
          SELECT * FROM questions
        ) array_row) as questions;
      `);
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching questions');
  }
});

app.put('/submit', function (req, res) {
  try {
    const result = await client.query(`
      SELECT
        (
          SELECT
             questions.uuid
          FROM questions
          WHERE
            questions.uuid NOT IN (
              SELECT question_id FROM answers
            )
          LIMIT 1
        ) as question_index,
         (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
          SELECT * FROM questions
        ) array_row) as questions;
      `);
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching questions');
  }
  console.log(req.body)
});


app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/style.css'));
});

app.get('/app.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/app.js'));
});

console.log(`PLANNING TO USE PORT: ${port}`)

app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}!`))
