const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { fetchChangelog } = require('../modules/changelog');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('Replies with changelog'),
    async execute(interaction) {
        interaction.reply({ content: 'Getting the changelog...', ephemeral: true })
        const data = await fetchChangelog()
        interaction.editReply({ content: data, ephemeral: true })

        

        console.log('done')
    }
};
