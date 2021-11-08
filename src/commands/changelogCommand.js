const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { fetchChangelog } = require('../modules/changelog');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('Replies with changelog')
        .addStringOption(option => option.setName('key').setDescription('Enter a key for the changelog')),
    async execute(interaction) {
        const key = interaction.options.getString('key');
        
        interaction.reply({ content: 'Getting the changelog...', ephemeral: true })
        await wait(1000);
        
        const data = await fetchChangelog(key)
        interaction.editReply({ content: '```css\n'+ data +  '```', ephemeral: true })

        

        console.log('done')
    }
};
