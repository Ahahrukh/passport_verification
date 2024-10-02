import express from 'express'
import CONSTANTS from './src/config/constants.js';
import Database from './src/config/connection.js';
import userRouter from './src/routes/user_auth_route.js';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req , res)=>{
    res.send({message:"Welcome to home page" , status:200 , success:true});
})


mongoose.connect(CONSTANTS.database_url , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let db = mongoose.connection

let gfs;
db.once('open', () => {
  gfs = Grid(Database.db, mongoose.mongo);
  gfs.collection('uploads');
});

app.use("/api/v1" , userRouter)

app.get('/api/v1/all/images', async (req, res) => {
  try {
    const file = await gfs.files.find();
    // if (!file) return res.status(404).json({ err: 'File not found' });

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving file' });
  }
});


app.listen(CONSTANTS.port , async()=>{
  try {
    await Database
    console.log("Connected to the database")
  } catch (error) {
    console.log(error.message)
  }
  console.log("We are live on the Port : "+CONSTANTS.port)
})