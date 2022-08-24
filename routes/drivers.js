const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allDrivers",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.drivers",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})

// get drivers for current year 

router.get("/seasons/currentYear",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    
    var now = new Date();
    var year = now.getFullYear();
    db.query("SELECT * FROM f1.drivers WHERE driverId IN (SELECT driverId FROM f1.qualifying WHERE raceId IN (SELECT raceId FROM f1.races WHERE year = ? ))",[year],(err, rows, fields)=>{           
        if(!err){
            res.send(rows)
        }                  
        else
        res.send(err)
    })    
})

// get drivers for exact year 

router.get("/seasons/exactYear/:year",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    
    db.query("SELECT * FROM f1.drivers WHERE driverId IN (SELECT driverId FROM f1.qualifying WHERE raceId IN (SELECT raceId FROM f1.races WHERE year = ?))",[req.params.year],(err, rows, fields)=>{           
        if(!err){
            res.send(rows)
        }                  
        else
        res.send(err)
    })    
})
  
router.get("/allDrivers/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.drivers WHERE driverId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allDrivers/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.drivers WHERE driverId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allDrivers",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.drivers SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allDrivers",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body;
var driverRef = params.driverRef
var number = params.number
var code = params.code
var forename = params.forename
var surname = params.surname
var dob = params.dob
var nationality = params.nationality
var url = params.url
var id = params.id
  
    db.query("Update f1.drivers SET driverRef = ?, number = ?, code = ?,\
    forename = ?, surname = ?, dob = ?, nationality = ?, url = ? WHERE driverId = ?",
     [driverRef, number, code, forename, surname, dob, nationality, url, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;