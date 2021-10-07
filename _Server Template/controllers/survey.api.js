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

const SurveyServicesConfig = require('../models/SurveyServicesConfigs');
const SurveyReasonConfig = require('../models/SurveyReasonConfigs');
const SurveyAgeConfig = require('../models/SurveyAgeConfigs');
const SurveyStarConfig = require('../models/SurveyStarConfigs');

let rawdata = fs.readFileSync('dashboard.json');

const globaldt = require('../utils/global')

globaldt.dashboard = JSON.parse(rawdata);

const { Telegraf } = require('telegraf');
const data = require('../utils/global');
// const bot = new Telegraf('1238965232:AAECK9NS-sPkn40LT0Qp7Mh2j-nnKxTTPWE')
// const bot = new Telegraf('996691129:AAENUfUATQDFwWfNxl8uyrADzRQr9AKjCis')
const bot = new Telegraf('1369385857:AAFtl0Ey5_i4hR_NYd_B0LnC4SHHtWxoMXI')


//Giả lập 
const rdt = ['18 tuổi -> 24 tuổi', '25 tuổi -> 34 tuổi', '35 tuổi -> 44 tuổi', '45 tuổi -> 54 tuổi', 'Trên 55']
const rdv = ['Chuyển tiền qua SĐT', 'Chuyển tiền liên NH', 'Nạp tiền', 'Nạp tiền điện thoại', 'Mua thẻ cào', 'Mua data', 'Điện thoại cố định', 'Tiền điện', 'Tiền nước', 'Internet']
const rnn = ['Bảo mật thông tin', 'Tốc độ giao dịch', 'Thao tác', 'Chi phí', 'Khuyễn mãi', 'Lỗi', 'Khác']
const rates = ['Một sao', 'Hai sao', 'Ba sao', 'Bốn sao', 'Năm sao']

globaldt.csattotal = 0
globaldt.csatrate = [0, 0, 0, 0, 0]

globaldt.csatdata = {
    '18 tuổi -> 24 tuổi': [0, 0, 0, 0, 0],
    '25 tuổi -> 34 tuổi': [0, 0, 0, 0, 0],
    '35 tuổi -> 44 tuổi': [0, 0, 0, 0, 0],
    '45 tuổi -> 54 tuổi': [0, 0, 0, 0, 0],
    'Trên 55': [0, 0, 0, 0, 0],

    'Chuyển tiền qua SĐT': [0, 0, 0, 0, 0],
    'Chuyển tiền liên NH': [0, 0, 0, 0, 0],
    'Nạp tiền': [0, 0, 0, 0, 0],
    'Nạp tiền điện thoại': [0, 0, 0, 0, 0],
    'Mua thẻ cào': [0, 0, 0, 0, 0],
    'Mua data': [0, 0, 0, 0, 0],
    'Điện thoại cố định': [0, 0, 0, 0, 0],
    'Tiền điện': [0, 0, 0, 0, 0],
    'Tiền nước': [0, 0, 0, 0, 0],
    'Internet': [0, 0, 0, 0, 0],

    'Bảo mật thông tin': [0, 0, 0, 0, 0],
    'Tốc độ giao dịch': [0, 0, 0, 0, 0],
    'Thao tác': [0, 0, 0, 0, 0],
    'Chi phí': [0, 0, 0, 0, 0],
    'Khuyễn mãi': [0, 0, 0, 0, 0],
    'Lỗi': [0, 0, 0, 0, 0],
    'Khác': [0, 0, 0, 0, 0],
}

