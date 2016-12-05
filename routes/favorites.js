'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const knex = require("../knex");
const router = express.Router();

// YOUR CODE HERE
router.get("/favorites", function(req, res) {
    knex.select('users.id', 'favorites.book_id', 'favorites.user_id', 'books.createdAt', 'books.updatedAt', 'books.title', 'books.author', 'books.genre', 'books.description', 'books.coverUrl').from('books').innerJoin('favorites', 'favorites.book_id', 'books.id').innerJoin('users', 'users.id', 'favorites.user_id')
        .then(function(user) {
            res.json(user);
        });
});

router.get("/favorites/check", function(req, res) {
    knex('books').innerJoin('favorites', 'favorites.book_id', 'books.id').innerJoin('users', 'users.id', 'favorites.user_id').where('favorites.book_id', req.query.bookId)
        .then(function(user) {
            if (user.length > 0) {
                res.status(200).json(true);
            } else {
                res.status(200).json(false);
            }
        });
});
router.post("/favorites", function(req, res) {
    var id = req.body.bookId;
    knex('favorites').insert({
            id: 2,
            book_id: id,
            user_id: 1
        }).returning("*")
        .then(function(newInput) {
            delete newInput[0].created_at;

            delete newInput[0].updated_at;
            res.json(newInput[0]);
        });
});

router.delete("/favorites", function(req, res) {
    var id = req.body.bookId;
    console.log("IDDDDD", id);
    console.log("cookie", req.cookies);
    // if (!req.cookies['/token']) {
    //   console.log("no cookie");
    //     res.status(401).send('Unauthorized');
    // } else {
    knex('favorites').where('book_id', id).del().returning('*')
        .then(function(deleteThis) {

            delete deleteThis[0].id;
            delete deleteThis[0].created_at;
            delete deleteThis[0].updated_at;
            res.status(200).json(deleteThis[0]);
        });
    //}
});


module.exports = router;
