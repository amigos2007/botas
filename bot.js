//Bu Altyapı yDarKDayS Tarafından Yapılmıştır
//Ve Altyapının değiştirilip izinsiz çalınması durumunda gerekli işlemler yapılacaktır
const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const Discord = require("discord.js")
const fetch = require('node-fetch');
const app = express();
const client = new Discord.Client();
const prefix = '.' //PREFİXİNİZİ GİRİNİZ.

client.on("ready", async () => {
  console.log("");
});

require("./util/eventLoader")(client);

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const De = Linkler.map(Revenge => Revenge.url)
De.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')

  if(Split[0] == '.ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`
   ▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬
    
   :x: Proje Sistemimizde Zaten Bulunuyor 
   
   ▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬
    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const success = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    ▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬ 
  
    :white_check_mark: Yazdığınız Proje Başarıyla Uptime Sistemimize Eklendi.
    
    ▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬
    `)
    .addField('```.linkler```','Komutunu Kullanarak Ekledigin Linkleri Görebilirsin!')//yDarKDayS
    .setTimestamp()
    message.channel.send(success)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const dijitaluptime = new Discord.MessageEmbed()
  .setColor('#FF0000')
  .setDescription(`
▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬

:x: Hey Uptime Edeceğim URL Girmelisin! 
  
.ekle (Glitch Show Linki)

▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬
  `)
  .setThumbnail(message.author.avatarURL)
  message.channel.send(dijitaluptime)
  })
  }

//Bu Altyapı yDarKDayS Tarafından Yapılmıştır
//Ve Altyapının değiştirilip izinsiz çalınması durumunda gerekli işlemler yapılacaktır



  if(Split[0] == '.say') {
  const say = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setThumbnail(message.author.avatarURL)
  .setDescription(`
▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬

☀️ ** Şuanda  \`${db.get(`Proje`) || 0}\` URL'yi 7/24 Aktif Tutuyor. **

☀️ **  Bu Linklerden Sadece \`${db.get(`Sahiplik_${message.author.id}`) || 0}\` Tane Senin URl'ni Uptime ediyor!**

▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬
`)
  message.channel.send(say)
  }

  if(Split[0] == '.yardım') {
  const pxd = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  
  .setDescription(`
▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬

.ekle ╺❯ Linkinizi Uptime Etmeye Yarar!

.say ╺❯ Eklediğiniz ve Botda ekli olan tüm linklerin sayısına bakarsınız!

.linklerim ╺❯ Eklediğiniz Linklerinize Bakarsınız!

▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬
`)
  message.channel.send(pxd)
  }

    if(Split[0] == '.linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`\<a:driphearts:906521077541371925> **Hiç link eklememişsin. Üzdün Beni Dostum Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`- **7/24 Aktfi Tuttuğum botlarınızın linklerini daha güvenli olduğunda DM üzerinden gönderdim ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.MessageEmbed().setColor('#F39de8').setDescription(`
▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬

 Uptime Ettigin Linklerin: \n\n\ `+Linkleri.join('\n')+`
 
▬▬▬▬▬▬▬▬ stx Uptime ▬▬▬▬▬▬▬▬▬
`).setThumbnail(message.author.avatarURL))
    }


   //yDarKDayS
})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["960433584693444608"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}

client.on('message', message => {
  const codemarefireklamliste = ['.glitch.me/','.glitch.me', 'repl.co', 'repl.co/']
  if(codemarefireklamliste.some(codemarefi => message.content.includes(codemarefi))){
    // Lin Atarsa Mesajı Silelim
    message.delete()

    // Uyaralım
    const keslan = new Discord.MessageEmbed()
    .setDescription(`- **Projeniz 3 dakika içinde eklenicektir :) ${message.author}**
Lütfen spam ATMAYINIZ`  )
    .setColor('#F32b39')
    message.channel.send(keslan) .then(msg => msg.delete({ timeout: 9000}));
  }
})

//tokenininizi giriniz.
client.login(process.env.token);
