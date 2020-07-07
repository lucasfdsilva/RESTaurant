
exports.up = function(knex) {
  return knex.schema.table('bookings', function(table){
    table.time('start_time');
    table.integer('duration');
  })
};

exports.down = function(knex) {
  return knex.schema.table('bookings', function(table){
    table.dropColumn('start_time');
    table.dropColumn('duration');
  })
};
