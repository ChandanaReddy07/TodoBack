var express = require("express");
var router = express.Router();
const { signup ,signin,signout} = require("../controllers/users");
const {check} =require("express-validator")
const User = require("../models/user")



exports.getUserById=(req,res,next,id)=> {
  //  console.log(id+"  ID  ");
   User.findById(id).exec((err,user)=>{
       if(err||!user){
           res.status(401).json({
               err: "no user found in database"
           })
       }
      console.log(user);
       req.profile=user;
       next();
   })
}


//user login 
router.get("/login", [
    
  check('email','email should be a valid one')
  .isEmail(),
  check('password','password is required')
  .isLength({ min: 1 }),

],signin)

// user signup
router.post(
  "/signup",
  [
      check("name","name shd be atleast 3 char").isLength({min:3}),
      check("email","email is required").isEmail(),
      check("password","passsword should be atleast of 5 characters").isLength({min:5}),
     
],
  signup
);

//user signout
router.get("/signout",signout);


module.exports = router;
