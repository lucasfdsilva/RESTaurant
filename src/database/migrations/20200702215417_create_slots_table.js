
exports.up = function(knex) {
  return knex.schema.createTable('slots', function(table){
    table.increments('id')
    table.time('start_time')
    table.integer('duration')
    table.boolean('monday')
    table.boolean('tuesday')
    table.boolean('wednesday')
    table.boolean('thursday')
    table.boolean('friday')
    table.boolean('saturday')
    table.boolean('sunday')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('slots');
};
