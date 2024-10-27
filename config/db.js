const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '12345',
  host: 'localhost',
  port: 5432,
  database: 'barber_lite_db',
})

pool.connect((error) => {
  if (error) {
    console.log('\x1b[31m❌ Error to connect data base:\x1b[0m', error);
  } else {
    console.log('\x1b[32m✅ Data base connected!\x1b[0m');
  }
})

module.exports = {
  query: (text, params) => pool.query(text, params)
};
