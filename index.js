import express from 'express'
import CONSTANTS from './src/config/constants.js';
import Database from './src/config/connection.js';
import userRouter from './src/routes/user_auth_route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req , res)=>{
    res.send({message:"Welcome to home page" , status:200 , success:true});
})

app.use("/api/v1" , userRouter)

app.listen(CONSTANTS.port , async()=>{
  try {
    await Database
    console.log("Connected to the database")
  } catch (error) {
    console.log(error.message)
  }
  console.log("We are live on the Port : "+CONSTANTS.port)
})