const mongoose = require('mongoose');

const booking= new mongoose.Schema({
    startingDate:{
        type:Date,
        required:true,
    },
     endingDate:{
         type:Date,
         required:true
     },
     rooms:{
        type:[Number],
        required:true
    },
    laundry:{
       type:Boolean,
   }
   
})
const Bookings = new mongoose.Schema({
hotelID:{
        type:String,
        required:true
    },
 guestfirebaseUID:{
        type:String,
        required:true
    },
    bookingTime:{
        type:String,
        required:true
        },
    bookingDate:{
        type:Date,
        default:Date.now()
 },
 booking:{
     type:booking
 }
});
guestHouse.index({geometry:"2dsphere"});
module.exports = mongoose.model('Booking',Bookings)