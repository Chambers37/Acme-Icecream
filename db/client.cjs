/* eslint-disable no-undef */
const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL || 'postgress://Chamb:fullstack@localhost:5432/acme_icecream_shop')

module.exports = client;