
var db = require('../db');


const constructors = {
    getAllConstructors: (req) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM f1.constructors",(err, rows, fields)=> {
            if(!err)
            resolve(rows);
            else
            reject(new Error('error on get of constructors'));
        }) 
        }) 
    }
}


module.exports = constructors;