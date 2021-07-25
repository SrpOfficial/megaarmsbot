const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'weather',
    description: "Gives You The Weather and info about a specific place",
    usage: "[prefix]weather [location]", 
    aliases: ['temp', 'time', 'temperatire', 'weather'],
    run: async(client, message, args) => {
        const ErrorEmbed  = new MessageEmbed()
        .setDescription("Please specify a location")
        .setColor("RAMDOM")

        weather.find({search: args.join(" "), degreeType: 'C'}, function(error, result) {
            if(error) return message.channel.send(error)
            if(!args[0]) return message.channel.send(ErrorEmbed)

            if( result === undefined || result.lenght === 0) return message.channel.send("Անվավեր տեղադրություն :x:")
            var current = result[0].current;
            var location = result[0].location;

            const weatherInfo = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Եղանակի հաշվետվություն ${current.observationpoint}`)
            .setImage(current.imageUrl)
            .setColor("RANDOM")
            .addField("Ժամային գոտի" , `UTC${location.timezone}`, true)
            .addField("Աստիճանի տեսակը" , "Celcius", true)
            .addField("ջերմաստիճանը", `${current.temperature}` , true)
            .addField('Քամի', `${current.winddisplay}` , true)
            .addField('Մագնիսական դաշտ', `${current.feelslike}`, true)
            .addField('Խոնավություն', `${current.humidity}` , true)
            .setFooter('Տվյալները տրամադրվում են weather.service.msn.com կայքից, եթե տվյալները սխալ են, խնդրում ենք զեկուցել դրանց մասին')


            message.channel.send(weatherInfo)
        })
    }
}