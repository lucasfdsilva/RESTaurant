
exports.up = function(knex) {
  return knex.schema.createTable('bookings', function(table){
    table.increments('id')
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.integer('slot_id').unsigned().references('id').inTable('slots');
    table.date('date').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('bookings');
};
