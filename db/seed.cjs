/* eslint-disable no-undef */
const client = require('./client.cjs');
const { createFlavor } = require('./flavors.cjs')


const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS flavors;  
    `)
  } catch (error) {
    console.log('Error dropping tables..', error);
    throw error;
  }
};

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE flavors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL UNIQUE,
      is_favorite BOOLEAN NOT NULL,
      calories_per_serving INTEGER,
      available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
  } catch (error) {
    console.log('Error creating tables..', error);
    throw error;
  }
};

const syncAnddSeed = async() => {
  // connect
  client.connect();
  console.log('Connected..');

  // drop tables if
  await dropTables();
  console.log('Tables Dropped..');

  // create tables
  await createTables();
  console.log('Tables Created..');

  // create flavors
  await createFlavor('Vanilla', true, 100);
  await createFlavor('Chocolate', true, 150);
  await createFlavor('Peanut-Butter Swirl', false, 200);
  await createFlavor('Mint-Chocolate Chip', false, 175);
  await createFlavor('Strawberry', false, 80);
  console.log('Flavors Created..');

  // disconnect
  client.end();
  console.log('Disconnected..');
};

syncAnddSeed();