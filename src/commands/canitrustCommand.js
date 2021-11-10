const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('canitrust')
        .setDescription('Verifies if the target user has MakerDAO role assigned')
        .addUserOption(option => option.setName('target').setDescription('to check the targeted user\'s role')),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (member.roles.cache.some(role => role.name === 'MakerDAO')) {
            return interaction.reply({ content: `:white_check_mark: ${member} is a member of MakerDAO role. Never share your private keys or any other sensitive data!`, ephemeral: true });
        } else {
            return interaction.reply({ content: `:exclamation: :exclamation: ${member} is NOT a member of MakerDAO role, be cautios!!! Never share your private keys or any other sensitive data! :exclamation: :exclamation:`, ephemeral: true });
        }
    }
};
