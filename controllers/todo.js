const  Todo=require("../models/todo")

exports.getTodoById=(req,res,next,id)=>{
   // console.log("im in id")

    Todo.findById(id).exec((err,todo)=>{
        if(err||!todo){
           return  res.status(400).json({
               error:"No Todo in db"
           })
        }
        req.todo=todo;
        next();
    })
}

exports.getTodo=(req,res)=>{
  //  console.log("im in")
    return res.json(req.todo);
}


//create todo
exports.createTodo=(req,res)=>{
  
const title=req.body.title;
const userId=req.profile._id;

  const todo= new Todo({title:title,userId:userId});

  console.log("user",req.profile.name);

  todo.save((err,todo)=>{
      if(err){
          console.log(err)
          return res.status(400).json({
              err:"cant save to the DB"
          })
      }
      res.json({todo});
  })
     
}


//delete todo
exports.deleteTodo= (req,res)=>{
    let todo = req.todo;
    console.log("todo",todo)
   
    todo.remove((err,todo)=>{
        if(err){
            res.status(400).json({
                error:"failed to delete the todo"
            })
        }
        res.json({
            message : `deletion is succesful ${todo}`
        })
    })

}

//update todo
exports.updateTodo= (req,res) => {
    Todo.findByIdAndUpdate(
    {
        _id : req.todo._id,
    },
    {$set: req.body},
    {new: true, useFindAndModify: false},
    (err,user)=>{
        if(err){
            return res.status(400).json({
                error: "you are not authorised to update this Todo"
            })
        }
        res.json(user)
    });
};
