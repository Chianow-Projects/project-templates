const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./auth');
const sms = require('./sms')
const config = require('../config/auth.js');
const errors = require('./error');
const otpGenerator = require('otp-generator');
const dataCache = require('./dataCache');
const axios = require('axios');
const md5 = require('md5');


// Database Models
const Accounts = require('../models/Accounts');
const EmployeeVTCMobile = require('../models/EmployeeVTCMobile')
const RegisterOrders = require('../models/RegisterOrders')
const ODPs = require('../models/ODPs')
const RefCodePrices = require('../models/RefCodePrices')


// api/auth/checkMobileNumber 
// req: mobileNumber
// res: true/false
//------------------------------------------------------------------------------
router.get('/checkMobileNumber',
	(req,res,next) => {
		if (!req.query.mobileNumber) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi số điện thoại.',
				errors.errorEnum.WRONG_REQUEST
			)
		}
		
		// const url = 'https://loc888.com/GameServices/agency/auth/checkMobile?mobileNumber=' + req.query.mobileNumber;
		const url = 'http://35.186.146.190/GameServices/agency/auth/checkMobile?mobileNumber=' + req.query.mobileNumber;
		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 		'Authorization': 'Basic cjM2ZnppQUtodmF1RjVfQmJTY2YtZjZmaEtKam5Nc0s6eA=='
		// 	}
		// };
		console.log(url);
		axios.get(url)
			.then(function (response) {
				console.log(response.data);
				req.hasMobileNumber = response.data == 1 ? true : false;
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
		res.status(201).send(req.hasMobileNumber);
	}
)

// api/auth/login 
// req: mobileNumber, passWord
// res: accessToken, refreshToken
//------------------------------------------------------------------------------
router.post('/login',

	(req, res, next) => {
		
		if (!req.body.mobileNumber || !req.body.password) {
			return errors.errorHandler(
				res,
				'Bạn cần phải gửi số điện thoại và mật khẩu.',
				errors.errorEnum.WRONG_REQUEST
			);
		}
		console.log(req.body.mobileNumber, req.body.password);
		
		// const url = 'https://loc888.com/GameServices/agency/auth/login'
		const url = 'http://35.186.146.190/GameServices/agency/auth/login'
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		};

		let hashPassword = md5 (req.body.password + 'baiviphd');
		console.log(hashPassword);
		axios.post(url, {           
			mobileNumber : req.body.mobileNumber,
			password :  hashPassword
		},config)
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
					// Nếu đăng nhập thành công
					req.mobileNumber = req.body.mobileNumber
					req.hashPassword = hashPassword
					req.username = data.username
					req.userId = data.id 
					req.displayname = data.displayname  
					req.gold = data.gold
					req.subgold = data.subgold
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
	auth.registerAccount,
	auth.createToken,
	auth.createRefreshToken,

	(req, res) => {
		res.status(201).send({
			success: true,
			accessToken: req.accessToken,
			refreshToken: req.refreshToken
		});
	}
);


// api/auth/refreshToken 
// req: mobileNumber, passWord
// res: accessToken, refreshToken
//------------------------------------------------------------------------------
router.post('/refreshToken',
	auth.validateRefreshToken,
	auth.createToken,
	(req, res) => {
		res.status(201).send({
			success: true,
			accessToken: req.accessToken
		});
	}
);


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


// api/auth/getProfile 
// req: mobileNumber, passWord
// res: accessToken, refreshToken
//------------------------------------------------------------------------------
router.get('/getProfile', (req, res, next) => {
	
	Accounts.findOne({accountId: req.account.accountId})
		.then(acc => {
			// console.log(req.query)
			if (!acc) return errors.errorHandler(res, 'Không tồn tại tài khoản.',errors.errorEnum.ACCOUNT_NOT_EXISTS);

			// dataCache.addAccount({
			// 	accountId
			// })

			res.status(201).send({
				success: true,
				data: _.omit(acc.toObject(),
										'_id',
										'__v',
										'password',
										'refreshToken',
										'pincode'
									)})

		})
		.catch(err => {
			console.error(err)
			return errors.errorHandler(
				res,
				'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
				errors.errorEnum.SYSTEM_ERROR
			);
		});
});



