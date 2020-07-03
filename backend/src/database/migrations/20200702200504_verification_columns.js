
exports.up = function(knex) {
  return knex.schema.table('users', function(table){
    table.boolean('verified').defaultTo(false);
    table.text('verification_token').notNullable()
    table.text('password_reset_token')
    table.timestamp('password_reset_token_expires_at')
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table){
    table.dropColumn('verified')
    table.dropColumn('verification_token')
    table.dropColumn('password_reset_token')
    table.dropColumn('password_reset_token_expires_at')
  })
};
