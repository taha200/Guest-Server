var express = require('express');
var path = require('path')
// var mongojs = require('mongojs')
var Mongoose = require('mongoose')
var cors = require('cors')
var mongojs=require('mongojs')
 
var User= require('./models/user')
var guestHouse=require('./models/guestHouse')
var bodyParser= require('body-parser')

Mongoose.connect('mongodb://tbali:tbali123@ds151814.mlab.com:51814/stayngo',{ useNewUrlParser: true })
var db=Mongoose.connection
var app = express();
app.use(cors())
app.use(bodyParser.json())  //Body Parser MiddleWare
app.use(express.json())


// User Module
app.post('/userCreate',(req,res)=>{
    console.log(req.body)
   User.create(req.body,function(err,docs){
    if(err)
        console.log(err)
        else{
       console.log(docs)
       res.send(docs)
        } 
})
})
app.get('/users',(req,res)=>{
    User.find(function(err,docs){
        if(err)
            console.log(err)
            else{
           console.log(docs)
           res.send(docs)
            } 
    })
})
app.put('/singleUser',(req,res)=>{
    console.log(req.body)
User.findOne({firebaseUID:req.body.firebaseUID},(err,docs)=>{
    if(err)
    console.log(err)
    else{
   console.log(docs)
   res.send(docs)
    } 
})

})
app.put('/updateUserProfile',(req,res)=>{
        User.findOneAndUpdate({firebaseUID:req.body.firebaseUID},req.body,{upsert:true},(err,docs)=>{
            if(err)
            console.log(err)
            else{
           console.log(docs)
           res.send(docs)
            } 
        })
})

//GuestHouse Module
app.post('/addHotel',(req,res)=>{
    guestHouse.create(req.body,function(err,docs){
        if(err)
            console.log(err)
            else{
           console.log(docs)
           res.json({
               message:"Success",
               docs
           })
            } 
    })
})
app.put('/hotelListBySpecificID',(req,res)=>{
   guestHouse.find({firebaseUID: req.body.firebaseUID},(err,docs)=>{
    res.send(docs)
     })
    })
    app.put('/hotelList',(req,res)=>{
    guestHouse.find((err,docs)=>{
  res.send(docs)
    })
    })
app.put('/findHotelOneRoomandUpdate',(req,res)=>{
        // guestHouse.findOneAndUpdate(
        //     {"_id":'5def82040ce6b003c06e58e0', 'rooms._id':"5df4c89cfd37f60b3cfe5375"},
        //     { $set: {'rooms.$.roomNumber': '600',
        //     'rooms.$.booked': 'true',
        //     'rooms.$.rate': '25'

        // }}).exec((err,docs)=>{
        //    res.send(docs)
        //     });
        guestHouse.aggregate([
            { "$match": {
                "rooms._id": "5df4c89cfd37f60b3cfe5375"
            }},
            { "$unwind": "$rooms" },
            { "$match": {
                "rooms._id": "5df4c89cfd37f60b3cfe5375"
            }},
            { "$project": {
                "booked": "$rooms.booked"
            }}
        ],function(err,result) {
           console.log(result)
        })
     })
 
app.put('/addRooms',(req,res)=>{
  
    guestHouse.findOneAndUpdate({"_id":'5def82040ce6b003c06e58e0'},{rooms:req.body.rooms},{new:true},(err,docs)=>{
        if(err)
        console.log(err)
        else{
       console.log(docs)
       res.json({
           message:"Success",
           docs
       })
        } 
    })
})
app.delete('/deleteHotel',(req,res)=>{
    guestHouse.findOneAndDelete({_id:req.body.id},(err,docs)=>{
        res.send(docs)
         })
})
app.put('/updateSpecificHotelDetail',(req,res)=>{
guestHouse.findOneAndUpdate({_id:req.body.id},req.body,{upsert:true},{new:true},(err,docs)=>{
        if(err)
        console.log(err)
        else{
       console.log(doc)
       res.send(doc)
        } 
    })
})
//Booking module

app.listen(8000);
// send a message
console.log('Server has started!');