const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = client => {
 setInterval(function() {
}, 8000);
  var msgArray = [
".yardım",
"DM Üzerinden Kullanın!",
 ];

 setInterval(() => {
  var rastgeleOyun = Math.floor(Math.random() * msgArray.length);
  client.user.setActivity(`${msgArray[rastgeleOyun]}`)
}, 5000);
    console.log(`Versty Uptime Aktif.`);
}
