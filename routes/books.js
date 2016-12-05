'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
var knex = require('../knex');


router.get("/books", function(req, res){
  console.log("hello");
  knex('books').orderBy('title')
  .then(function(books){
    res.json(books);
  }).catch(function(err){
    console.log(err);
  });
});
// YOUR CODE HERE

router.get("/books/:id", function(req,res){
  knex('books').where("id", req.params.id)
  .then(function(book){
    res.json(book[0]);
  }).catch(function(err){
    console.log(err);
  });
});

router.post("/books", function(req,res){
  knex('books')
  .insert({title:req.body.title, author:req.body.author, genre: req.body.genre,description:req.body.description, coverUrl:req.body.coverUrl})
  .returning(['title','author','coverUrl','description','genre','id'])
  .then(function(newBook){
    console.log("newbook", newBook)
    res.json(newBook[0]);
  }).catch(function(err){
    console.log(err);
  });
});

router.patch("/books/:id",function(req,res){
  knex('books').where('id', req.params.id).update(req.body).returning('*')
  .then(function(updatedBook){
    res.json(updatedBook[0]);
  }).catch(function(err){
    console.log(err);
  });
});

router.delete("/books/:id",function(req,res){
  console.log(req.params.id);
  knex('books').where("id",req.params.id).del().returning(["author", 'coverUrl','description','genre','title'])
  .then(function(deleteBook){
    res.json(deleteBook[0]);
  });
});

module.exports = router;
