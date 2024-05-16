module.exports = {
    name: 'roll',
    description: 'command for roll',
    execute(message, args) {
        const max = args[0] && args[0] > 0 ? args[0] : 100;

        message.reply(`Roll : от 0 до ${max} \n Рузультат: ${(Math.floor(Math.random() * max))}`);
    },
};
