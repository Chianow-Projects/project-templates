const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const errors = require('./error');
const dataCache = require('./dataCache');
const agency = require('./agency.js');
const axios = require('axios');
const crypto = require('crypto');
// Database Models
const Account = require('../models/Accounts');
// const ChatMessage = require('../models/ChatMessages');
///api/agency


_convertTime = (time) => {
	let phut = Math.floor((Date.now() - time)/60000)
	if (phut < 60) return phut +'phút'
	if (phut >= 60 && phut < 1440) return Math.floor(phut/60) +'giờ'
	if (phut >= 1440 && phut < 10080) return Math.floor(phut/1440) +'ngày'
	if (phut >= 10080) return (new Date(time)).toLocaleDateString('en-GB')	
}

router.post('/push',
	(req,res,next) => {
		let data = req.body

		// Kiểm tra tính hợp lệ 
		if (!data.mobileNumber || !data.displayName_partner || !data.amount || !data.type) {
			return errors.errorHandler(
				res,
				'Đầu vào không hợp lệ',
				errors.errorEnum.WRONG_REQUEST
			);
		} 

		let phinap = 1.15;
		let phirut = 0.82;
		let gold = 0;
		let money = 0;
		//Khách muốn mua Lộc
		if (data.type==1) {
			//Tính mức gold tương ứng với mức VNĐ đã ck 
			gold = phinap * data.amount
			money = data.amount
		}
		//Khách muốn rút Lộc 
		if (data.type==2) {
			//Tính mức VNĐ tương ứng với mức Lộc đã ck 
			gold = data.amount
			money = phirut * data.amount
		}

		// Lưu order này vào db
		agency.insertNotification({
			// orderId : 1, 
			createTime : Date.now(), 
			agencyMobileNumber : data.mobileNumber, 
			displayNamePartner : data.displayName_partner, 
			gold : gold, 
			money : money, 
			type : data.type
		},(newN)=>{
			// console.log(newN);
			req.body.orderId = newN.orderId;
			req.body.gold = newN.gold, 
			req.body.money = newN.money, 
			req.body.time = newN.createTime,
			next()
		})
		
	},
	(req,res,next) => { 
		let data = req.body
		console.log(data)
		// Tìm Agency 
		let push = dataCache.getPushEndpoint(data.mobileNumber)
		if (push) {
			push.socket.emit('onNotiTran',{
				orderId: data.orderId, 
				time: data.time,//_convertTime(data.time), 
				displayNamePartner: data.displayName_partner, 
				gold : data.gold, 
				money : data.money, 
				type : data.type
			})
		} else {
			
		}
		next();
	},
	(req, res) => {
		res.status(201).send('Khanh');
	}
)

// Cấu hình AccessToken cho luồng gọi API cần xác thực
//------------------------------------------------------------------------------
router.use((req, res, next) => {

	var token = req.headers['authorization'];
	
	if (!token || token === undefined) {
		return errors.errorHandler(
			res,
			'Mọi request phải cần có accessToken.',
			errors.errorEnum.INVALID_TOKEN
		);
	}
	
	token = token.replace('Bearer ', '');

	jwt.verify(token, config.secret, (err, acc) => {
		if (err) {
			return errors.errorHandler(
				res,
				'AccessToken không hợp lệ.',
				errors.errorEnum.INVALID_TOKEN
			);
		} else {
			req.account = acc;
			next();
		}
	});
});

//Cập nhật push token
//input : accountId, pushToken
//---------------------------------------------------------------------------------------------------
router.post('/updatePushToken', (req, res, next) => {
	let {pushToken } = req.body
	console.log(req.account.accountId)
	Account.findOneAndUpdate({ "accountId":req.account.accountId }, { "$set": {
		"pushToken": pushToken}})
	.exec((err, acc) => {
		if(err) {
		res.json({
			error: 999,
			data: null,
			message: `error is: ${err}`
		})
		} else {
		res.json({
			error: 0,
			data: null,
			message: `successfully` 
		})
		}
	});
})

