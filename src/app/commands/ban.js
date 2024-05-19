const { PermissionsBitField } = require('discord.js');
const database = new (require('../../database/mysqlSevice'))();

module.exports = {
    name: 'ban',
    description: 'this command ban users',
    example: '!ban @user text for reason',
    async execute(message, args) {

        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('У вас нет прав для выполнения этой команды');
        }

        let userToBan = message.mentions.users.first();

        if (!userToBan) {
            userToBan = message.guild.members.cache.find(member => member.user.globalName === `${args[0]}`);
        }
        console.log(userToBan)
        if (!userToBan) {
            console.log('мы таких не знаем')
            return
        }

        const reason = args.slice(1).join(' ') || 'Не указана';


        try {
            database.banUser(userToBan.username,userToBan.id, message.author.username, message.author.id, reason)
            const member = await message.guild.members.fetch(userToBan.id);
            await member.ban({ reason });
            message.reply(`Пользователь ${userToBan.tag} был забанен. Причина: ${reason}`);
        } catch (error) {
            console.error(error);
            message.reply('Произошла ошибка при попытке забанить пользователя.');
        }
    }
};
