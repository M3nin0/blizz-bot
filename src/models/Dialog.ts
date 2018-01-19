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
            Os comandos disponíveis são: \n\n\
            !search_profile JOGO NOME_DO_PERFIL ; REALM ; LOCALE \n\
            !search_achieve JOGO ID_DO_ACHIVEMENT ; LOCALE \n\
                    - Jogos disponíveis: wow \n\
            !examples \
        '
    }

    
    public static examples(): string {
        return ' \
            Vamos aos exemplos dos comandos \n \
            !search_profile wow blizz-bot; Azralon ; pt_BR \n \
            !search_achieve wow ; 2144 ; us \
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
        
        try {
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
        } catch {
            chat.reply('Nada foi encontrado :frowning:');
        }
    }

    public static async searchAchieve(chat: Message, archive_id: number, region: string): Promise<any> {
        
        let _infos_basic = [];
        let _depends = [];
        let _itens: string[] = [];
        
        try {
            await blizzard.wow.achievement({id: archive_id, origin: region})
            .then(response => {
                
                _infos_basic.push(response.data.title);
                _infos_basic.push(response.data.points);
                _infos_basic.push(response.data.description);
                _infos_basic.push(response.data.reward);

                for (let data of response.data.rewardItems) {
                    _itens.push('ID: ' + data.id + '\n' + 
                                'Nome: ' + data.name + '\n' + 
                                'Level do item: ' + data.itemLevel + '\n');
                }                
                
                for (let data of response.data.criteria) {
                    _depends.push(data);
                }
            });

            chat.reply('Informações sobre o archivement  - ' + _infos_basic[0] + '\n' + 
                       'Pontos recebidos: ' + _infos_basic[1] + '\n' +
                       'Descrição: ' + _infos_basic[2] + '\n' + 
                       'Recompensa: ' + _infos_basic[3].slice(8));
            
            chat.reply('Itens de recompensa\n');
            for (let item of _itens) {
                chat.reply(item);
            }

            if (_depends.length != 0) {
                chat.reply('Necessita também, das seguintes missões');
                for (let item of _depends) {
                    chat.reply('ID: ' + item.id + '\n' +
                               'Descrição: ' + item.description);
                }
            }
            
        } catch  {
            chat.reply('Nada foi encontrado :frowning:')
        }
    }
}

export { Dialog };