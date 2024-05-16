const commandsHelper = require("../helpers/commandsHelpers");
const Discord = require('discord.js');
const prefix = require("../configs/config.json").prefix;

commandsHelper.loadCommands();

const ignoreCommand = ['example','common']
module.exports = {
    name: 'help',
    description: 'this help command',
    execute(message, args) {
        const ignoreCommand = ['example', 'common'];

        const embed = new Discord.EmbedBuilder()
            .setColor('#b400ff')
            .setTitle('Список команд')
            .setDescription('Список доступных команд')
            .setTimestamp();


        for (const command of commandsHelper.getCommands()) {
            if (!command || Object.keys(command).length === 0 || ignoreCommand.includes(command.name)) {
                continue;
            }
            embed.addFields({ name: `${prefix}${command.name}`, value: command.description });
        }

        message.channel.send({ embeds: [embed] });
    },
};
