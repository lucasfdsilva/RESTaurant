
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments('id')
    table.text('first_name').notNullable()
    table.text('last_name').notNullable()
    table.text('email').notNullable()
    table.text('password').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
