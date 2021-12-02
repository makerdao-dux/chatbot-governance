const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const pollsModule = require('../modules/polls');
const { default: BigNumber } = require('bignumber.js');

function getPollsMessage(polls) {
    return polls.map(item => {

        // const results = item.tally.results.map(r => {
        //     return `   - ${r.optionName} - ${r.mkrSupport.toFixed(2)}MKR`
        // }).join('\n')

        const messagePoll = `- ${item.poll.title.length > 200 ? item.poll.title.substring(0, 200) + '...' : item.poll.title} 🏆 1st option: ${item.tally.winningOptionName} ${item.tally.winningOptionMKR.toFixed(2)}`
        return messagePoll
    }).join('\n')
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('polls')
        .setDescription('Replies with current Maker governance polls'),
    async execute(interaction) {
        interaction.reply({ content: 'Getting the current polls...', ephemeral: true })
        await wait(1000);
        const polls = await pollsModule.fetchPolls()


        if (polls.length === 0) {
            interaction.editReply({ content: 'No active polls right now', ephemeral: true })
        } else {
            
            const pollsSplit = [], size = 4;
    
            while (polls.length > 0) {
                pollsSplit.push(polls.splice(0, size));
            }

            for(var i = 0; i < pollsSplit.length; i++) {
                if (i === 0) {
                    interaction.editReply({ content: '```css\n'+ getPollsMessage(pollsSplit[i])  +  '```', ephemeral: true })
                } else {
                    interaction.followUp({ content: '```css\n'+ getPollsMessage(pollsSplit[i])  +  '```', ephemeral: true })
                }
            }
        }


        console.log('done')
    }
};
