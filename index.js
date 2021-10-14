const express= require("express");
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors')
const todoRoutes=require("./routes/todo")
const userRoutes=require("./routes/userRoutes")

 


//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(
    console.log("DB NOT CONNECTED")
);


const port=8000

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//routes
app.get("/",(req,res)=>{
    res.send("hello ")
})
app.use("/",userRoutes);
app.use("/",todoRoutes);


app.listen(port,()=>console.log(`haloo running in port${port}..`))
