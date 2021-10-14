const express=require("express")
const router=express.Router();

const {createTodo,getTodo,getTodoById,deleteTodo,updateTodo} = require("../controllers/todo")
 const {isSignedIn,isAuthenticated,getAllTodo,deleteUser,userVerify} = require("../controllers/users")
const {getUserById} = require("../controllers/users")

//all of params
router.param("todoId",getTodoById)
router.param("userId",getUserById)

//create todo route
router.post("/todo/create/:userId",isSignedIn,isAuthenticated,createTodo)


//get todo route
router.get("/todo/:todoId/:userId",isSignedIn,isAuthenticated,userVerify,getTodo);


//delete todo route
router.delete("/todo/:todoId/:userId",isSignedIn,isAuthenticated,userVerify,deleteTodo)
//delete user route
router.delete("/user/:userId",isSignedIn,isAuthenticated,deleteUser)


//update todo route
router.put("/todo/:todoId/:userId",isSignedIn,isAuthenticated,userVerify,updateTodo)


//listing all todos of a specific user route
router.get("/todos/:userId",getAllTodo);

module.exports=router;


