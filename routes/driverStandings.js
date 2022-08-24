const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allDriverStandings",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.driverStandings",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})

// current year standing

router.get("/driverStandings/currentYear",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    
    var now = new Date();
    var year = now.getFullYear();
    db.query("SELECT  driverStandingsId, raceId, points, position, positionText, wins, forename, surname FROM driverStandings join drivers on driverStandings.driverId = drivers.driverId  WHERE raceId IN (SELECT raceId FROM f1.races WHERE year = ?)",[year],(err, rows, fields)=>{
        if(!err){
            let arr = rows;            
            for(let i=0; i<arr.length; i++){
                for(let j = 1; j<arr.length; j++){
                    if(arr[i].forename === arr[j].forename && arr[i].surname === arr[j].surname){
                        arr[i].points+=arr[j].points
                        arr.splice(j,1)
                    }

                } 
            }
           res.send(arr);
        }                  
        else
        res.send(err)
    })    
})

// exact year drivers standing .

router.get("/driverStandings/exactYear/:year",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    
    var now = new Date();
    var year = now.getFullYear();
    db.query("SELECT  driverStandingsId, raceId, points, position, positionText, wins, forename, surname FROM driverStandings join drivers on driverStandings.driverId = drivers.driverId  WHERE raceId IN (SELECT raceId FROM f1.races WHERE year = ?)",[req.params.year],(err, rows, fields)=>{
        if(!err){
            let arr = rows;            
            for(let i=0; i<arr.length; i++){
                for(let j = 1; j<arr.length; j++){
                    if(arr[i].forename === arr[j].forename && arr[i].surname === arr[j].surname){
                        arr[i].points+=arr[j].points
                        arr.splice(j,1)
                    }

                } 
            }
           res.send(arr);
        }                  
        else
        res.send(err)
    })    
})
  
router.get("/allDriverStandings/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.driverStandings WHERE driverStandingsId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allDriverStandings/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.driverStandings WHERE driverStandingsId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allDriverStandings",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.driverStandings SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allDriverStandings",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body
var raceId = params.raceId
var driverId = params.driverId
var points = params.points
var position = params.position
var positionText = params.positionText
var wins = params.wins
var id = params.id
  
    db.query("Update f1.driverStandings SET raceId = ?, driverId = ?, points = ?,\
    position = ?, positionText = ?, wins = ?  WHERE driverStandingsId = ?",
     [raceId, driverId, points, position, positionText, wins, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;