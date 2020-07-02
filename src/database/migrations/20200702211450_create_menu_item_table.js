
exports.up = function(knex) {
  return knex.schema.createTable('menu_items', function(table){
    table.increments('id')
    table.text('name').notNullable()
    table.integer('price')
    table.text('description')
    table.integer('stock')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('menu_items');
};
