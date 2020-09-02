
exports.up = function(knex) {
    return knex.schema.createTable('restaurants', (tbl) => {
        tbl.increments()
        tbl.string('restaurant_name', 20).notNull();
        tbl.string('address').notNull()
        tbl.integer('price_range').notNull();
        
        
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("restaurants");
};
