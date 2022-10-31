const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('psm-ui')
        .setDescription('Retrieve link to PSM UI'),
    async execute(interaction) {
        return interaction.reply({ embeds: [{"title": 'PSM UI on IPFS', "description": 'https://ipfs.io/ipfs/QmdFEcowhVbEabe68LMH8UuXweU8jnmQ7J28uUhFeeaY9X/', "color": 15258703}], ephemeral: true })
    }
};
