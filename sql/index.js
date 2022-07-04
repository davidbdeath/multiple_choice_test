require('dotenv').config({ path: '../.env' });

const { Pool } = require('pg');

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};
