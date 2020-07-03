
exports.up = function(knex) {
  return knex.schema.createTable('tables', function(table){
    table.increments('id')
    table.text('name').notNullable()
    table.integer('max_capacity').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tables');
};
