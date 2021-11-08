const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const pollsModule = require('../modules/polls');
const { default: BigNumber } = require('bignumber.js');

function getPollsMessage(polls) {
    return polls.map(item => {

        // const results = item.tally.results.map(r => {
        //     return `   - ${r.optionName} - ${r.mkrSupport.toFixed(2)}MKR`
        // }).join('\n')

        const messagePoll = `- <a href="https://vote.makerdao.com/polling/${item.poll.slug}">${item.poll.title.length > 200 ? item.poll.title.substring(0, 200) + '...' : item.poll.title}</a> 🏆 1st option: ${item.tally.winningOptionName} ${item.tally.winningOptionMKR.toFixed(2)}`
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
            interaction.reply({ content: 'No active polls right now', ephemeral: true })
        } else {
            
            const firstPolls = polls.slice(0, 3);
            const lastPolls = polls.slice(3, polls.length)
            const firstPollsMessage = getPollsMessage(firstPolls)

            interaction.editReply({ content: '```css\n'+ firstPollsMessage+ '```', ephemeral: true })

            if (lastPolls.length > 0 ) {
                interaction.reply({ content: '```css\n'+ getPollsMessage(lastPolls)+ '```', ephemeral: true })
            }
        }


        console.log('done')
    }
};
