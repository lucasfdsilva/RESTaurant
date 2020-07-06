
exports.up = function(knex) {
  return knex.schema.table('slots', function(table){
    table.integer('max_capacity').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('slots', function(table){
    table.dropColumn('max_capacity');
  });
};
