const express = require('express')
const app = express()
const knex = require('knex')(require('./knexfile.js').development)
const cors = require('cors')

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', methods: 'GET, PUT, PATCH, POST, DELETE' }))

app.get('/books', function (req,res) {
    knex
    .select('*')
    .from('books')
    .then((data) => res.status(200).json(data))
    .catch((err) => {
        res.status(404).json({
            message: 'The data could not be found, please try again',
            error: err
        })
    })
});

app.get('/books/:bookId', async function (req, res) {
 try {
  const book = req.params.bookId; 
  const result = await knex
    .select('*')
    .from('books')
    .where({'id': book})
  return res.status(200).send(result) 
 } catch(err) {
  return res.send(err)

 }
})

app.patch('/books/:bookId/checkout/:user_id', async function (req, res) {
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf()); 
    date.setDate(date.getDate() + days); 
    return date; 
  }

  let date = new Date()
  
  try {
    console.log('You are checking out a book')
    const result = await knex('books')
    .select('*')
    .where({id:req.params.bookId})
    .update({
      user_id:req.params.user_id,
      due_date: date.addDays(14)
    })
    .returning('*')
    return res.status(200).send(result)
  } catch(err) {
    console.log('There was an err', err)
   return res.send(err)
  }
 })

//IT WORKS!
//i'm updating trello with what works 
//sound good
//i'll commit this, thanks, can you shoot me the git repo name when done?

 app.patch('/books/:bookId/return', function (req,res) {
     knex('books')
     .where({id:req.param.bookId})
     .update({
         user_id:null,
         due_date:null
    })
    .returning('*')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.send(err))
 })



module.exports = app