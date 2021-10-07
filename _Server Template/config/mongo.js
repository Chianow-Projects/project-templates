const mongoose = require('mongoose');
const chalk = require('chalk');
module.exports = {
	connectToServer: function(callback) {
		var mongoDB = process.env.MONGODB_URI;
		mongoose.Promise = global.Promise;
		mongoose.connect(mongoDB,{ useUnifiedTopology: true,useNewUrlParser: true });
		mongoose.set('useCreateIndex', true);
		mongoose.set('useFindAndModify', false);
		mongoose.connection.on(
			'error',
			console.error.bind(
				console,
				'%s MongoDB connection error. Please make sure MongoDB is running.',
				chalk.red('✗')
			)
		);
		return callback();
	}
};
