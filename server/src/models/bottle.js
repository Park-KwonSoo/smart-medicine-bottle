const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BottleSchema = new Schema ({
    bottleId : { type : String, required : true, unique : true },
    balance : Number,
    recentOpen : Date,
    medicineId : Number,
    hubId : Number
})

module.exports = mongoose.model('Bottle', BottleSchema);