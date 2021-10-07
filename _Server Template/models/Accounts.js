
    // "mongoose": "^5.9.6",
    // "mongoose-sequence": "^4.0.1",

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    accountId :{
        type: String,
        require: true
    },
    password: {
        type: String,
        required : true
    },
    accountType:{
        type: String,
        default: 'NORMAL' //'NORMAL', 'AGENCY', 'MERCHANT', 'ADMIN', 'SUPPER_ADMIN'
    },
    pushToken:{
        type: String,
        default: ''
    },
    mobileNumber:{
        type: String,
        require: true
    },
    // email:{
    //     type: String,
    //     default: ''
    // },
    // passport:{
    //     type: String,
    //     default: ''
    // },
    userid:{
        type: String,
        default: ''
    },
    username:{
        type: String,
        default: ''
    },
    displayname:{
        type: String,
        default: ''
    },
    address:{
        type: String,
        default: ''
    },
    avataUrl:{
        type: String,
        default: '/resources/images/avatas/avata_.jpg'
    },
    ODPcode:{
        type: String,
        default: ''
    },
    ODPext:{
        type: Date,
        default: Date.now
    },
    balance:{
        type: Number,
        default:0
    },
    subgold:{
        type: Number,
        default:0
    },
    cashBackPoint:{
        type: Number,
        default:0
    },
    refCode:{
        type: String,
        default: ''
    },
    newGiftCount:{

    },
    newNotiCount:{
        type: Number,
        default:0
    },
    // lastPaymentGame:{
        
    // },
    latitude:{
        type: Number,
        default:0
    },
    longitude: {
        type: Number,
        default:0
    },
    accountStatus:{
        type: String,
        default: 'OFFLINE'
    },
    accountState:{
        type: String,
        default: 'ACTIVE'
        // 'ACTIVE','BLOCK1','BLOCK3','BLOCK7','BLOCK30','BLOCK_FOREVER',
    },
    createTime:{
        type: Date,
        default: Date.now
    },
    refreshToken:{
        type: String,
        default: null
    }
})

// accountSchema.path('username').set(inputString =>{
//     console.log(inputString[0])
//     return inputString[0].toUpperCase() + inputString.slice(1);
// })

module.exports = mongoose.model('accounts',accountSchema)