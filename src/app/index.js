require('dotenv').config();
const Discord = require('discord.js');
// Using Intents class
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});
const fs = require('fs');
const path = require('path');
const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();

// Load commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Я живу`);
});

client.on('messageCreate', (message) => {
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Произошла ошибка при выполнении команды!');
    }
});

client.login(process.env.DISCORD_TOKEN);
