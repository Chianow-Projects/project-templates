const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const ODPSchema = new Schema({
    odpId :{
        type: Number,
        require: true
    },
    odpType: {
        type: String,
        required : true
    },
    odpCode : {
        type: String,
        required : true
    },
    expTime : {
        type: Date,
    }
})
ODPSchema.plugin(AutoIncrement, {inc_field: 'odpId'});
module.exports = mongoose.model('ODPs',ODPSchema)