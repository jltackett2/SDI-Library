
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {title: "A bad book", author: 'Joe Schmo', ISBN: '1234-567-8910', user_id:1 , due_date: '2021-09-13'},
        {title: "A Worse Book", author: 'Joe Schmo', ISBN: '1231-567-0910', user_id:1 , due_date: '2021-09-13'},
        {title: "A Good Book", author: 'Joey Schmoey', ISBN: '1294-567-8210', user_id: 2 , due_date: '2021-09-13'},
        {title: "A Better Book", author: 'Joey Schmoey', ISBN: '1224-567-8990', user_id:null , due_date: null},
        {title: "The Bomber Mafia", author: 'Malcom Gladwell', ISBN: '978-0-316-29661-8', user_id:null , due_date: null},
        {title: "Range", author: 'David Epstein', ISBN: '1234-567-4092', user_id:null , due_date: null},
        {title: "Ego is The Enemy", author: 'Ryan Holladay', ISBN: '1234-567-8910', user_id:null, due_date: null},
        {title: "Outliers", author: 'Malcom Gladwell', ISBN: '78-1-60389-025-4', user_id:1 , due_date: '2021-09-1'},
        {title: "Lie Down With Lions", author: 'Ken Higgins', ISBN: '778-1-60309-025-4', user_id:2 , due_date: '2021-09-16'},
        {title: "Dark Web", author: 'Mary Higgins Clark', ISBN: '778-1-60309-025-4', user_id:3 , due_date: '2021-09-15'},
        {title: "Alec Has Pants", author: 'Eric Campbell', ISBN: '978-1-60309-025-4', user_id: null, due_date: null},
      ]);
    });
};
