var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const secret = 'dasfadshfjkahskjfhkjasdhf';
const { stringify } = require('nodemon/lib/utils');
const Users = require('../models/Users');

const dbMongo = require("mongoose");

router.post('/',async (req,res)=>{
  const user = new Users({
      userId: req.body.userId,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      roles: req.body.roles
  });
    try{
  const saveUser = await user.save();    
  res.json(saveUser);
  }catch(err){
      res.json({message: err});
  }
});

router.post('/auth', (req, res) => {
  const currentUser = dbMongo.users.find((user) => {
    if (dbMongo.user.userName === req.body.userName && dbMongo.user.password === req.body.password) {
      return user;
    }
  })

  var token = jwt.sign({ userId: currentUser.id }, secret); // add role USER/ADMIN

  res.json({currentUser, token});
});




module.exports = router;
