const commandsHelper = require("../helpers/commandsHelpers");
const Discord = require('discord.js');
const prefix = require("../../config/common.json").prefix;

const ignoreCommand = ['example', 'common']

commandsHelper.loadCommands();

module.exports = {
    name: 'help',
    description: 'this help command',
    example: '!help or !help with argument at example : !help help',
    execute(message, args) {
        const embed = new Discord.EmbedBuilder().setColor('#b400ff')
        const nameCommand = args[0]?.startsWith(prefix)
            ? args[0].slice(prefix.length)
            : args[0];

        if (nameCommand){
            const commandByArg = commandsHelper.getCommand(nameCommand);
            if ((ignoreCommand.includes(nameCommand) || !commandByArg) ){
                setStringEmbed(embed, `Команда "${nameCommand}": не найдена \nСписок доступных команд:`)
                addFieldsToCommandList(embed)
                message.channel.send({ embeds: [embed] });
                return;
            }
            setStringEmbed(embed, `Информация по команде ${prefix}${commandByArg.name}:`)
            setFields(embed,`${prefix}${commandByArg.name}`, `${commandByArg.description}`)

            message.channel.send({ embeds: [embed] });
            return;
        }

        setStringEmbed(embed, `Список команд: `, 'Список доступных команд')
        addFieldsToCommandList(embed)
        message.channel.send({ embeds: [embed] });
    }
};

function addFieldsToCommandList(embed){
    for (const command of commandsHelper.getCommands()) {
        if (!command || Object.keys(command).length === 0 || ignoreCommand.includes(command.name)) {
            continue;
        }
        let desc = command.description
        if (command.example) desc += `\n For example: ${command.example}`
        setFields(embed,`${prefix}${command.name}`, `${desc}`)
    }
}
function setFields(embed, name, description){
    embed.addFields(
        {
            name: name,
            value: description
        }
    );
}
function setStringEmbed(embed, title = null, description = null){
    embed.setTitle(title)
        .setDescription(description)
        .setTimestamp();
}