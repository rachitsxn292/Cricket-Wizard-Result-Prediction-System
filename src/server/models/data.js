var mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    user_id:{
        type: String,
        require:true
    },
    time:{
        type: Date,
        default: Date.now
    },
    runs:{
        type:String,
        require:true
    },
    wickets:{
        type:String,
        require:true
    },
    overs:{
        type:String,
        require:true
    },
    last_run:{
        type:String,
        require:true
    },
    last_wickets:{
        type:String,
        require:true
    },
    striker_run:{
        type:String,
        require:true
    },
    non_striker_run:{
        type:String,
        require:true
    },
    predicted_score:{
        type: String
    }
})

module.exports = mongoose.model('DataSchema', DataSchema)