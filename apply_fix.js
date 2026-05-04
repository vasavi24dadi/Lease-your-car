const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'vas04',
  database: process.env.DB_DATABASE || process.env.DB_NAME || 'lease_your_car',
  port: process.env.DB_PORT || 5432,
});

const sql = fs.readFileSync(path.join(__dirname, 'backend', 'fix_schema.sql'), 'utf8');

console.log('Applying database fix...');

pool.query(sql)
  .then(() => { 
    console.log('Database schema fixed successfully!'); 
    process.exit(0); 
  })
  .catch(err => { 
    console.error('Error applying fix:', err.message); 
    process.exit(1); 
  });