// /api/agency/getnoti
// req: accountId
// res: list 
// cmt: lấy danh sách các Acency 
//------------------------------------------------------------------------------
router.get('/getnoti',
	(req,res,next) => {
		ChatMessage.find({ $or: [ { accountId_one: req.query.accountId, accountId_two: req.account.accountId }, 
                                { accountId_one: req.account.accountId, accountId_two: req.query.accountId } ] })
                .then(mess => {
                    // console.log(mess[0])
                    req.chatMessage =  mess.map((v,k) => {
                        return _.omit(v.toObject(),'_id','__v')
                    })[0]
					next()
				})
				.catch (err => {
					console.error(err)
					return errors.errorHandler(res, 
						'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
						errors.errorEnum.SYSTEM_ERROR)
				})
	},
	(req, res) => {
		res.status(201).send(req.chatMessage === undefined ? [] : req.chatMessage);
	}
)


// /api/agency/sell
//------------------------------------------------------------------------------
router.post('/sell',
	(req,res,next) => {

		if (!req.body.amount || !req.body.displayname || !req.body.odpcode ) {
			return errors.errorHandler(
				res,
				'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
				errors.errorEnum.SYSTEM_ERROR
			);
		}

		Account.findOne({'accountId': req.account.accountId})
		.then(acc => {

			if (!acc) {
				return errors.errorHandler(
					res,
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
					errors.errorEnum.SYSTEM_ERROR
				);
			}

			if  (req.body.odpcode != acc.ODPcode || 
			    (req.body.odpcode == acc.ODPcode && acc.ODPext < Date.now()) ) {
				return errors.errorHandler(
					res,
					'ODP đã hết hạn, bạn hãy lấy lại ODP',
					errors.errorEnum.SYSTEM_ERROR
				);
			} 

			next();

		})
		.catch(err => {
			console.error(err)
			return errors.errorHandler(
				res,
				'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
				errors.errorEnum.SYSTEM_ERROR
			);
		});
	},
	(req,res,next) => {
		
		// const url = 'https://loc888.com/GameServices/agency/sell'
		const url = 'http://35.186.146.190/GameServices/agency/sell'
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		};
		console.log(url)
		var bd = {
			mobileNumber : req.account.accountId,
			gold : req.body.amount,
			displayname : req.body.displayname,
			desc : "Đại Lý " + req.account.accountId + " chuyển khoản cho " + req.body.displayname,
			percent : 0.02
		}
		console.log(bd);
		axios.post(url, bd,config)
			.then(function (response) {
				let data = response.data
				
				console.log(data);

				if (data.error != 0) {
					return errors.errorHandler(
						res,
						'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
						errors.errorEnum.SYSTEM_ERROR
					);
				} else {
					req.transId = data.transId
					req.mess = data.mess

					// var url2 = 'https://loc888.com/GameServices/api/usersendgold/dlnhanhey?'
			
					// var strdata = 'id=' + req.transId + '&name=' + req.body.displayname;
					// var tok = crypto.createHmac('sha256', 'baiviphd').update(strdata).digest('hex');

					// url2 = url2 + strdata + '&token=' + tok;

					// console.log(url2)
					
					// axios.get(url2)
					// .then (r=>{
					// 	console.log(r.data)
					// })
					
					Account.findOneAndUpdate({ "accountId":req.account.accountId }, { "$inc": {
						"cashBackPoint": req.body.amount/100 }})
					.exec((err, acc) => {});
					next();
				}
				
			})
			.catch(function (error) {
				console.error(error);
				return errors.errorHandler(
					res,
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
					errors.errorEnum.SYSTEM_ERROR
				);
			});

	},
	(req, res) => {
		res.status(201).send({
			success: true,
			transId: req.transId,
			mess: req.mess
		});
	}
)

//------------------------------------------------------------------------------
router.get('/history',
	(req,res,next) => {
		//http://35.186.146.190/GameServices/agency/history?mobileNumber=0973651368
		const url = 'http://35.186.146.190/GameServices/agency/history';
		console.log(url);
		axios.post(url,{mobileNumber : req.account.accountId},
			{
				headers: {
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Type': 'application/json'
				}
			})
			.then(function (response) {
				req.data = response.data.data
				console.log(req.data);
				next();
			})
			.catch(function (error) {
				console.error(error);
				return errors.errorHandler(res, 
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
					errors.errorEnum.SYSTEM_ERROR)
			});
	},
	(req, res) => {
		res.status(201).send(req.data);
	}
)


module.exports = router;

