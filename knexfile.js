// Update with your config settings.
require("dotenv").config()
module.exports = {

    development: {
      client: 'postgres',
      connection: {
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PHGOST,
        port: process.env.PGPORT,
      },
      migrations: {
        directory: './data/migrations'
      },
      seeds : {
        directory: './data/seeds'
      },
      pool: {
       min: 2,
       max: 10
      }
    },
  };
  