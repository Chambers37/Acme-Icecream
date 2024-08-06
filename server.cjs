/* eslint-disable no-undef */
const express = require('express');
const client = require('./db/client.cjs');
const { createFlavor, getAllFlavors, getFlavorById } = require('./db/flavors.cjs');


const app = express();
client.connect();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get(express.static('dist'));

// get all flavors
app.get('/api/v1/flavors', async(req, res, next) => {
  try {
    const flavors = await getAllFlavors();
    res.send(flavors)
  } catch (error) {
    console.log('Error fetching flavors in server.cjs', error);
    throw error;
  }
});

// get single flavor by id
app.get('/api/v1/flavors/:id', async(req, res, next) => {
  try {
    const { id } = req.params;
    const flavor = await getFlavorById(id);
    res.send(flavor)
  } catch (error) {
    console.log('Error fetching flavor by id in server.cjs', error);
    throw error;
  }
})

// post single flavor
app.post('/api/v1/flavors', async(req, res, next) => {
  try {
    const { name, is_favorite, calories_per_serving } = req.body;
    const newFlavor = await createFlavor(name, is_favorite, calories_per_serving);
    console.log(newFlavor)
    res.send(newFlavor);
  } catch (error) {
    console.log('Error fetching flavors in server.cjs', error);
    throw error;
  }
});

app.listen(PORT, ()=> {
  console.log(`Listening on port: ${PORT}`)
});



/*
POST /api/flavors: Has the flavor to create as the payload, and returns the created flavor.
DELETE /api/flavors/:id: Returns nothing.
PUT /api/flavors/:id: Has the updated flavor as the payload, and returns the updated flavor.
*/