const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const pollsModule = require('../modules/polls');
const { default: BigNumber } = require('bignumber.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('polls')
        .setDescription('Replies with current Maker governance polls'),
    async execute(interaction) {
        interaction.reply({ content: 'Getting the current polls...', ephemeral: true })
        await wait(1000);
        const polls = await pollsModule.fetchPolls()


        if (polls.length === 0) {
            interaction.reply({ content: 'No active polls right now', ephemeral: true })
        } else {
            const pollsMessage = polls.map(item => {

                const results = item.tally.results.map(r => {
                    return `   - ${r.optionName} - Total MKR ${r.mkrSupport.toFixed(2)}`
                }).join('\n')

                const messagePoll = `💡 ${item.poll.title} 🏆 winning option: ${item.tally.winningOptionName}. \n Total MKR participation: ${new BigNumber(item.tally.totalMkrParticipation).toFixed(2)}. \n Total Participants: ${item.tally.numVoters}. \n${results}`
                return messagePoll
            }).join('\n')
            interaction.editReply({ content: '```css\n'+ pollsMessage+ '```', ephemeral: true })
        }


        console.log('done')
    }
};
