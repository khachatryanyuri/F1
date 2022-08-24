const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')

router.get("/allCircuits",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.circuits",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.get("/allCircuits/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.circuits WHERE circuitId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allCircuits/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.circuits WHERE circuitId=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allCircuits",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.circuits SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allCircuits",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body;
var circuitRef = params.circuitRef
var name = params.name
var location = params.location
var country = params.country
var lat = params.lat
var lng = params.lng
var alt = params.alt
var url = params.url 
var id = params.id
  
    db.query("Update f1.circuits SET circuitRef = ?, name = ?, location = ?,\
     country = ?, lat = ?, lng = ?, alt = ?, url = ? WHERE circuitId = ?",
     [circuitRef, name,location, country, lat, lng, alt, url, id],
     (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

module.exports = router;