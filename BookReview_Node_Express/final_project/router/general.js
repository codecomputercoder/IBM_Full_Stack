const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  users.push({"username":req.query.username,"password":req.query.password});
  return res.status(300).json({message: "Customer successfully registered. Now you can Login."});
});

// Get the book list available in the shop
//public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({books: books});
  
//});
public_users.get('/', async function (req, res) {
  try {
    const allBooks = await new Promise((resolve, reject) => {
      // simulate async operation with setTimeout
      setTimeout(() => {
        resolve(books);
      }, 1000);
    });
    res.json(allBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    let bookss = books[isbn];
   
  return res.status(300).json({message: bookss});
 });
 
 












// Get book details based on author

public_users.get('/author/:author', function(req, res) {
  const author = req.params.author;
  let booksByAuthor = [];

  const promise = new Promise(function(resolve, reject) {
    for (let key in books) {
      if (books[key].author === author) {
        books[key].isbn = key;
        let newbook = { ...books[key] };
        delete newbook.author;
        booksByAuthor.push(newbook);
      }
    }

    if (booksByAuthor.length === 0) {
      reject({ message: 'No books found for the given author' });
    } else {
      resolve({ booksByAuthor: booksByAuthor });
    }
  });

  promise.then(function(result) {
    res.status(200).json(result);
  }).catch(function(error) {
    res.status(404).json(error);
  });
});




/*
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let booksByAuthor=[];
  for (let key in books) {
    if (books[key].author === author) {
      // If the author matches, add the book object to the booksByAuthor array
      //booksByAuthor.push({isbn : key});
      books[key].isbn=key;
      let newbook={...books[key]};
      delete newbook.author;
      booksByAuthor.push(newbook);
    }
  }
  return res.status(300).json({booksByAuthor: booksByAuthor});
});

*/
/*
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  // Wrap the code in a Promise
  new Promise((resolve, reject) => {
    // Check if the book with the given ISBN exists
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  })
  // Send the book details if it exists, otherwise send an error message
  .then((book) => {
    return res.status(200).json({ book });
  })
  .catch((error) => {
    return res.status(404).json({ message: error });
  });
});


*/ 
// Get all books based on title
/*
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let booksBytitle=[];
  for (let key in books) {
    if (books[key].title === title) {
      // If the title matches, add the book object to the booksBytitle array
      //booksBytitle.push({isbn : key});
      books[key].isbn=key;
      let newbook={...books[key]};
      delete newbook.title;
      booksBytitle.push(newbook);
    }
  }
  return res.status(300).json({booksBytitle: booksBytitle});
});*/


public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let booksByTitle = [];

  // Wrap the loop in a Promise
  const getBooksByTitle = new Promise((resolve, reject) => {
    for (let key in books) {
      if (books[key].title === title) {
        // If the title matches, add the book object to the booksByTitle array
        books[key].isbn = key;
        let newBook = { ...books[key] };
        delete newBook.title;
        booksByTitle.push(newBook);
      }
    }
    // If booksByTitle array is empty, reject the Promise
    if (booksByTitle.length === 0) {
      reject("No books found with the given title.");
    } else {
      resolve(booksByTitle);
    }
  });

  // Use .then() and .catch() to handle Promise resolution and rejection
  getBooksByTitle
    .then((books) => {
      return res.status(200).json({ booksByTitle: books });
    })
    .catch((error) => {
      return res.status(404).json({ message: error });
    });
});



/*
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let bookss = books[isbn];
   
  return res.status(300).json({message: bookss.reviews});
});

*/
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;


  // Wrap the code in a Promise
  new Promise((resolve, reject) => {
    // Check if the book with the given ISBN exists
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  })
  // Send the book details if it exists, otherwise send an error message
  .then((book) => {
    return res.status(200).json({ book });
  })
  .catch((error) => {
    return res.status(404).json({ message: error });
  });
});






module.exports.general = public_users;
