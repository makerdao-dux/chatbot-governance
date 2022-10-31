const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('psm-ui-swarm')
        .setDescription('Retrieve link to PSM UI on Swarm'),
    async execute(interaction) {
        return interaction.reply({ embeds: [{"title": 'PSM UI on Swarm', "description": 'https://bah5qcgza6fwctkmylpiqa2tg6iwjk4nzgynbah5u3sfclhaztncnguitcwya.bzz.link/', "color": 15258703}], ephemeral: true })
    }
};
