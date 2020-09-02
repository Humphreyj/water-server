
exports.up =  async function(knex) {
    await knex.schema.createTable("reviews", (tbl) => {
		tbl.increments();
        tbl.integer("users_id").references("id").inTable('users').onDelete("CASCADE");
        tbl.integer("restaurant_id").references("id").inTable('restaurants').onDelete("CASCADE");
        tbl.text("content").notNull();
        tbl.integer('rating').notNull();
		
	});
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("reviews");
};
