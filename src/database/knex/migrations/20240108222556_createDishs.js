exports.up = knex => knex.schema.createTable("dishs" , table =>{
  table.increments("id");
  table.text("name").notNullable();
  table.text("category").notNullable();
  table.text("description").notNullable();
  table.integer("price").notNullable();
  table.text("dish_img").default("null")

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dish");