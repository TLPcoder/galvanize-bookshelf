
"use strict"
exports.up = function(knex, Promise) {
 return knex.schema.createTable('books', function(table){
 table.increments("id").primary();
 table.string('title').notNullable().defaultTo("");
 table.string('author').notNullable().defaultTo("");
 table.string('genre').notNullable().defaultTo("");
 table.text('description').defaultTo('').notNullable();
 table.text('coverUrl').notNullable().defaultTo("");
 table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
 table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
 //table.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
 return Promise.all([
   knex.schema.dropTable('books')
 ]);
};
