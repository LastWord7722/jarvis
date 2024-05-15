require('dotenv').config();
const Discord = require('discord.js');
// Using Intents class
const client = new Discord.Client({ intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages
    ]})
const fs = require('fs');
const path = require('path');
const prefix = '!';

//take all file from commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const commands = require(path.join(__dirname, 'commands', file));
}
client.on('ready', () => {
    console.log(`Я ЖИВУ11!`);
});
//event message
client.on('messageCreate', (message) => {
    //what this??
    console.log(!message.guild)
    console.log(message.author)
    if (!message.guild) return;
    if (message.author.bot) return;
    // if (!message.content.startsWith(prefix)) return;
    let command = message.content.toLocaleLowerCase().split(" ")[0].slice(prefix.length);
    let params = message.content.split(" ").slice(1);
    let cmd;
    console.log(message)
    console.log(command)
    if (command === 'h') {
        message.reply("Hey!.")
    }
});


client.login(process.env.DISCORD_TOKEN);
