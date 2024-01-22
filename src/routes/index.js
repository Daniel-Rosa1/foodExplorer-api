const {Router} = require("express")

const usersRouter = require("./users.routes")
const sessionRouter = require("./sessions.routes")
const dishRouter = require("./dish.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionRouter)
routes.use("/dish", dishRouter)

module.exports = routes