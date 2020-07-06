
exports.up = function(knex) {
  return knex.schema.table('bookings', function(table){
    table.integer('number_of_people');
  })
};

exports.down = function(knex) {
  return knex.schema.table('bookings', function(table){
    table.dropColumn('number_of_people');
  })
};
