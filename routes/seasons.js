const Router = require('express');
const router = new Router();
var db = require('../db');
const authMiddlewearee = require('../middlewearee/authMiddlewearee')
const roleMiddlewearee = require('../middlewearee/roleMiddlewearee')
const axios = require('axios').default
const cron = require('node-cron');
 


router.get("/allSeasons",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.seasons",(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})

// get current season with all races passed and coming

router.get("/seasons/passedAndComing",(req,res)=>{
    
    var now = new Date();
    var year = now.getFullYear();
    db.query("SELECT * FROM f1.races WHERE year = ?",[year],(err, rows, fields)=>{
        if(!err){
           let passedSeasons = new Array()  
           let comingSeasons = new Array() 
           
           for(let i = 0; i<rows.length; i++){
                if(now>rows[i].date){
                    passedSeasons.push(rows[i])
                }
                else{
                    comingSeasons.push(rows[i])
                }
            } 
            res.send({},passedSeasons);
            res.send(comingSeasons);

        }                
        else
        res.send(err)
    })    
})

// [{race, isPassed: true/false}]

router.get("/seasons/isPassed",(req,res)=>{
    
    var now = new Date();    
    db.query("SELECT * FROM f1.races ",(err, rows, fields)=>{
        if(!err){
           let isPassed = new Array()
           let notPassed = new Array()          
           let passed = [{isPassed:true}, {isPassed:false}]
           for(let i = 0; i<rows.length; i++){
                if(now>rows[i].date){
                    isPassed.push(rows[i],passed[0])
                }
                else{
                    notPassed.push(rows[i],passed[1])
                }
            } 
            res.send(isPassed);
            res.send(notPassed);

        }                
        else
        res.send(err)
    })    
})

//Season List

router.get("/seasonsList",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    
    db.query("SELECT * FROM f1.seasons",(err, rows, fields)=>{   
        
        if(!err){          
            res.send(rows)            
            }        
        else
        res.send(err)
    })
    
    
})

router.get("/seasonsList/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    
    db.query("SELECT circuitId, name, location, country FROM f1.circuits WHERE circuitId IN (SELECT circuitId FROM f1.races WHERE year=?)",[req.params.id],(err, rows, fields)=>{           
        if(!err){
            res.send(rows)
        }                  
        else
        res.send(err)
    })    
})

//races by circuitId and year

router.get("/seasonsList/:id/:year",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    
    db.query("SELECT * FROM f1.races WHERE circuitId = ? and year = ?",[req.params.id, req.params.year],(err, rows, fields)=>{           
        if(!err){
            res.send(rows)
        }                  
        else
        res.send(err)
    })    
})
  
router.get("/allSeasons/:id",roleMiddlewearee(['ADMIN', "USER"]),(req,res)=>{
    db.query("SELECT * FROM f1.seasons WHERE year=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.delete("/allSeasons/:id",roleMiddlewearee(['ADMIN']),(req,res)=>{
    db.query("DELETE FROM f1.seasons WHERE year=?",[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Deleted successfull")
        else
        res.send(err)
    }) 
})
  
router.post("/allSeasons",roleMiddlewearee(['ADMIN']),(req,res)=>{
const data=req.body;
    db.query("INSERT INTO f1.seasons SET? ",data,(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        res.send(err)
    }) 
})
  
router.put("/allSeasons",roleMiddlewearee(['ADMIN']),(req,res)=>{

var params = req.body
var url = params.url
var id = params.id
  
    db.query("Update f1.seasons SET url = ? WHERE year = ?",[url, id], (err, rows, fields)=>{
        if(!err)
        res.send("Updated successfully")
        else
        res.send(err)
    }) 
})

/*cron.schedule('* * * * *', () => {  
    console.log('hi') });*/



const seasonSync = async (total = 10, offset = 0) => {
    axios.get(`http://ergast.com/api/f1/seasons.json?limit=10&offset=${offset}`).then(arr=>{
    let results = arr.data.MRData.SeasonTable.Seasons
        const newResults = []
        offset += 10;
        if (arr.data.MRData.total > offset) {
            seasonSync(arr.total, offset);
        }
        console.log(results)
    })
}

seasonSync(100);










module.exports = router;