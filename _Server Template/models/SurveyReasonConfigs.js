const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const surveyReasonConfigSchema = new Schema({
    surveyReasonId : {
        type: Number,
        require: true
    },
    reasonDes :{
        type: String,
        require: true
    },
})
surveyReasonConfigSchema.plugin(AutoIncrement, {inc_field: 'surveyReasonId'});
module.exports = mongoose.model('surveyReasonConfigs',surveyReasonConfigSchema)