module.exports = {
    name: 'coinflip',
    description: 'This command for coinflip',
    execute(message, args) {
        const number = Math.floor(Math.random() * 101);
        message.reply('БРОСОК И...');
        if (number > 50) {
            message.reply('🌕Решка🌕');
        } else if (number < 50) {
            message.reply('🌑ОРЕЛ🌑');
        } else if (number === 50) {
            message.reply('🌗Ребро🌗');
        }
    },
};
