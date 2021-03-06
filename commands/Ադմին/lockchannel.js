const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'lock',
    description: "Կողպում է ալիքները և թույլ չի տալիս բոլորին հաղորդագրություններ ուղարկել!",
    usage: "[prefix]lock <#channel> <reason>",
    aliases: ['lockc'],
    run: async(client, message, args) => {

        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            const lockchannelError = new MessageEmbed()
            .setDescription('You don\'t have permission to lock channels!')
            .setColor("RANDOM")

            return message.channel.send(lockchannelError)
        }

        let channel = message.mentions.channels.first();
        let reason = args.join(" ") || 'Not Specified'

        if(channel) {
            reason = args.join(" ").slice(22) || 'Not Specified'
        } else (
            channel = message.channel
        )

        if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
            const lockchannelError2 = new MessageEmbed()
            .setDescription(`${channel} արդեն կողպված է!`)
            .setColor("RANDOM")

            return message.channel.send(lockchannelError2)
        }

        channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: false })

        const embed = new MessageEmbed()
        .setTitle(`Ալիքը կողպված է!`)
        .setDescription(`**Ալիք:** ${channel} \n **Պատճար:** ${reason}`)
        .setColor("RANDOM")

        message.channel.send(embed)

    }
}