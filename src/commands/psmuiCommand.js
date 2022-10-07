const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('psm-ui')
        .setDescription('Retrieve link to PSM UI'),
    async execute(interaction) {
        return interaction.reply({ embeds: [{"title": 'PSM UI', "description": 'https://bah5qcgza6fwctkmylpiqa2tg6iwjk4nzgynbah5u3sfclhaztncnguitcwya.bzz.link/', "color": 15258703}], ephemeral: true })
    }
};
