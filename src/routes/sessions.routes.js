const Router = require("express")

const SessionsController = require("../controller/SessionsController")
const sessionsController = new SessionsController()

const sectionRoutes = Router()

sectionRoutes.post("/", sessionsController.create)

module.exports = sectionRoutes