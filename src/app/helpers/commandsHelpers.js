const fs = require('fs');
const path = require('path');

module.exports = {
    commands: new Map(),
    loadCommands() {
        const pathCommands = path.join(__dirname, '../commands')
        const commandFiles = fs.readdirSync(pathCommands).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(pathCommands, file));
            if (Object.keys(command).length === 0) continue
            this.commands.set(command.name, command);
        }
    },
    getCommand(name) {
        return this.commands.get(name);
    },
    getCommands() {
        return this.commands.values();
    },
};
