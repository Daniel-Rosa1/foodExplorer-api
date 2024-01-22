const { compare } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const authConfig = require("../config/auth")
const {sign} = require("jsonwebtoken")

class SessionsController{
  async create(request, response){
    const { email, password} = request.body

    const user = await knex("users").where({email}).first()
    
    if(!user){
      throw new AppError("E-mail e/ou senha incorreto", 401)
    }
    
    const passwordMatched = await compare(password, user.password)
    
    if(!passwordMatched){
      throw new AppError("E-mail e/ou senha incorreto", 401)
    }

    const {secret, expiresIn } = authConfig.jwt
    
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    const oneHour = 60 * 60 * 1000;
    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: oneHour

    })

    delete user.password

    response.status(201).json({ user });
  }
}

module.exports = SessionsController