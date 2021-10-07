const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
    
    orderId : {
        type: Number,
        require: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    agencyMobileNumber: {
        type: String,
        require: true  
    },
    displayNamePartner:{
        type: String,
        require: true
    },
    gold: {
        type: Number,
        required : true
    },
    money: {
        type: Number,
        required : true
    },
    type: {
        type: Number,
        required : true
    }
})
notificationsSchema.plugin(AutoIncrement, {inc_field: 'orderId'});
module.exports = mongoose.model('notifications',notificationsSchema)