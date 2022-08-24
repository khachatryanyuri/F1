const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allSprintResults",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.sprintResults",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.get("/allSprintResults/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.sprintResults WHERE sprintResultId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allSprintResults/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.sprintResults WHERE sprintResultId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allSprintResults",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.sprintResults SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allSprintResults",roleMiddlewearee(['ADMIN']),(req,res)=>{

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
var time = params.time
var milliseconds = params.milliseconds
var fastestLap = params.fastestLap
var fastestLapTime = params.fastestLapTime
var statusId = params.statusId
var id = params.id
  
    db.query("Update f1.sprintResults SET raceId = ?, driverId = ?, constructorId = ?, number = ?, \
    grid = ?, position = ?, positionText = ?, positionOrder = ?, points = ?, laps = ?, time = ?, \
    milliseconds = ?, fastestLap = ?, fastestLapTime = ?, \
    statusId = ? WHERE sprintResultId = ?",
     [raceId, driverId, constructorId, number, grid, position, positionText, positionOrder, points, laps, time, 
        milliseconds, fastestLap, fastestLapTime,  statusId, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;