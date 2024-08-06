/* eslint-disable no-undef */
const client = require('./client.cjs');

const createFlavor = async(name, is_favorite, calories_per_serving) => {
  try {
    const result = await client.query(`
      INSERT INTO flavors (name, is_favorite, calories_per_serving)  
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [name, is_favorite, calories_per_serving]);
    console.log(`${name} flavor inserted correctly`)
    return result.rows[0];
  } catch (error) {
    console.log('Error creating flavor..', error);
    throw error;
  }
};

// get all flavors
const getAllFlavors = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM flavors;
      `)
      return rows;
  } catch (error) {
    console.log('Error fetching flavors in flavors.cjs', error);
    throw error;
}
}

// get single flavor
const getFlavorById = async(id) => {
  try {
    const result = await client.query(`
      SELECT * FROM flavors WHERE id = $1;
    `, [id]);
    return result.rows[0]
  } catch (error) {
    console.log('Error fetching flavor by id in flavors.cjs', error);
    throw error;
  }
}

// post new flavor


// delete single flavor


//  put/update single flavor


module.exports = {
  createFlavor,
  getAllFlavors,
  getFlavorById
}