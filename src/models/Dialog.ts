import * as blizz from 'blizzard.js';
import { Message } from 'discord.js';
 
const blizzard = blizz.initialize({
    apikey: "TOKEN_BATTLE_NET" 
});

class Dialog {
    
    public static start(): string {
        return ' \
            Olá, eu sou o blizz-bot, e estou aqui para te ajudar a obte ' +
            'informações sobre as franquias e usuários da Blizzard.\n' +  
            'Para ver os comandos que você pode utilizar, digite !commands'
    }
    

    public static commands(): string {
        return ' \
            Os comandos disponíveis são: \n\n \
            !search_profile JOGO NOME_DO_PERFIL ; REALM ; LOCALE \n\
                - Jogos disponíveis: sc2 - wow - d3\
            !examples \
        '
    }

    
    public static examples(): string {
        return ' \
            Vamos aos exemplos dos comandos \n \
            !search_profile wow blizz-bot; Azralon ; pt_BR \
        '
    }

    public static async searchProfile(chat: Message, nameProfile: string, realm: string, locale: string ): Promise<any> {
    
        let _infos  = {data : {
            name: [], 
            battlegroup: [], 
            level: [], 
            achievementPoints: [],
            totalHonorableKills: []
        }};
    
        await blizzard.wow.character(['profile'], { origin: locale, realm: realm, name: nameProfile })
        .then(response => {
            _infos = response;
        });
    
        chat.reply(
                        'Nome: ' + _infos.data.name.toString() + '\n' + 
                        'Battlegroup: ' + _infos.data.battlegroup.toString() + '\n' + 
                        'Level: ' + _infos.data.level.toString() + '\n' + 
                        'Pontos de conquista: ' + _infos.data.achievementPoints.toString() + '\n' +
                        'Honarables Kills: ' + _infos.data.totalHonorableKills.toString()) + '\n';
    }
}

export { Dialog };