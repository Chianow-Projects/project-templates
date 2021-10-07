const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const errors = require('./error');
const dataCache = require('./dataCache');
const fs = require('fs');
var FormData = require('form-data');
const axios = require('axios');

let rawdata = fs.readFileSync('sesame_config.json');
let jsondata = JSON.parse(rawdata);

//------------------------------------------------------------------------------
//DATA
//------------------------------------------------------------------------------
let userProfile = {
    coin : 300,
    userId : '',
    name : 'Kenny',
    charList : [
        {
            id: 7,
            name: 'Ernine',
            levelPoint : 10,
            level : 2,
            energy : 1000,
            hasCoin : 2,
            happyTime : 2500,
        },
    ],
    foodList : [
        {
            id: 1,
            qty: 4
        }
    ],
    bookList : [
        {
            id: 1,
            qty: 1
        }
    ]
}

//------------------------------------------------------------------------------
router.get('/getGameURL',
	(req,res,next) => {
        next()
	},
	(req, res) => {
		res.status(200).send(jsondata);
	}
)


//------------------------------------------------------------------------------
router.get('/getconfig',
	(req,res,next) => {
        next()
	},
	(req, res) => {
		res.status(200).send(jsondata);
	}
)

//------------------------------------------------------------------------------
router.get('/getuser',
	(req,res,next) => {
        var token = req.headers['authorization'];
	
        if (!token || token === undefined) {
            return errors.errorHandler(
                res,
                'Lỗi!',
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

        next()
	},
	(req, res) => {
		res.status(200).send(userProfile);
	}
)

//------------------------------------------------------------------------------
router.get('/action',
	(req,res,next) => {
        var token = req.headers['authorization'];
	
        if (!token || token === undefined) {
            return errors.errorHandler(
                res,
                'Request này cần có token.',
                errors.errorEnum.INVALID_TOKEN
            );
        }
	
        token = token.replace('Bearer ', '');
        
        if (token != '524fe699684f920b5c22c35f2d0103e8') {
            return errors.errorHandler(
                res,
                'Token không hợp lệ',
                errors.errorEnum.INVALID_TOKEN
            );
        }
        
        if (!req.query.do || !req.query.id) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi tham số hành động: do = 1->Ăn, do=2->Đọc, id-> Id của item tương ứng (Publish thật sẽ xoá description này)',
				errors.errorEnum.WRONG_REQUEST
			)
		}
        next()
    },
    
	(req, res) => {
		res.status(200).send('Done');
	}
)

//------------------------------------------------------------------------------
router.get('/buy',
	(req,res,next) => {
        var token = req.headers['authorization'];
	
        if (!token || token === undefined) {
            return errors.errorHandler(
                res,
                'Request này phải có token.',
                errors.errorEnum.INVALID_TOKEN
            );
        }
	
        token = token.replace('Bearer ', '');
        
        if (token != '524fe699684f920b5c22c35f2d0103e8') {
            return errors.errorHandler(
                res,
                'Token không hợp lệ',
                errors.errorEnum.INVALID_TOKEN
            );
        }
        
        if (!req.query.type || !req.query.id) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi đủ tham số: type = 1->Food, type=2->Book, id => là id của item tương ứng (Publish thật sẽ xoá description này)',
				errors.errorEnum.WRONG_REQUEST
			)
		}
        next()
    },
    
	(req, res) => {
		res.status(200).send('Done');
	}
)


//------------------------------------------------------------------------------
router.get('/pushNoti',
	(req,res,next) => {
        var token = req.headers['authorization'];
	
        if (!token || token === undefined) {
            return errors.errorHandler(
                res,
                'Request này phải có token.',
                errors.errorEnum.INVALID_TOKEN
            );
        }
	
        token = token.replace('Bearer ', '');
        
        if (token != '524fe699684f920b5c22c35f2d0103e8') {
            return errors.errorHandler(
                res,
                'Token không hợp lệ',
                errors.errorEnum.INVALID_TOKEN
            );
        }
        
        if (!req.query.title || !req.query.info) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi đủ tham số: title- tiêu đề thông báo, info-nội dung thông báo (Publish thật sẽ xoá description này)',
				errors.errorEnum.WRONG_REQUEST
			)
		}
        next()
    },
    
	(req, res) => {
		res.status(200).send('Done');
	}
)

module.exports = router;

