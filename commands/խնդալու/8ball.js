const { MessageEmbed } = require('discord.js');
const answers = require('../../data/8ball.json')

module.exports = {
    name: '8ball',
    description: "Պատասխաններ",
    usage: "[prefix]8ball <question>",
    aliases: [],
    run: async(client, message, args) => {
        const question = args.join(" ")

        if(!question) {
            const eightBallError = new MessageEmbed()
            .setDescription('Խնդրում ենք հարց տալ')
            .setColor('RANDOM')
            return message.channel.send(eightBallError)
        }
        const answer = answers[Math.floor(Math.random() * answers.length)];

        const embed = new MessageEmbed()
        .setTitle("8Ball")
        .setColor("RANDOM")
        .addField(`Քո հարցը:`, question)
        .addField(`Իմ պատասխանը:`, answer);
        

        message.channel.send(embed);
        
    }
}