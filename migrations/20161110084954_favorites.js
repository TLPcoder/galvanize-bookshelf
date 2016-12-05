"use strict";
exports.up = function(knex, Promise) {
 return Promise.all([
  knex.schema.createTable('favorites',function(table){
    table.increments('id').primary();
    table.integer('book_id').notNullable();
    table.foreign('book_id').references('id').inTable('books').onDelete('cascade');
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
]);
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favorites')
  ]);
};
