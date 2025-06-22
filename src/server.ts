import mongoose from "mongoose";
import app from "./app";
let server;
const PORT=5000 
const bootstrap=async()=>{
    try{
     await mongoose.connect("mongodb+srv://note-app:meer1234@cluster0.tfmo3.mongodb.net/libary-managements?retryWrites=true&w=majority&appName=Cluster0")
 console.log('sucessfully connected with mongodb')
 server= app.listen(PORT,()=>{
    console.log(`server is listening the port ${PORT}`)
 })    
    }
  catch(error){
    console.log(error)
  }
  
}
bootstrap()
export default server