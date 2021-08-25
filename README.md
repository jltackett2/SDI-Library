# SDI LIBRARY


API ENDPOINTS
- "/books"
  -GET
  -RES [
        {
          book_title:
          author:
          isbn:
          Is_checked_Out:
          user_id:
          due_date:
        }
      ]

- "/books/:bookId"
  -GET (bookId)
  -RES {
          book_title:
          author:
          isbn:
          Is_checked_Out:
          user_id:
          due_date:
       }

-/books/:bookId/checkout/:userId
  -PATCH (bookId, userId)
  -RES 
    -If available:
        {
          book_title:
          author:
          isbn:
          Is_checked_Out:true
          user_id: user_id
          due_date: today + two weeks
        }
    -If user has checked it out already:
      "You already have this checked out, due date is..."

    -If another user checked it out:
      "This book in unavailable, check back after (due date)"

-/books/:bookId/return
  -PATCH (bookId)
  -RES {
          book_title:
          author:
          isbn:
          Is_checked_Out: false
          user_id: null
          due_date: null
        }

-/books/new
  -POST (in body: {
          book_title:
          author:
          isbn:
          Is_checked_Out:
          user_id:
          due_date:
        })
  -RES {
          book_title:
          author:
          isbn:
          Is_checked_Out:
          user_id:
          due_date:
        }