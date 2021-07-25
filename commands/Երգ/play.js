const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    description: "Երգեր",
    usage: "[prefix]play <Song Name / URL>",
    aliases: ["p"],
    run: async (client, message, args) => {
      if (!message.member.voice.channel) {
        const playError = new MessageEmbed()
          .setDescription("Խնդրում ենք միանալ VC- ին")
          .setColor("RANDOM")
        return message.channel.send(playError)
      }
      const voiceChannel = message.member.voice.channel
      const permissions = voiceChannel.permissionsFor(message.client.user)
      if (!permissions.has("SPEAK")) {
        const playError2 = new MessageEmbed()
          .setDescription("Ես խոսելու թույլտվություն չունեմ այս VC- ում")
          .setColor("RANDOM")
        return message.channel.send(playError2)
      }
      if (!permissions.has("CONNECT")) {
        const playError3 = new MessageEmbed()
          .setDescription("Ես թույլտվություններ չունեմ միանալու ձեր մասնակցած VC- ին:.")
          .setColor("RANDOM")
        return message.channel.send(playError3)
      }

      let songName = args.slice(0).join(" ")
      if (!songName) {
        const playError2 = new MessageEmbed()
          .setDescription("Խնդրում ենք տրամադրել երգի անուն կամ երգի URL")
          .setColor("RED")
        return message.channel.send(playError2)
      }

      try {
        voiceChannel.join().then(connection => {
          connection.voice.setSelfDeaf(true)
        })
        client.distube.play(message, songName)
      } catch (err) {
        message.channel.send(`ERR - Հնարավոր չէ երգը նվագել: \ n Սխալ: ||${err}||`)
      }
  },
};
