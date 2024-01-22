const knex = require("../database/knex")

class DishRepository{

  async dishInsert ({name, category ,description, price, ingredients}){

    const [dish_id] = await knex("dishs").insert({
      name,
      description,
      category,
      price,
    });
    return dish_id
  }

  async insertImgInDish({id, dish}){   
    const updateDish = await knex("dishs").update(dish).where({id});
    return updateDish
  }

  async update({id, dish}){
    await knex("dishs").update(dish).where({id});
  }

  async ingredientInsert(ingredients){
    await knex("ingredients").insert(ingredients);
  }

  async findADish(id){
    const dish = await knex("dishs").where({id}).first()
    const ingredients = await knex("ingredients").where({dish_id: id})
    return {dish, ingredients}
  }

  async delete({id}){
    await knex("dishs").where({id}).delete()
  }

  async findDishById({id}){
    const dishs = await knex("dishs")
    .where({id})
    .first()
    return dishs
  }

  async findDishByName({dishName}){
    const dishs = await knex("dishs")
    .whereLike("name", `%${dishName}%`)
    .orderBy("name")
    return dishs
  }

  async findDishByIngredients(ingredients){
    const dish = await knex("ingredients")
    .select([
      "dishs.id",
      "dishs.name",
      "dishs.category",
      "dishs.description",
      "dishs.price",
      "dishs.dish_img",
    ])
    .whereLike("ingredients.name", `%${ingredients}%`)
    .innerJoin("dishs", "dishs.id", "ingredients.dish_id")
    .groupBy("ingredients.id")
    .orderBy("ingredients.name")

    return dish
  }

  async findAllDishs(){
    const allDishs = await knex("dishs").select("*")
    return allDishs
  }

  async findAllIngredients(){
    const allIngredient = await knex("ingredients").select("*")
    return allIngredient
  }

  async findIngredientsByDishid({id}){
    const response = await knex("ingredients")
    .select("ingredients.name", "ingredients.id")
    .where({dish_id: id})
    return response
  } 

  async findIngredientBynameAndDishid(id, name){
    const response = await knex("ingredients")
    .whereIn("ingredients.name", name)
    .where({dish_id: id})
    return response
  }

  async deleteIgredient({id}){
    const response = await knex("ingredients")
    .where({id})
    .delete()
    return response;
  }


}

module.exports = DishRepository;