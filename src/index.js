require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
// Require the necessary discord.js classes
const {
    Client,
    Intents,
    Collection
} = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const BOT_TOKEN = process.env['BOT_TOKEN'];
const GUILD_ID = process.env['GUILD_ID'];

const commands = [];

// Creating a collection for commands in client
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`${commandsPath}/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

// When the client is ready, this only runs once
client.once('ready', () => {
    console.log('Ready!');
    // Registering the commands in the client
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: '9'
    }).setToken(BOT_TOKEN);
    (async () => {
        try {
            if (!GUILD_ID) {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands globally');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands for development guild');
            }
        } catch (error) {
            if (error) console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(BOT_TOKEN);
