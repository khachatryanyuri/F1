const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allLapTimes",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.lapTimes",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.get("/allLapTimes/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.lapTimes WHERE raceId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allLapTimes/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.lapTimes WHERE raceId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allLapTimes",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.lapTimes SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allLapTimes",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body
var driverId = params.driverId
var lap = params.lap
var position = params.position
var time = params.time
var milliseconds = params.milliseconds
var id = params.id
  
    db.query("Update f1.lapTimes SET driverId = ?, lap = ?, position = ?,\
    time = ?, milliseconds = ? WHERE raceId = ?",
     [driverId, lap, position, time, milliseconds, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;