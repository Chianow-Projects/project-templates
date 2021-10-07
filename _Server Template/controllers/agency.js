const _ = require('lodash');
const errors = require('./error');
const Notification = require('../models/Notifications');

insertNotification = (data,onDone) => {
    let {orderId, createTime, agencyMobileNumber, displayNamePartner, gold, money, type} = data
    const newNotification = new Notification({
        orderId : orderId, 
        createTime : createTime, 
        agencyMobileNumber: agencyMobileNumber, 
        displayNamePartner: displayNamePartner, 
        gold: gold, 
        money: money, 
        type: type
    })

    let ret;
    Notification.create(newNotification)
        .then(noti => {
            onDone(noti)
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports = {
	insertNotification
};
