const User = require("../models/user");
const Todo = require("../models/todo");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(401).json({
        err: "no user found in database",
      });
    }
    console.log(user);
    req.profile = user;
    next();
  });
};

//get All todos
exports.getAllTodo = (req, res) => {
  Todo.find({ userId: req.profile._id }).exec((err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "No todo found in db",
      });
    }
    res.json(todo);
  });
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};

//signup
exports.signup = (req, res) => {
  console.log("Signup works!");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  console.log("user", req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "cant save to the DB",
      });
    }
    res.json(user);
  });
};

//user signin
exports.signin = (req, res) => {
  console.log("signin is working");
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({
      err: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (!user) {
      return res.status(400).json({
        err: "user not found in db",
      });
    }
    if (err) {
      res.status(400).json({
        err: "USER email does not exists",
      });
    }
    if (!user.authentication(password)) {
      return res.status(401).json({
        err: "Email does not match",
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //create cookie
    res.cookie("token", token, {
      expire: new Date() + 9999,
    });
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

//user signout
exports.signout=(req,res)=>{
  res.clearCookie("token");
    res.json({
              message:"User signout succcessfully"
       });
  
 };

//middleware
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    res.status(403).json({
      error: "ACCESS DINIED",
    });
  }
  next();
};

//middleware to keep a check if todo belongs to the user
exports.userVerify=(req, res, next) => {
  let checker = req.profile._id == req.todo.userId;
  if (!checker) {
    res.status(403).json({
      error: "ACCESS DINIED",
    });
  }
  next();
};


// deleting user account
exports.deleteUser = (req, res) => {
  let user = req.profile;
  //console.log("user profile",user)

  user.remove((err, user) => {
    if (err) {
      res.status(400).json({
        error: "failed to delete the user",
      });
    }
    res.json({
      message: `deletion is succesful ${user}`,
    });
  });
};
