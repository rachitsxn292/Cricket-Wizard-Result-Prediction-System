var mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    email:{
        type: String,
        require:true
    },
    time:{
        type: Date,
        default: Date.now
    },
    runs:{
        type:Number,
        require:true
    },
    wickets:{
        type:Number,
        require:true
    },
    overs:{
        type:Number,
        require:true
    },
    last_run:{
        type:Number,
        require:true
    },
    last_wickets:{
        type:Number,
        require:true
    },
    striker_run:{
        type:Number,
        require:true
    },
    non_striker_run:{
        type:Number,
        require:true
    },
    predicted_score:{
        type: Number
    }
})

module.exports = mongoose.model('DataSchema', DataSchema)