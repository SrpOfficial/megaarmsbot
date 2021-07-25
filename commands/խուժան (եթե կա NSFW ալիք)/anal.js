  
const Discord = require("discord.js");module.exports = {
    name: "anal",
    category: "NSFW",
  description: "Ուղարկում է անալ",
  run: async (client, message, args, level) => {

    var superagent = require('superagent');

    if (!message.channel.nsfw) return message.channel.send('Այս ալիքը NSFW ալիք չէ') 

    var lo = new Discord.MessageEmbed()
                .setDescription(`Խնդրում եմ սպասել`)
                .setTimestamp()

    message.channel.send(lo).then(m => {

        superagent.get('https://nekobot.xyz/api/image').query({ type: 'anal'}).end((err, response) => {

            var embed_nsfw = new Discord.MessageEmbed()
                .setDescription(`:underage:\n**[...](${response.body.message})**`)
                .setTimestamp()
                .setImage(response.body.message)
                .setFooter('Խնդրում ենք սպասել նկարի բեռնումին')
            
            m.edit(embed_nsfw);
        });
    });
}
}