// api/auth/ODP 
// req: none
// res: odpId
//------------------------------------------------------------------------------
router.get('/ODP',

	//Sinh ma ODP moi
	(req, res, next) => { 
		
		// Tạo mã ODP
		let odpCode = otpGenerator.generate(6, { digits: true,alphabets: false,upperCase: false, specialChars: false });
		let odpType = 'TRAN';

		//Tạo mã ODP mới
		const newODP = new ODPs({
			odpType : odpType,
			odpCode : odpCode,
			expTime : Date.now() + 86400000
		})

		ODPs.create(newODP)
			.then(r=>{
				req.odp = r;
				next();
			})
			.catch(err =>{
				console.error(err);
				return errors.errorHandler(res, 
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
					errors.errorEnum.SYSTEM_ERROR)
			})
	},
	
	(req, res, next) => { 
		console.log(req.odp)
		sms.sent(
			{
				mobileNumber: req.account.accountId,
				message: `Mã ODP của bạn là: ${req.odp.odpCode} (có hiệu lực 24 giờ)`
			},
			res => { },
			err => { }
		)
		next()
	},

	// Thành công/ Response về thành công.
	(req, res) => {
		res.status(201).send({
			success: true,
		});
	}
);


// api/auth/CheckODP 
// req: ODP
// res: {}
//------------------------------------------------------------------------------
router.get('/CheckODP',

	(req, res) => { 

		if (!req.query.ODP) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi ODP.',
				errors.errorEnum.WRONG_REQUEST
			)
		}
		console.log(req.query.ODP)
		ODPs.findOne({odpCode: req.query.ODP,})
		.then(odp => {
			console.log(odp)
			// console.log(req.query)
			// console.log(_.omit(odp.toObject(),'_id','__v','odpType','odpId',))
			if (!odp || odp.expTime < Date.now()) return errors.errorHandler(res, 'Sai ODP.',errors.errorEnum.WRONG_OTP);

			Accounts.findOneAndUpdate({'accountId': req.account.accountId},
										{'$set': {'ODPcode': odp.odpCode, 'ODPext':odp.expTime}},
										{new: true})
					.then(acc => {
					})
					.catch(err => {
						console.error(err)
						return errors.errorHandler(
							res,
							'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
							errors.errorEnum.SYSTEM_ERROR
						);
					});

			res.status(201).send({
				success: true,
				data: _.omit(odp.toObject(),'_id','__v','odpType','odpId',) 
			}) 
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
);


// api/auth/GetBlance 
// req: ODP
// res: {}
//------------------------------------------------------------------------------
router.get('/GetBlance',
	(req, res) => { 
		Accounts.findOne({'accountId': req.account.accountId,})
		.then(acc => {
			// console.log(acc)
			res.status(201).send({
				success: true,
				data: acc.balance
			}) 
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
);


// api/auth/getAll 
//------------------------------------------------------------------------------
router.get('/getAll', (req, res) => {

	let push = dataCache.getPushEndpoint('0968434969')
	push.socket.emit('onChatMessage',{
		userName: 'Kenny Tran', 
		mobileNumber: '0973651368', 
		avataUrl: '/resources/images/avatas/avata_0973651368.jpg', 
		message: 'Trần Duy Khánh...', 
		time: Date.now()
	})

	Accounts.find()
		.then(accs => {
			// console.log(acc)
			res.status(201).send({
				success: true,
				message: _.map(accs, a => {return _.omit(a.toObject(),'_id','__v','password')})
			});
		})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});

// api/auth/activeRefCode 
//------------------------------------------------------------------------------
router.post('/activeRefCode', 
	(req, res, next) => {
		let {refCode} = req.body
		
		//Tìm kiếm User có Refcode tương ứng.
		// console.log(refCode)
		Accounts.findOneAndUpdate({refCode: refCode},
			{'$inc': {balance: process.env.REFCODE_GIFT}},
			{new: true}
		)
			.then(acc1 => {

				//Không tìm thấy người dùng có mã refCode này.
				if (!acc1) 
					return { 
						continue : false,
						obj: errors.errorHandler(res, 'Refcode không tồn tại.', errors.errorEnum.REFCODE_NOT_EXISTS)}
				

				//Kiểm tra 2 người này đã nhận thưởng chưa ?
				RefCodePrices.find({ $or: [ { accountId1: acc1.accountId, accountId2: req.account.accountId }, 
											{ accountId1: req.account.accountId, accountId2: acc1.accountId } ] })
				.then(pr => {
					//2 Người này đã nhận thưởng với mã Code này.
					if (pr.length>10) return errors.errorHandler(
						res,
						'Mã code này bạn đã nhận thưởng',
						errors.errorEnum.REFCODE_IS_USED
					);

					Accounts.findOneAndUpdate({'accountId': req.account.accountId},
												{'$inc': {'balance': process.env.REFCODE_GIFT}},
												{new: true})
							.then(acc2 => {

								//Ghi nhận cộng thưởng cho 2 người này
								const newRefCodePrice = new RefCodePrices({
									accountId1 : acc1.accountId,
									accountId2 : acc2.accountId,
									price : process.env.REFCODE_GIFT
								})
								RefCodePrices.create(newRefCodePrice)

								//Tạo dữ liệu Push xuống người dùng 1.
								req.pushData = {accountId: acc1.accountId, balance: acc1.balance}
								req.newBalance = acc2.balance
								next()
							})
							.catch(err => {
								console.error(err)
								return errors.errorHandler(
									res,
									'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
									errors.errorEnum.SYSTEM_ERROR
								);
							});
							
				})
				.catch(err => {
					console.error(err)
					return errors.errorHandler(
						res,
						'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
						errors.errorEnum.SYSTEM_ERROR
					);
				})
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
	(req, res, next) => {
		let pushEndpoint = dataCache.getPushEndpoint(req.pushData.accountId)
		if (pushEndpoint)
			pushEndpoint.socket.emit('onRefCodeActive',{
				accountId: pushEndpoint.accountId,
				balance: req.pushData.balance
			})
		next()
	},
	(req, res) => {
		res.status(201).send({
			success: true,
			balance: req.newBalance
		});
	}
);

// api/chat/getAgencys 
// req: begin, count, order
// res: list 
// cmt: lấy danh sách các Acency 
//------------------------------------------------------------------------------
router.get('/getAgencys',
	(req,res,next) => {
		if (!req.query.begin || !req.query.count || !req.query.order ) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi tham số để lấy dữ liệu.',
				errors.errorEnum.WRONG_REQUEST
			)
		}

		// console.log(req.query.mobileNumber)
		// ChatMessage.find({ $or: [ { accountId_one: req.query.accountId, accountId_two: req.account.accountId }, 
        //                         { accountId_one: req.account.accountId, accountId_two: req.query.accountId } ] })
        //         .then(mess => {
        //             // console.log(mess[0])
        //             req.chatMessage =  mess.map((v,k) => {
        //                 return _.omit(v.toObject(),'_id','__v')
        //             })[0]
		// 			next()
		// 		})
		// 		.catch (err => {
		// 			console.error(err)
		// 			return errors.errorHandler(res, 
		// 				'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
		// 				errors.errorEnum.SYSTEM_ERROR)
		// 		})
	},
	(req, res) => {
		res.status(201).send(req.chatMessage === undefined ? [] : req.chatMessage);
	}
)

module.exports = router;

