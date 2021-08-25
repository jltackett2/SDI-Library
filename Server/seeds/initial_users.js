
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Mike', last_name:'Ayala'},
        {first_name: 'John', last_name:'Smith'},
        {first_name: 'Bob', last_name:'McCune'},
        {first_name: 'Fred', last_name:'Johnson'}
      ]);
    });
};

