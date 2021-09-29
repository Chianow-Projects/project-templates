
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

function sendMessage(content, channelId='892571527000776835') {

	const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

	function logOutDiscordBot(){
		client.destroy();
	}

	client.on('ready', () => {
		client.channels.fetch(channelId).then(channel => {
			channel.send(content).then(setTimeout(logOutDiscordBot, 200));
		}).catch(console.error);
		
	});

	// Login to Discord with your client's token
	client.login(token);
}

module.exports = { sendMessage };

