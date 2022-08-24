const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('Replies with chainlog'),
    async execute(interaction) {
        return interaction.reply({ embeds: [{"title": 'MakerDAO Chainlog', "description": 'https://chainlog.makerdao.com/', "color": 15258703}], ephemeral: true })
    }
};