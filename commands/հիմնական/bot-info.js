const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'botinfo',
    description: "Ստացեք հիշատակված օգտվողների Նկարները",
    usage: "[prefix]botinfo",
    aliases: ["bot", "about"],
    nsfwOnly: true,
    run: async(client, message, args) => {
        const member = message.mentions.users.first() || message.author;
        const avatar = member.displayAvatarURL({ dynamic: true, size: 1024 })

        const embed = new MessageEmbed()
        .setTitle(`ԲՈՏԻ ՄԱՍԻՆ`)
        .setColor("RANDOM")
        .setAuthor(`Arm's Bot Բոտի Մասին:`, `https://cdn.discordapp.com/emojis/752981264751001630.gif?v=1.gif`)
        .addFields(
        { name: 'Բոտի Տեր', value: `it'sCrazyDavツ#0047`, inline: false  },
        { name: 'Բոտի վերսիա', value: `1․0`, inline: false  },
        { name: 'Բոտի այդի', value: `849859826364186674`, inline: false  },
        { name: 'Ծրագրավորման լեզու', value: `node.js (JavaScript)`, inline: false },
        { name: 'Գրադարան' , value: `Discord.js`, inline: false },
        { name: 'Դիսքորդ սերվեր', value: `[Invite](https://discord.gg/qmB8NgG3RQ)`, inline: false },
      )

        message.channel.send(embed)
    }
}