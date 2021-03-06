const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const errors = require('./error');
const dataCache = require('./dataCache');
var fs = require('fs');
var FormData = require('form-data');
const axios = require('axios');
// Database Models
const Account = require('../models/Accounts');
const ChatMessage = require('../models/ChatMessages');

//------------------------------------------------------------------------------
router.get('/ekyc',
	(req,res,next) => {

		let url = 'https://api.fpt.ai/dmp/checkface/v1';
		// let path = process.env.PATH;
		var form = new FormData();

		form.append('file[]', fs.createReadStream('01.jpg'), {filename: '01.jpg'});
		form.append('file[]', fs.createReadStream('02.jpg'), {filename: '02.jpg'});
			
		axios.create({
			headers: {...form.getHeaders(),'api-key' : 'ONBdqtoMpwfhISU0UVtziAfpdaSoLCzW'}
		})
		.post('https://api.fpt.ai/dmp/checkface/v1', form)
		.then(response => {
			console.log(response.data);
			}).catch(error => {
			if (error.response) {
			console.log(error.response);
			}
			console.log(error.message);
		});

		
		// console.log(form)
		
	},
	(req, res) => {
		res.status(201).send(req.chatMessage === undefined ? [] : req.chatMessage);
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

// api/chat/getmessages 
// req: accountId
// res: list 
// cmt: lấy dữ liệu chát của mình và 1 người khác.
//------------------------------------------------------------------------------
router.get('/getmessages',
	(req,res,next) => {
		if (!req.query.accountId) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi accountId của đối tượng chat.',
				errors.errorEnum.WRONG_REQUEST
			)
		}
		// console.log(req.query.mobileNumber)
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


module.exports = router;

