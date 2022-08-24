const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allRaces",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.races",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})

// get season last race

router.get("/races/lastRace",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    
    let now = new Date();
    let nowMs = +now.valueOf() 
    db.query(`SELECT  races.date, races.name, races.raceId, races.round,races.time, races.year, circuits.alt, circuits.circuitRef, circuits.country, circuits.lat, circuits.lng, circuits.location, circuits.name  FROM f1.races join f1.circuits on races.circuitId = circuits.circuitId where races.date < CAST('${now.toISOString()}' AS DATE) order by date DESC limit 1`,(err, rows, fields)=>{
        if(!err){       
            // let arr = rows;             
            // let min = +now.valueOf()- arr[0].date.valueOf()           
            // let index = 0;            
            // for(let i = 1; i<arr.length; i++){
            //     if(nowMs - arr[i].date < min &&now>arr[i].date)
            //     {
            //         min = nowMs-arr[i].date
            //         index = i
            //         console.log(min)
            //     } 
            // }
            res.send(rows);
        }                  
        else
        res.send(err)
    })    
})

// get season next race

router.get("/races/nextRace",(req,res)=>{
    
    let now = new Date();
    let nowMs = +now.valueOf() 

    db.query(`SELECT  races.date, races.name, races.raceId, races.round,races.time, races.year, circuits.alt, circuits.circuitRef, circuits.country, circuits.lat, circuits.lng, circuits.location, circuits.name  FROM f1.races join f1.circuits on races.circuitId = circuits.circuitId where races.date > CAST('${now.toISOString()}' AS DATE) order by date DESC limit 1`,
    (err, rows, fields) =>{
        if(!err){       
            // let arr = rows;             
            // let min = +now.valueOf()           
            // let index = 0;            
            // for(let i = 1; i<arr.length; i++){
            //     if(arr[i].date - nowMs < min && now<arr[i].date)
            //     {
            //         min = arr[i].date - nowMs
            //         index = i
            //         console.log(min)
            //     } 
            // }
            res.send(rows);
        }                  
        else
        res.send(err)
    })    
})
  
router.get("/allRaces/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.races WHERE raceId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allRaces/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.races WHERE raceId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allRaces",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.races SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allRaces",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body
var year = params.year
var round = params.round
var circuitId = params.circuitId
var name = params.name
var date = params.date
var time = params.time
var url = params.url
var fp1_date = params.fp1_date
var fp1_time = params.fp1_time
var fp2_date = params.fp2_date
var fp2_time = params.fp2_time
var fp3_date = params.fp3_date
var fp3_time = params.fp3_time
var quali_date = params.quali_date
var quali_time = params.quali_time
var sprint_date = params.sprint_date
var sprint_time = params.sprint_time
var id = params.id
  
    db.query("Update f1.races SET year = ?, round = ?, circuitId = ?, name = ?, \
    date = ?, time = ?, url = ?, fp1_date = ?, fp1_time = ?, fp2_date = ?, \
    fp2_time = ?, fp3_date = ?, fp3_time = ?, quali_date = ?, quali_time = ?, \
    sprint_date = ?, sprint_time = ? WHERE raceId = ?",
     [year, round, circuitId, name, date, time, url, fp1_date, fp1_time, fp2_date, 
        fp2_time, fp3_date, fp3_time, quali_date, quali_time, sprint_date, sprint_time, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;