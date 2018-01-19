import { Client } from 'discord.js';
import { Dialog } from './models/Dialog';

const bot = new Client();

bot.on('ready', () => {
    console.log('Caramba! Já tava na hora!');
});

bot.on('message', message => {
    
    if (message.content == '!start') {
        message.reply(Dialog.start());
        message.reply(Dialog.commands());
    }    
    
    if (message.content == '!commands') {
        message.reply(Dialog.commands());
    }

    if (message.content.slice(0, 1) == '!') {

        if (message.content.slice(1, 15) == 'search_profile') {
            if (message.content.slice(15, 20).trim() == 'wow') {                
                let args: string[] = message.content
                                            .slice(20)
                                            .split(';');

                
                Dialog.searchProfile(message,
                                     args[0].trim(),
                                     args[1].trim(),
                                     args[2].trim())
                
            }
        }
        else if (message.content.slice(1, 16).trim() == 'search_achieve') {
            if (message.content.slice(15, 20).trim() == 'wow') {
                let args: string[] = message.content
                                            .slice(20)
                                            .split(';');

                // args[0] == achive_id
                // args[1] == origin

                Dialog.searchAchieve(message, parseInt(args[1].trim()), args[2].trim());
                
            } else {
                message.reply('Archivements disponíveis apenas para o World of Warcraft');
            }
        } 
    } 

    if (message.content == '!examples') {
        message.reply(Dialog.examples());
    }

});

bot.login('TOKEN_DISCORD');