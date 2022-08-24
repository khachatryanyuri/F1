const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allQualifying",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.qualifying",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.get("/allQualifying/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.qualifying WHERE qualifyId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allQualifying/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.qualifying WHERE qualifyId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allQualifying",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.qualifying SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allQualifying",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body
var raceId = params.raceId
var driverId = params.driverId
var constructorId = params.constructorId
var number = params.number
var position = params.position
var q1 = params.q1
var q2 = params.q2
var q3 = params.q3
var id = params.id
  
    db.query("Update f1.qualifying SET raceId = ?, driverId = ?, constructorId = ?, number = ?, \
    position = ?, q1 = ?, q2 = ?, q3 = ? WHERE qualifyId = ?",
     [raceId, driverId, constructorId, number, position, q1, q2, q3, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;