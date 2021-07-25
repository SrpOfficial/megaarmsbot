  
const Discord = require("discord.js");
module.exports = {
    name: "ass",
    category: "NSFW",
  description: "Ուղարկում է ԱՍՍ",
  run: async (client, message, args, level) => {

    var superagent = require('superagent');

    if (!message.channel.nsfw) return message.channel.send('Այս ալիքը NSFW ալիք չէ') 

    var lo = new Discord.MessageEmbed()
                .setDescription(`Please wait`)
                .setTimestamp()

    message.channel.send(lo).then(m => {

        superagent.get('https://nekobot.xyz/api/image').query({ type: 'ass'}).end((err, response) => {

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