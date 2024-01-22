const { Router, response } = require("express")
const multer = require("multer")
const uploadConfig = require("../config/upload")

const ensureAuthentucated = require("../middleware/ensureAuthentucated")
const verifyUserAuthorization = require("../middleware/verifyUserAuthorization")

const DishController = require("../controller/DishController")
const DishImgController = require("../controller/DishImgController")

const dishController = new DishController()
const dishImgController = new DishImgController();

const dishRoutes = Router()
const upload = multer(uploadConfig.MULTER)

dishRoutes.use(ensureAuthentucated)

dishRoutes.get("/", dishController.index)
dishRoutes.get("/:id",  dishController.show)
dishRoutes.post("/", verifyUserAuthorization(["admin"]), dishController.create)
dishRoutes.delete("/:id",  verifyUserAuthorization(["admin"]), dishController.delete)
dishRoutes.put("/",  verifyUserAuthorization(["admin"]), dishController.update)

dishRoutes.patch("/dish_img",  verifyUserAuthorization(["admin"]), upload.single("dish_img"), dishImgController.update )


module.exports = dishRoutes;