router.get('/data',
    (req, res, next) => {

        let config1 = [
            { serviceDes: 'Chuyển tiền', },
            { serviceDes: 'Chuyển tiền liên NH', },
            { serviceDes: 'Chuyển tiền qua SĐT', },
            { serviceDes: 'Viễn thông', },
            { serviceDes: 'Mua thẻ cào', },
            { serviceDes: 'Mua data', },
            { serviceDes: 'Điện thoại cố định', },
            { serviceDes: 'Thanh toán hoá đơn', },
            { serviceDes: 'Tiền điện', },
            { serviceDes: 'Tiền nước', },
            { serviceDes: 'Internet', },
            { serviceDes: 'Truyền hình', },
        ]

        let config2 = [
            { reasonDes: 'Bảo mật thông tin', },
            { reasonDes: 'Tốc độ giao dịch', },
            { reasonDes: 'Thao tác', },
            { reasonDes: 'Chi phí', },
            { reasonDes: 'Khuyễn mãi', },
            { reasonDes: 'Lỗi', },
            { reasonDes: 'Khác', },
        ]

        let config3 = [
            { ageDes: '18-24', },
            { ageDes: '25-34', },
            { ageDes: '35-44', },
            { ageDes: '45-54', },
            { ageDes: 'Trên 55', },
        ]

        let config4 = [
            { starDes: 'Rất hài lòng', },
            { starDes: 'Hài lòng', },
            { starDes: 'Bình thường', },
            { starDes: 'Không hài lòng', },
            { starDes: 'Rất không hài lòng', },
        ]

        config1.map(r => {
            SurveyServicesConfig.create(new SurveyServicesConfig({
                serviceDes: r.serviceDes
            }))
        })

        config2.map(r => {
            SurveyReasonConfig.create(new SurveyReasonConfig({
                reasonDes: r.reasonDes
            }))
        })

        config3.map(r => {
            SurveyAgeConfig.create(new SurveyAgeConfig({
                ageDes: r.ageDes
            }))
        })

        config4.map(r => {
            SurveyStarConfig.create(new SurveyStarConfig({
                starDes: r.starDes
            }))
        })
        next()
    },
    (req, res) => {
        res.status(201).send(req.chatMessage === undefined ? [] : req.chatMessage);
    }
)

router.get('/dashboard',
    (req, res, next) => {
        next()
    },
    (req, res) => {
        res.status(200).send(globaldt.dashboard);
    }
)

router.get('/push',
    (req, res, next) => {
        cal()
        globaldt.mySocket.emit('newData', '@')
        next()
    },

    (req, res) => {
        res.status(200).send('OK');
    }
)

const cal = () => {
    globaldt.dashboard.CSAT_total = globaldt.csattotal
    globaldt.dashboard.CSAT_per = 100
    globaldt.dashboard.CSAT_avg = (globaldt.csattotal === 0) ? 0 : ((globaldt.csatrate[0] +
        globaldt.csatrate[1] * 2 +
        globaldt.csatrate[2] * 3 +
        globaldt.csatrate[3] * 4 +
        globaldt.csatrate[4] * 5) /
        globaldt.csattotal).toFixed(2)

    globaldt.dashboard.dataCSAT_avg.map(obj => {
        let dv = obj.dv
        let total = globaldt.csatdata[dv][0] +
            globaldt.csatdata[dv][1] +
            globaldt.csatdata[dv][2] +
            globaldt.csatdata[dv][3] +
            globaldt.csatdata[dv][4]
        for (let i = 0; i < 5; i++) {
            obj.csat[i] = (total === 0) ? 0 : (globaldt.csatdata[dv][i] * 100 / total).toFixed(2)
        }
    })

    globaldt.dashboard.data01.map(obj => {
        let nn = obj["Nguyên Nhân"]
        let total = _.sum(globaldt.csatdata[nn])
        let avg = (total === 0) ? 0 : ((globaldt.csatdata[nn][0] +
            globaldt.csatdata[nn][1] * 2 +
            globaldt.csatdata[nn][2] * 3 +
            globaldt.csatdata[nn][3] * 4 +
            globaldt.csatdata[nn][4] * 5) / total).toFixed(2)
        obj['Số lượng'] = total
        obj['Điểm CSAT tb'] = avg
        obj['Ảnh hưởng'] = (1 - (avg - globaldt.dashboard.CSAT_avg)).toFixed(2)
        obj['Tỷ lệ'] = ((total / globaldt.dashboard.CSAT_total) * 100).toFixed(2)
    })

    globaldt.dashboard.data02.map(obj => {
        let dv = obj["Dịch vụ"]
        let total = _.sum(globaldt.csatdata[dv])
        let avg = (total === 0) ? 0 : ((globaldt.csatdata[dv][0] +
            globaldt.csatdata[dv][1] * 2 +
            globaldt.csatdata[dv][2] * 3 +
            globaldt.csatdata[dv][3] * 4 +
            globaldt.csatdata[dv][4] * 5) / total).toFixed(2)
        obj['Số lượng'] = total
        obj['Điểm CSAT tb'] = avg
        obj['Ảnh hưởng'] = (1 - (avg - globaldt.dashboard.CSAT_avg)).toFixed(2)
        obj['Tỷ lệ'] = ((total / globaldt.dashboard.CSAT_total) * 100).toFixed(2)

    })

    globaldt.dashboard.data03.map(obj => {
        let dt = obj["Độ tuổi"]
        let total = _.sum(globaldt.csatdata[dt])
        let avg = (total === 0) ? 0 : ((globaldt.csatdata[dt][0] +
            globaldt.csatdata[dt][1] * 2 +
            globaldt.csatdata[dt][2] * 3 +
            globaldt.csatdata[dt][3] * 4 +
            globaldt.csatdata[dt][4] * 5) / total).toFixed(2)
        obj['Số lượng'] = total
        obj['Điểm CSAT tb'] = avg
        obj['Ảnh hưởng'] = (1 - (avg - globaldt.dashboard.CSAT_avg)).toFixed(2)
        obj['Tỷ lệ'] = ((total / globaldt.dashboard.CSAT_total) * 100).toFixed(2)
    })
}

