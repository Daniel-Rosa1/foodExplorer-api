const { Router } = require("express")

const UsersController = require("../controller/UsersControllers")
const UsersValidatedController = require("../controller/UsersValidatedController")

const ensureAuthentucated = require("../middleware/ensureAuthentucated")

const usersRoutes = Router()

const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post("/", usersController.create)
usersRoutes.get("/validated", ensureAuthentucated, usersValidatedController.index )

module.exports = usersRoutes;