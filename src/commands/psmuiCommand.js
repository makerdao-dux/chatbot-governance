const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('psm-ui')
        .setDescription('Retrieve link to PSM UI'),
    async execute(interaction) {
        return interaction.reply({ embeds: [{"title": 'PSM UI on IPFS', "description": 'https://ipfs.io/ipfs/QmXRmkz1NmKZ72NAFQv2qoqUzsXrvCRjLjnm3BjTeMzvRi/', "color": 15258703}], ephemeral: true })
    }
};
