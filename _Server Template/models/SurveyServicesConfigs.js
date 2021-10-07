const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const surveyServicesConfigSchema = new Schema({
    surveyServiceId : {
        type: Number,
        require: true
    },
    serviceDes :{
        type: String,
        require: true
    },
})
surveyServicesConfigSchema.plugin(AutoIncrement, {inc_field: 'surveyServiceId'});
module.exports = mongoose.model('surveyServicesConfigs',surveyServicesConfigSchema)