const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('makerdao')
        .setDescription('Lists Core Unit contributors in MakerDAO'),
    async execute(interaction) {

	interaction.reply({ content: '```\nMakerDAO Core Units:\n```', ephemeral: true } )
	var roles = await interaction.guild.roles.fetch();
	roles.filter((role) => role.name.endsWith('Member') && !role.name.startsWith('Core')).forEach(function(role, index, array) {
          const cu = `${role.members.map(m=>'- '+m.user.username+' <@'+m.user.id+'>').join('\n')}`
          interaction.followUp({ embeds: [{"title": role.name.toUpperCase()+'S', "description": cu, "color": 15258703}], ephemeral: true } )
	})
    }
}
