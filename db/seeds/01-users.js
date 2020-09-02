
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 0,
          display_name: 'Cool_Lucas',
          first_name: 'Lucas',
          last_name: 'Beans',
          location: 'Austin. Tx',
          email: 'Lucas@cool.com',
          password: '$2b$14$VNe5jFxPyfMUhKAdBpijh.LJ9o.UOWzw6bb5n5z1V6TNfn6Omh8du',
          user_type: 'admin'
        }
        
      ]);
    });
};
