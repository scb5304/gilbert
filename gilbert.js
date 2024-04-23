// https://discordjs.guide/creating-your-bot/main-file.html#running-your-application
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.DISCORD_TOKEN;

const channelNamesMap = require('./names.json')
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

client.once(Events.ClientReady, onConnected);
client.login(token);

function onConnected(readyClient) {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	let channelManager = readyClient.channels
	channelManager.fetch('709288174526136326')
		.then(channel => {
			console.log(channel.name)
			let currentDay = days[new Date().getDay()]
			console.log("It's " + currentDay)

			let minutes = 60
			let minutesInMillis = minutes * 60 * 1000;
			setInterval(checkChannel, minutesInMillis);
		}).catch(console.error)
}

function checkChannel() {
	console.log("Checking day...");
	let potentiallyNewDay = days[new Date().getDay()]
	if (potentiallyNewDay != currentDay) {
		currentDay = potentiallyNewDay
		console.log("It's now " + currentDay)
		let namesPool = channelNamesMap[currentDay]
		var randomNumber = getRandomInt(0, namesPool.length - 1)

		let newChannelName = channelNamesMap[currentDay][randomNumber]
		console.log("Setting channel name to " + newChannelName)
		channel.setName(newChannelName).then(function() {
			console.log("I did it!")
		}).catch(console.error);
	}
}

// https://stackoverflow.com/a/1527820/4672234
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}