router.post('/rate',
    (req, res, next) => {

        var data = req.body

        // // Kiểm tra tính hợp lệ 
        // if (!data.t || !data.dv || !data.nn || !data.rate) {
        //     return errors.errorHandler(
        //         res,
        //         'Đầu vào không hợp lệ',
        //         errors.errorEnum.WRONG_REQUEST
        //     );
        // } 

        console.log(data)

        globaldt.csattotal += 1
        globaldt.csatrate[data.rate] += 1

        globaldt.csatdata[data.t][data.rate] += 1
        globaldt.csatdata[data.dv][data.rate] += 1

        data.nn.map(r => {
            globaldt.csatdata[r][data.rate] += 1
        })

        // console.log(globaldt.csatdata)
        req.data = data
        next()
    },

    (req, res) => {
        cal()
        globaldt.mySocket.emit('newData', '@')

        // if (req.data.rate < 2) {
        //     bot.telegram.sendSticker('@survey_moniter', 'CAACAgQAAxUAAV-Z8XxfTfvgMhFkVP1oMuZfFnBVAAJBAgACS2nuEDR_yT7jIRPOGwQ')

        //     var d = Date(Date.now());
        //     let str = 'Có khách phản hồi không tốt !' + '\n' +
        //         '----------------------------' + '\n' +
        //         'Dịch vụ: ' + req.data.dv + '\n' +
        //         'Độ tuổi: ' + req.data.t + '\n' +
        //         'Nguyên nhân: ' + req.data.nn + '\n' +
        //         'Đánh giá: ' + rates[req.data.rate] + '\n' +
        //         'Thời gian: ' + d.toString() + '\n' +
        //         '----------------------------'
        //     bot.telegram.sendMessage('@survey_moniter', str)
        // }

        res.status(200).send('{}');
    }
)

router.get('/rateall',
    (req, res, next) => {
        for (let i = 0; i < 10; i++) {
            let dt = rdt[_.random(0, 4)]
            let dv = rdv[_.random(0, 9)]
            let nn = rnn[_.random(0, 6)]
            let rate = _.random(0, 4)
            globaldt.csattotal += 1
            globaldt.csatrate[rate] += 1
            globaldt.csatdata[dt][rate] += 1
            globaldt.csatdata[dv][rate] += 1
            // nn.map(r=>{
            globaldt.csatdata[nn][rate] += 1
            // })
        }
        next()
    },
    (req, res) => {
        console.log(globaldt.csatdata)
        res.status(200).send('ok');
    }
)

module.exports = router;

