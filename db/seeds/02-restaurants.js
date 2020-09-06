
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {
          id: 0, 
          restaurant_name: 'El Dorado',
          address: '3300 W Anderson Ln, Austin, TX 78757',
          price_range: 2
        },
        {
          id: 1, 
          restaurant_name: 'Dai Due',
          address: '2406 Manor Rd, Austin, TX 78722',
          price_range: 5
        },
        {
          id: 2, 
          restaurant_name: "Bartlett's Restaurant",
          address: '2408 W Anderson Ln, Austin, TX 78757',
          price_range: 5
        },
        
        
      ]);
    });
};
