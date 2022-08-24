const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allPitStops",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.pitStops",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.get("/allPitStops/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.pitStops WHERE raceId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allPitStops/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.pitStops WHERE raceId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allPitStops",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.pitStops SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allPitStops",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body
var driverId = params.driverId
var stop = params.stop
var lap = params.lap
var time = params.time
var duration = params.duration
var milliseconds = params.milliseconds
var id = params.id
  
    db.query("Update f1.pitStops SET driverId = ?, stop = ?, lap = ?, \
    time = ?, duration = ?, milliseconds = ? WHERE raceId = ?",
     [driverId,stop, lap, time, duration, milliseconds, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;