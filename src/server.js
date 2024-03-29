require("dotenv/config")
require("express-async-errors")

const cookieParser = require("cookie-parser")
const AppError = require("./utils/AppError")
const uploadConfig = require("./config/upload")

const cors = require("cors")
const express = require('express');
const  routes  = require("./routes")

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3333", "http://127.0.0.1:5173", "http://127.0.0.1:3333", "https://food-explorer-daniel.netlify.app"],
  credentials: true
}))

app.use(routes)

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use((error, request, response, next) =>{
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error)
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 3333

app.listen(PORT, () =>{
  console.log(`server is running on port ${PORT}`)
})