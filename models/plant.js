const mongoose = require('mongoose');

//schema for the Plants, set name, variable and if it is required
let plantSchema = new mongoose.Schema({
    plantname: {
        type: String,
        required: true
    },
    planttype: {
        type: String,
        required: true
    },
    plantfirstwaterdate: {
        type: Date,
        required: true
    },
    plantwaterint: {
        type: Number,
        required: true
    },
    plantcomments: {
        type: String,
        required: false
    }
},
{ 
    //Disable version key on the objects
    versionKey: false
});

module.exports = mongoose.model('Plant', plantSchema);