const { Client, MessageEmbed } = require("discord.js");
const colors = require("colors");
const fs = require("fs");

const domainList = require("./botconfig/domain-list.json");
const susLinks = require("./botconfig/sus-links.json");

const client = new Client({
  disableEveryone: true,
  partials: ['MESSAGE']
});


client.on('ready', () => {
  try{
    const stringlength = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
  }catch{ /* */ }
})



client.on('message', (message) => {

  // Set deleted to true in the first forloop so we dont have to loop though the next loop for performance reasons and to prevent errors!
  var deleted = false;

  var embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("🚨Detected a suspicious message!🚨")
    .setDescription("Deleted message from " + message.author.username + " for containing a scam or suspicious link!")

  for (i = 0; i < domainList.domains.length; i++) {
    if (message.content.includes(domainList.domains[i])) {
      deleted = true;
      message.channel.send({ embed: embed });
      message.delete()
    }
  }

  if (!deleted) {
    for (i = 0; i < susLinks.domains.length; i++) {
      if (message.content.includes(susLinks.domains[i])) {
        deleted = true;
        message.channel.send({ embed: embed });
        message.delete()
      }
    }
  }
});


client.login(require("./botconfig/config.json").token);

