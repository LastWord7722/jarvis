require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});
const config = require('../config/common.json');
const prefix = config.prefix;
const commandsHelper = require('./helpers/commandsHelpers');
client.config = config


// Load commands
commandsHelper.loadCommands();

client.on('ready', () => {
    console.log(`Bot Jarvis start`);
});

client.on('messageCreate', (message) => {
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commandsHelper.getCommand(commandName);

    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Произошла ошибка при выполнении команды!');
    }
});

client.login(process.env.DISCORD_TOKEN);
