const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage");

class DishService{
  constructor(dishRepository){
    this.dishRepository = dishRepository
  }

  async insertNewDish({name, category ,description, price, ingredients}){
    const dish_id = await this.dishRepository.dishInsert({name, category ,description, price})

    const ingredientsInsert =  this.assembleIngredient(ingredients, dish_id)

    await this.dishRepository.ingredientInsert(ingredientsInsert)

    return dish_id
  }

  async updateImgFromDish({ dishFilename, id}){
    const diskStorage = new DiskStorage();
    const dish = await this.dishRepository.findDishById({id});

    if(dish.dish_img !== "null"){
      await diskStorage.deleteFile(dish.dish_img);
    };

    const filename =  await diskStorage.saveFile(dishFilename);

    dish.dish_img = filename;

    const updatedish = await this.dishRepository.insertImgInDish({id, dish})
    
    return updatedish
  }

  async showDish({id}){
    const dish = await this.dishRepository.findADish(id)
    return dish
  }

  async showAllDishs(){
    const dishs = await this.dishRepository.findAllDishs()
    const allIngredient = await this.dishRepository.findAllIngredients()
    const dishWithIngredients = this.assembleDish({dishs, allIngredient})

    return dishWithIngredients
  }

  async deleteDish(id){
    const diskStorage = new DiskStorage();

    const dish = await this.dishRepository.findDishById(id);

    if(dish.dish_img !== "null"){
      await diskStorage.deleteFile(dish.dish_img);
    };

    this.dishRepository.delete(id);
  };

  assembleDish({dishs, allIngredient}){
    const dishWithIngredients = dishs.map(dish =>{
      const dishIngredient = allIngredient.filter(ingredient => ingredient.dish_id === dish.id)
      return{
        ...dish,
        ingredients: dishIngredient
      }
    })
    return dishWithIngredients
  }

  async dishByName({dishName}){
    const dishs = await this.dishRepository.findDishByName({dishName})
    const allIngredient = await this.dishRepository.findAllIngredients()
    const dishWithIngredients = this.assembleDish({dishs, allIngredient})
    return dishWithIngredients
  }

  async dishByIngredients({ingredients}){
    const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim())

    const dishs = await this.dishRepository.findDishByIngredients(filterIngredients)
    const allIngredient = await this.dishRepository.findAllIngredients()
    const dishWithIngredients = this.assembleDish({dishs, allIngredient})

    return dishWithIngredients
  }

  async updateDish({id, name, category , description, price, dish_img, ingredients}){
    const dish = await this.dishRepository.findDishById({id})
    let newIngredients = [];
    let deletedIngredients =[];

    if(dish.length === 0){ throw new AppError("Prato não encontrado", 404) } 

    const dishIngredients = await this.dishRepository.findIngredientsByDishid({id})
    const onlyNameDishIngredients = this.returnOnlyNameDishIngredients(dishIngredients)
    
    ingredients.forEach(ingredient => {
      const isNew = this.checkIfIngredientNotExists(ingredient, onlyNameDishIngredients )
      isNew === undefined 
      ? "" 
      : newIngredients = [...newIngredients, isNew]
    });

    onlyNameDishIngredients.map(ingredientDeleted =>{
      const isDeleted = this.checkIfIngredientHasExcluded(ingredientDeleted, ingredients)
      isDeleted === undefined 
      ? ""
      : deletedIngredients =[...deletedIngredients, isDeleted]
    })

    if(deletedIngredients.length > 0){
        const response = await this.dishRepository.findIngredientBynameAndDishid(id, deletedIngredients)
        response.forEach(deletedingredients=>{
          this.deleteIngredient(deletedingredients)
        })
      } 

    if(newIngredients.length > 0){
      const ingredientsInsert = this.assembleIngredient(newIngredients, id)
      await this.dishRepository.ingredientInsert(ingredientsInsert)
    } 

    dish.name = name ?? dish.name
    dish.category = category ?? dish.category
    dish.description = description ?? dish.description
    dish.price = price ?? dish.price
    dish.dish_img = dish_img ?? dish.dish_img
  
    await this.dishRepository.update({id, dish})
    return dish
  }

  returnOnlyNameDishIngredients(dishIngredients) {
    let onlyNameDishIngredients = [];
    dishIngredients.map(dishIngredient =>{
      onlyNameDishIngredients = [...onlyNameDishIngredients, dishIngredient.name ]
    })
    return onlyNameDishIngredients
  }

  checkIfIngredientNotExists(value, onlyNameDishIngredients ){
    if(onlyNameDishIngredients.includes(value)){
      return
    }  
    return value
  }

  assembleIngredient(ingredients, id){
    const readyIngredients = ingredients.map(ingredient => { 
      return{
        dish_id : id,
        name:ingredient
      }
    });
    return readyIngredients
  }

  checkIfIngredientHasExcluded(deleted, ingredients){
      if(ingredients.includes(deleted)){
        return 
      }
      return deleted
  }

  async deleteIngredient(deleted){
    await this.dishRepository.deleteIgredient({id: deleted.id})
  }
}

module.exports = DishService