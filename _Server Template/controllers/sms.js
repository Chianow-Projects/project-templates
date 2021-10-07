
const axios = require('axios');
const md5 = require('md5');

//Gửi SMS tới số điện thoại.
let sent = (sendData, onSuccess, onError) => {

    //Xử lý nhận diện sdt 

    // http://api.speedsms.vn/index.php/sms/send
    // Authorization:Basic cjM2ZnppQUtodmF1RjVfQmJTY2YtZjZmaEtKam5Nc0s6eA==
    // cjM2ZnppQUtodmF1RjVfQmJTY2YtZjZmaEtKam5Nc0s
    // Content-Type:application/x-www-form-urlencoded
    // {"to": ["0968434969"], "content": "chụtttttttttttt", "sms_type": 2, "sender": ""}
    // 

    /*
    const url = 'http://api.speedsms.vn/index.php/sms/send'

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic cjM2ZnppQUtodmF1RjVfQmJTY2YtZjZmaEtKam5Nc0s6eA=='
        }
    };

    axios.post(url, {
        to: [sendData.mobileNumber],
        content: sendData.message, //`Mã OTP đăng ký tài khoản Spay của bạn là: ${req.otp.otpCode} (có hiệu lực 3 phút)` ,
        sms_type: 2,
        sender: ''
    }, config)
        .then(function (response) {
            console.log(response.data);
            onSuccess && onSuccess(response)
        })
        .catch(function (error) {
            console.error(error);
            onError && onError(error)
        });
    */


    let mb = sendData.mobileNumber;
    const url = 'https://api-02.worldsms.vn/webapi/sendSMS'
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic c21zamFjazpieEJwempjRg=='
        }
    };
    axios.post(url, {
        from: '09x',
        to: '84' + mb.substring(1, mb.length),
        text: sendData.message,
    }, config)
        .then(function (response) {
            console.log(response.data);
            onSuccess && onSuccess(response)
        })
        .catch(function (error) {
            console.error(error);
            onError && onError(error)
        });
}

module.exports = {
    sent,
};