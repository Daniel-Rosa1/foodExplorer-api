const knex = require("../database/knex")
const DishRepository = require("../repositories/DishRepository")
const DishService = require("../services/DishService")

class DishController{
  async create(request, response){
    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository);
   
    const {name, category ,description, price, ingredients} = request.body;
    
    const dish_id =  await dishService.insertNewDish({name, category ,description, price,  ingredients})

    return response.status(201).json(dish_id)
  }
  
  async delete(request, response){
    const {id} = request.params
    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository);

    await dishService.deleteDish({id})

    return response.status(200).json()
  }

  async update(request, response){
    const {id, name, category ,description, price, dish_img, ingredients} = request.body;
    
    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository);
    
    const dish = await dishService.updateDish({id, name, category ,description, price, dish_img, ingredients})

    return response.json(dish)
  }

  async show(request, response){
    const {id} = request.params

    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository);

    const dish =  await dishService.showDish({id})
    return response.status(200).json(dish)
  }

  async index(request, response) {
    const {dishName, ingredients} = request.query
    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository);

    if(dishName){
      const dishByName = await dishService.dishByName({dishName})
      if(Object.keys(dishByName).length !==0){
        return response.status(200).json(dishByName)
      }
    }

    if(ingredients){
      const dishByIngredients = await dishService.dishByIngredients({ingredients});
      return response.status(200).json(dishByIngredients);
    }

    if(!dishName && !ingredients){
      const allDishs = await dishService.showAllDishs();
      return response.status(200).json(allDishs);
    }  
  }

}

module.exports = DishController
