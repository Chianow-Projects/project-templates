const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const surveyAgeConfigSchema = new Schema({
    surveyAgeId : {
        type: Number,
        require: true
    },
    ageDes :{
        type: String,
        require: true
    },
})
surveyAgeConfigSchema.plugin(AutoIncrement, {inc_field: 'surveyAgeId'});
module.exports = mongoose.model('surveyAgeConfigs',surveyAgeConfigSchema)