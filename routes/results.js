const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allResults",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.results",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.get("/allResults/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.results WHERE resultId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allResults/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.results WHERE resultId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allResults",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.results SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allResults",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body
var raceId = params.raceId
var driverId = params.driverId
var constructorId = params.constructorId
var number = params.number
var grid = params.grid
var position = params.position
var positionText = params.positionText
var positionOrder = params.positionOrder
var points = params.points
var laps = params.laps
var milliseconds = params.milliseconds
var fastestLap = params.fastestLap
var rank = params.rank
var fastestLapTime = params.fastestLapTime
var fastestLapSpeed = params.fastestLapSpeed
var statusId = params.statusId
var id = params.id
  
    db.query("Update f1.results SET raceId = ?, driverId = ?, constructorId = ?, number = ?, \
    grid = ?, position = ?, positionText = ?, positionOrder = ?, points = ?, laps = ?, \
    milliseconds = ?, fastestLap = ?, rank = ?, fastestLapTime = ?, fastestLapSpeed = ?, \
    statusId = ? WHERE resultId = ?",
     [raceId, driverId, constructorId, number, grid, position, positionText, positionOrder, points, laps, 
        milliseconds, fastestLap, rank, fastestLapTime, fastestLapSpeed, statusId, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;
