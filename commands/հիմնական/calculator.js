const { MessageEmbed } = require('discord.js')
const math = require('mathjs')

module.exports = {
    name: 'calculator',
    description: "Լուծեք ձեր մաթեմատիկայի տնային առաջադրանքները",
    usage: "[prefix]calculator [հարց]",
    aliases: ['calc', 'calculator'],
    run: async(client, message, args) => {

        if(!args[0]) {
            const calculatorError = new MessageEmbed()
            .setDescription(`Խնդրում եմ նշել մի հարց`)
            .setColor('RANDOM')

            return message.channel.send(calculatorError)
        }

        let result;

        try {
            result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"))
        } catch (error) {
            return message.channel.send(`Անվավեր հաշվարկ`)
        }

        const embed = new MessageEmbed()
        .setAuthor(`Հաշվիչ`, client.user.displayAvatarURL())
        .addField(`Հարց`, `\`\`\`js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
        .addField(`Պատասխան`, `\`\`\`js\n${result}\`\`\``)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
}