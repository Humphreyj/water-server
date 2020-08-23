const knex = require("knex")
const knexFile = require('../knexfile').development;

module.exports = knex(knexFile);