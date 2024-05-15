const fs = require('fs');
const path = require('path');

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const commands = require(path.join(__dirname, 'commands', file));
}

console.log('denis hello this is git');
console.log('Занимаемся хуетой(учим гит)');
