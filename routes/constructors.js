const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')
const constructorsService = require('../services/constructors');

router.get("/allConstructors", async (req,res)=>{
    const data = await constructorsService.getAllConstructors(req);
    res.json(data);

    // db.query("SELECT * FROM f1.constructors",(err, rows, fields)=>{
    //     if(!err)
    //     res.send(rows)
    //     else
    //     res.send(err)
    // }) 
})
  
router.get("/allConstructors/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.constructors WHERE constructorId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allConstructors/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.constructors WHERE constructorId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allConstructors",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.constructors SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allConstructors",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body;
var constructorRef = params.constructorRef
var name = params.name
var nationality = params.nationality
var url = params.url
var id = params.id
  
    db.query("Update f1.constructors SET constructorRef = ?, name = ?, nationality = ?,\
    url = ? WHERE constructorId = ?",
     [constructorRef, name, nationality, url, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;