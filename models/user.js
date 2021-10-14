const mongoose= require("mongoose")
const crypto = require('crypto');
const uuidv1 = require('uuid').v1;
var Schema=mongoose.Schema;

var userSchema= new Schema({
    name: {
        type:String,
        required:true,
        maxlenght:32
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
});



userSchema.virtual("password")
.set(function(password){
    this._password=password;
    this.salt=uuidv1;
    this.encry_password= this.securedPassword(password)
})
.get(
    function(){
        this._password; 
    }
)


userSchema.methods= {

authentication:function(plan_password){
  return this.securedPassword(plan_password)===this.encry_password;
},

securedPassword: function(plan_password){
    if(!plan_password) return "";
    try{
        return crypto.createHmac('sha256',this.salt )
        .update(plan_password)
        .digest('hex');

    }
    catch(error){
        return "";
    }
}
}


module.exports= mongoose.model("User",userSchema)