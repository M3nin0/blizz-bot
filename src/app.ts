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

                Dialog.searchProfile(args[0].trim(),
                                     args[1].trim(),
                                     args[2].trim());
            }
        }
    }

    if (message.content == '!examples') {
        message.reply(Dialog.examples());
    }

});

bot.login('NDAxNTY0MTA5NTkxNjc0ODkw.DTzBhA.p2L9k2G4Nw0Yk6apdyEpLvm_Ie4');