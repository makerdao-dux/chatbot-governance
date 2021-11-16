const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coreunit')
        .setDescription('Lists Core Units in MakerDAO')
        .addStringOption((option) =>
	  option
		.setName('name')
		.setDescription('Core Unit name')
		.addChoices([
			['CES-001: Collateral Engineering', 'Collateral Engineering Service'],
			['MKT-001: Content Production', 'Content Production'],
			['DAIF-001: Dai Foundation', 'Dai Foundation'],
			['DUX-001: Development and UX', 'Development & UX'],
			['GOV-001: GovAlpha', 'GovAlpha'],
			['COM-001: Governance Communications', 'Governance Communications'],
			['GRO-001: Growth', 'Growth'],
			['SH-001: Strategic Happiness', 'Strategic Happiness'],
			['ORA-001: Oracles', 'Oracles'],
			['PE-001: Protocol Engineering', 'Protocol Engineering'],
			['RWF-001: Real World Finance', 'Real World Finance'],
			['RISK-001: Risk', 'Risk'],
			['SES-001: Sustainable Ecosystem Scaling', 'Sustainable Ecosystem Scaling'],
			['SNE-001: Starknet Engineering', 'Starknet Engineering'],
			['MDS-001: MakerDAO Shop', 'MakerDAO Shop'],
			['DIN-001: Data Insights', 'Data Insights'],
		]),
        ),
    async execute(interaction) {
	const coreunitname = interaction.options.getString('name');

	var roles = await interaction.guild.roles.fetch();
	var replied = false;
	roles.filter((role) => role.name === coreunitname + ' Member').some(function(role, index, array) {
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
          interaction.reply({ embeds: [{"title": role.name.toUpperCase()+'S', "description": message, "color": 15258703}], ephemeral: true } )
	  replied = true
	})

	if (!replied) {
	  interaction.reply({ content: '```Core Unit Not Found```', ephemeral: true })
	}
    }
}
