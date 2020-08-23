const {Pool} = require('pg')
require('dotenv').config()
//Destructure Pool from the pg library
const pool = new Pool();
//create a new pool


module.exports = {
    query: (text, params) => pool.query(text,params),
}