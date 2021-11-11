const { SlashCommandBuilder } = require('@discordjs/builders');
const { fetchChangelog } = require('../modules/changelog');
const ethers = require('ethers');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('oracle')
        .setDescription('Replies with oracle prices')
        .addStringOption(option => option.setName('collateral').setDescription('Enter collateral to query')),
    async execute(interaction) {
        const provider = ethers.getDefaultProvider();
        const collateral = interaction.options.getString('collateral').toUpperCase();
        
        interaction.reply({ content: 'Getting on chain oracle prices...', ephemeral: true })
        
        const pip = await fetchChangelog('PIP_' + collateral)
        const current = await provider.getStorageAt(pip, 3)
        const next = await provider.getStorageAt(pip, 4)
        const currentPrice = ethers.BigNumber.from("0x" + current.substring(34).replace(/^0+/, ''))
        const nextPrice = ethers.BigNumber.from("0x" + next.substring(34).replace(/^0+/, ''))

        const message = `PIP_${collateral}: ${pip}\nCurrent price: ${ethers.utils.formatEther(currentPrice)}\nNext price: ${ethers.utils.formatEther(nextPrice)}`
        interaction.editReply({ content: '```css\n'+ message +  '```', ephemeral: true })

        console.log('done')
    }
};

