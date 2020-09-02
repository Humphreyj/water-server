
exports.up = async function(knex) {
  return knex.schema.createTable('users', (tbl) => {
      tbl.increments()
      tbl.string('display_name', 20).notNull();
      tbl.string('first_name', 20).notNull();
      tbl.string('last_name', 20).notNull();
      tbl.string('location', 30).notNull();
      tbl.string('email').unique();
      tbl.string("password");
      tbl.string("user_type").notNull().defaultTo("user");
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users");
};
