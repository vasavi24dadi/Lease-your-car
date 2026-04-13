const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  host: 'dpg-d7e57a77f7vs73eco0s0-a.oregon-postgres.render.com',
  user: 'lease_your_car_db_user',
  password: 'o5fo954rehDPIZr9uEYsxfZSxWbLtqp7',
  database: 'lease_your_car_db',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

const sql = fs.readFileSync('./backend/database_schema.sql', 'utf8');

pool.query(sql)
  .then(() => { 
    console.log('Tables created successfully!'); 
    process.exit(0); 
  })
  .catch(err => { 
    console.error('Error:', err.message); 
    process.exit(1); 
  });