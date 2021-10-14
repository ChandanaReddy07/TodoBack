const mongoose= require("mongoose")

var Schema=mongoose.Schema;
const {ObjectId}= mongoose.Schema;

var todoSchema= new Schema({
    title: {
        type:String,
        required:true,
    },
    status:{
        type:String,
    },
    //reference keyword
    userId:{
        type:String  
    } 
   
}, {
    timestamps:true
});

module.exports= mongoose.model("Todo",todoSchema);