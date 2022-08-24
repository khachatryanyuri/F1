const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allConstructorStandings",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.constructorStandings",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.get("/allConstructorStandings/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.constructorStandings WHERE constructorStandingsId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allConstructorStandings/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.constructorStandings WHERE constructorStandingsId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allConstructorStandings",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.constructorStandings SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allConstructorStandings",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body;
var raceId = params.raceId
var constructorId = params.constructorId
var points = params.points
var position = params.position
var positionText = params.positionText3
var wins = params.wins
var id = params.id
  
    db.query("Update f1.constructorStandings SET raceId = ?, constructorId = ?, points = ?,\
    position = ?, positionText = ?, wins = ? WHERE constructorStandingsId = ?",
     [raceId, constructorId, points, position, positionText, wins, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;