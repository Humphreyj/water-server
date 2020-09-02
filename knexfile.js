// Update with your config settings.
require("dotenv").config()
module.exports = {

    development: {
      client: 'postgres',
      connection: {
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
      },
      migrations: {
        directory: './db/migrations'
      },
      seeds : {
        directory: './db/seeds'
      },
      pool: {
       min: 2,
       max: 10
      }
    },
  };
  