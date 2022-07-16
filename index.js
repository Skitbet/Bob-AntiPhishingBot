const { Client, MessageEmbed } = require("discord.js");
const colors = require("colors");

const domainList = require("./botconfig/domain-list.json");
const susLinks = require("./botconfig/sus-links.json");
const botConfig = require("./botconfig/config.json");
const client = new Client({
  disableEveryone: true,
  partials: ['MESSAGE']
});


client.on('ready', () => {
  // Send bot online status in console
  try{
    const stringlength = 69;
    console.log("\n")
    console.log(`     ┃ `.bold.brightGreen + `Bot has started!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Bot has started!`.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
  }catch{ /* */ }
})



client.on('message', (message) => {

  // Set deleted to true in the first forloop so we dont have to loop though the next loop for performance reasons and to prevent errors!
  var deleted = false;

  // Create embed for logs
  var embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("🚨 Detected a suspicious message! 🚨")
    .setDescription("Deleted message from " + message.author.username + "#" + message.author.discriminator + " for containing a scam or suspicious link!")
    .addField("Author:", "<@" + message.author.id + ">", false)
    .addField("Channel:", "<#" + message.channel.id + ">", false)
    .addField("Message Content:", "```" + message.content + "```", false)
  
  // First loop : Looping though known scam domain list
  for (i = 0; i < domainList.domains.length; i++) {
    // Checking to see if the message content contains the link
    if (message.content.includes(domainList.domains[i])) {
      // Delete the msg
      deleted = true;
      message.delete()

      // Send it to logs
      client.channels.fetch(botConfig.logChannel)
      .then(logChannel => logChannel.send({ embed: embed }))
      return;
    }
  }


  // Checking to see if it was deleted from the first loop, if it was then we wont loop
  if (!deleted) {
    // Second loop : Looping though known sus domain list
    for (i = 0; i < susLinks.domains.length; i++) {

      // Checking to see if the message content contains the link
      if (message.content.includes(susLinks.domains[i])) {

        // Delete the msg
        deleted = true;
        message.delete()

        // Send it to logs
        client.channels.fetch(botConfig.logChannel)
        .then(logChannel => logChannel.send({ embed: embed }))
        return;
      }

    }
  }
});


client.login(botConfig.token);

