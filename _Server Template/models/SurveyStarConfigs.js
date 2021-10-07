const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const surveyStarConfigSchema = new Schema({
    surveyStarId : {
        type: Number,
        require: true
    },
    starDes :{
        type: String,
        require: true
    },
})
surveyStarConfigSchema.plugin(AutoIncrement, {inc_field: 'surveyStarId'});
module.exports = mongoose.model('surveyStarConfigs',surveyStarConfigSchema)