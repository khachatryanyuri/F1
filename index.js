const express = require('express');
var db = require('./db');
const dbMongo = require('mongoose');

const PORT = process.env.PORT || 3000;
require('dotenv/config');

const app = express();
const bodyparser = require("body-parser") 
app.use(bodyparser.json())



const authRouter = require('./authRouter')
const authCircuits = require('./routes/circuits')
const authConstructorResults = require('./routes/constructorResults')
const authConstructors = require('./routes/constructors')
const authConstructorStandings = require('./routes/constructorStandings')
const authDrivers = require('./routes/drivers')
const authDriverStandings = require('./routes/driverStandings')
const authLapTimes = require('./routes/lapTimes')
const authPitStops = require('./routes/pitStops')
const authQualifying = require('./routes/qualifying')
const authRaces = require('./routes/races')
const authResults = require('./routes/results')
const authSeasons = require('./routes/seasons')
const authSprintResults = require('./routes/sprintResults')
const authStatus = require('./routes/status')

app.use('/auth', authRouter)
app.use('/circuits', authCircuits)
app.use('/constructorResults', authConstructorResults)
app.use('/constructors', authConstructors)
app.use('/constructorStandings', authConstructorStandings)
app.use('/drivers', authDrivers)
app.use('/driverStandings', authDriverStandings)
app.use('/lapTimes', authLapTimes)
app.use('/pitStops', authPitStops)
app.use('/qualifying', authQualifying)
app.use('/races', authRaces)
app.use('/results', authResults)
app.use('/seasons', authSeasons)
app.use('/sprintResults', authSprintResults)
app.use('/status', authStatus)

const start =  () => {
  try {
    dbMongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, ()=>{
          console.log('connected to MONGODB!')
        });          
      app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e){
      console.log(e);
  }
}

start();











 

 
 