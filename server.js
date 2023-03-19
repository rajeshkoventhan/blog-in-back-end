const express = require("express")
const app = express()
const mongoose = require ("mongoose")
require("dotenv/config")
mongoose.set("strictQuery",false)
const multer = require("multer")
const path = require("path")

app.use(express.json());

const postRoute = require("./routes/post")
app.use ('/post', postRoute)
const postsRoute = require("./routes/posts")
app.use ('/posts', postsRoute)
const userRoute = require("./routes/user")
app.use ('/user',userRoute)
const catagoriesRoute = require("./routes/catagories")
app.use ('/catagories',catagoriesRoute)

app.get('/',(req,res)=>{
 res.send("helllow")
})

const storage = multer.diskStorage({
 destination : (req,file,cb)=>{
    cb (null,"images");
 },
  filename :(req,file,cb) =>{
  cb(null,Date.now() + path.extname(file.originalname))
  },
})

  const upload = multer ({storage:storage});
  app.post("/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("file upload")
 })
 
 mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true, useUnifiedTopology: true},

(err)=>{
    if(!err)
    {
        console.log("db connected")
    }
    else
    {console.log(err)}
}    
    
    
)

app.listen(3000,()=>{
console.log("hellow")
})