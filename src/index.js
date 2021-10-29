require('dotenv').config();
const pollsModule = require('./polls');
const { Client } = require('discord.js');
const { default: BigNumber } = require('bignumber.js');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.login(process.env.BOT_TOKEN);
client.on('ready', () => console.log(`${client.user.tag} has logged in.`));



client.on('messageCreate', async message => {
    // console.log(message.content)
    if (message.author.bot) {
        return;
    }



    if (message.content.toLowerCase() === '!polls') {
        const response = await message.channel.send("Getting the current polls...")

        const polls = await pollsModule.fetchPolls()
        // console.log(JSON.stringify(polls, null, 2))


        if (polls.length === 0) {
            await message.channel.send("No active polls right now")
        } else {
            const pollsMessage = polls.map(item => {

                const results = item.tally.results.map(r => {
                    return `   - ${r.optionName} - Total MKR ${r.mkrSupport.toFixed(2)}`
                }).join('\n')

                const messagePoll = `💡 ${item.poll.title} 🏆 winning option: ${item.tally.winningOptionName}. \n Total MKR participation: ${new BigNumber(item.tally.totalMkrParticipation).toFixed(2)}. \n Total Participants: ${item.tally.numVoters}. \n${results}`
                return messagePoll
            }).join('\n')

            await message.channel.send("```css\n"+ pollsMessage+ "```")
        }


        console.log('done')
    }
});
