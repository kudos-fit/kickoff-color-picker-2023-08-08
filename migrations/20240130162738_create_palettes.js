exports.up = function (knex) {
  return knex.schema.createTable("palettes", function (table) {
    table.increments("id");
    table.string("color1", 18).notNullable();
    table.string("color2", 18).notNullable();
    table.string("color3", 18).notNullable();
    table.string("color4", 18).notNullable();
    table.string("color5", 18).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("palettes");
};
