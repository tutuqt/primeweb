const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Configure the PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'moviedb',
  password: '1226',
  port: 5432,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        console.error('Error executing query', err.stack);
      } else {
        console.log(result.rows);
      }
    });
  }
});

// Define a route
app.get('/', (req, res) => {
  pool.query('SELECT * FROM movies', (error, results) => {
    if (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Error executing query');
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(0.);
});

// Global error handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason.stack || reason);
  process.exit(1);
});


