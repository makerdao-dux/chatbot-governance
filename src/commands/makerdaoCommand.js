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
	  var members = []
	  role.members.forEach(function(member) {
	    const isFacilitator = member.roles.cache.some(role => role.name.endsWith('Facilitator'))
	    var member = '- '+member.user.username+' <@'+member.id+'> '
	    if (isFacilitator) {
	       member += ':crown:'
	    }
	    members.push(member)
	  })
          const message = `${members.join('\n')}`
          interaction.followUp({ embeds: [{"title": role.name.toUpperCase()+'S', "description": message, "color": 15258703}], ephemeral: true } )
	})
    }
}
