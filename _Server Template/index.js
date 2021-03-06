const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const compression = require('compression');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const expressStatusMonitor = require('express-status-monitor');
const bodyParser = require('body-parser');
// const mongoUtil = require('./config/mongo');
const dataCache = require('./controllers/dataCache')
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const config = require('./config/auth');
const auth = require('./controllers/auth')
const chat = require('./controllers/chat')

const globaldt = require ('./utils/global')

// console.log(fs);

//Load environment variables
require('dotenv').config();


//Route handlers
// const authApi = require('./controllers/auth.api');
// const chatApi = require('./controllers/chat.api');
const surveyApi = require('./controllers/survey.api');
// const sesameApi = require('./controllers/sesame.api');


//Create server
const app = express();
const ioApp = require('http').createServer(()=>{});

//DB setup
// mongoUtil.connectToServer(err => {
// 	if (err) return console.log(err);
// });

//Express configuration
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 1140);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use('/resources',
	express.static(path.join(__dirname, 'public'), {
		maxAge: 31557600000
	})
);

//Error handler
app.use(errorHandler());

//API routes
// app.use('/api/auth', authApi);
// app.use('/api/chat', chatApi);
app.use('/api/survey', surveyApi);
// app.use('/api/sesame', sesameApi);


//Upload file
app.use(fileUpload());
app.post('/upload', (req, res) => {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');
	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;
	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(__dirname + '/public/images/avatas/avata_d.jpg', function (err) {
		if (err) {
			console.log(err)
			return res.status(500).send(err);
		}
		res.send('File uploaded!');
	});
});


app.listen(app.get('port'), () => {
	console.log(
		'%s API Server is running at http://localhost:%d',
		chalk.green('???'),
		app.get('port'),
	);
});

ioApp.listen(process.env.PUSH_PORT || 1369, () => {
	console.log(
		'%s Socket Server is running at http://localhost:%d',
		chalk.green('???'),
		process.env.PUSH_PORT
	);
});

var io = require('socket.io')(ioApp);
io.on('connection', socket => {

	console.log(`${chalk.greenBright(`CMS K???t n???i`)}`) 
	
	// socket.isVerified = false
	globaldt.mySocket = socket
	
	//Y??u c???u client g???i l??n accessToken
	socket.emit('onAccessToken', socket.id);

	//Sau 3s kh??ng x??c minh ???????c accessToken s??? ????ng k???t n???i.
	// setTimeout(() => {
	// 	!socket.isVerified && socket.disconnect();
	// }, 3000)

	//S??? ki???n ng???t k???t n???i
	socket.on('disconnect', () => {
		console.log(`${chalk.red(`CMS Ng???t k???t n???i`)}`) 
		// console.log(`${chalk.red(`<-`)} T??i kho???n [${chalk.red(socket.accountId)}] ng???t k???t n???i socket.`);
		//C???p nh???t tr???ng th??i ONLINE cho t??i kho???n.
		// auth.updateAccountStatus(socket.accountId, 'OFFLINE')
		// socket.isVerified = false
		// socket.accountId = null
	});

	// socket.on('onAccessToken', (data) => {
	// 	//Kh??ng g???i ???????c accessToken
	// 	if (!data.accessToken) return false

	// 	//Ki???m tra accessToken
	// 	jwt.verify(data.accessToken, config.secret, (err, acc) => {
	// 		if (err) {
	// 			return false
	// 		} else {
	// 			socket.isVerified = true
	// 			socket.accountId = acc.accountId
	// 			dataCache.addPushEndpoint({
	// 				accountId: acc.accountId,
	// 				socket: socket
	// 			})
	// 			//C???p nh???t tr???ng th??i ONLINE cho t??i kho???n.
	// 			auth.updateAccountStatus(acc.accountId, 'ONLINE')
	// 			console.log(`${chalk.green(`->`)} T??i kho???n [${chalk.green(acc.accountId)}] ???? k???t n???i socket...`);
	// 		}
	// 	});
	// })

	socket.on('onChatMessage', (data) => {
		
	})
});

