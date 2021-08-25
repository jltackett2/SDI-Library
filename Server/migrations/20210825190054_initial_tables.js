
exports.up = function(knex) {

    function createUsers() {
        return knex.schema.createTable('users', table => {
          table.increments('user_id').primary()
          table.string('first_name');
          table.string('last_name');
          table.timestamps(true,true)
        })    
    }
    
    function createBooks() {
      return knex.schema.createTable('books', table => {
        table.increments('id').primary();
        table.string('title');
        table.string('author');
        table.string('ISBN');
        table.integer('user_id');
        table.date('due_date');
        table.timestamps(true,true)
      })
    }
  
    return createUsers()
    .then(createBooks)

};

exports.down = function(knex) {

    function dropUsers() {
      return knex.schema.dropTableIfExists('users');
    }

    function dropBooks() {
      return knex.schema.dropTableIfExists('books');
    }

    return dropBooks()
    .then(dropUsers)
};


