const DishRepository = require("../repositories/DishRepository")
const DishService = require("../services/DishService")

class DishImgController{
  async update(request, response){
    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository);
    
    const dishFilename = request.file.filename;
    const {dish_id : id} = request.query

    const updateDish = await dishService.updateImgFromDish({id, dishFilename})

    return response.json(updateDish) 
  }

}

module.exports = DishImgController