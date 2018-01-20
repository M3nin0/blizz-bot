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
            !search_boss wow ; ID_DO_BOSS ; LOCALE \n\
            !examples \
        '
    }

    
    public static examples(): string {
        return ' \
            Vamos aos exemplos dos comandos \n \
            !search_profile wow blizz-bot; Azralon ; pt_BR \n \
            !search_achieve wow ; 2144 ; us \n \
            !search_boss wow ; 24664 ; us \
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
                            'Honarable Kills: ' + _infos.data.totalHonorableKills.toString()) + '\n';
        } catch {
            chat.reply('Nada foi encontrado :frowning:');
        }
    }

    public static async searchAchieve(chat: Message, archiveID: number, region: string): Promise<any> {
        
        let _infos_basic = [];
        let _depends = [];
        let _itens: string[] = [];
        
        try {
            await blizzard.wow.achievement({id: archiveID, origin: region})
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

    public static async searchBoss(chat: Message, bossID: number, region: string): Promise<any> {
        
        let _infos = []
        
        try {
            await blizzard.wow.boss({id: bossID, origin: region})
            .then(response => {
                console.log(response.data);
                _infos.push(response.data);
            });
    
            chat.reply('Informações sobre o boss\n' + 
                     'Nome: ' + _infos[0].name + '\n' + 
                     'Level: ' + _infos[0].level + '\n' +
                     'Level heroico: ' + _infos[0].heroicLevel + '\n' +
                     'Descrição: ' + _infos[0].description);
        } catch {
            chat.reply('Nada foi encontrado: :frowning:')
        }
    }

    public static async searchItem(chat: Message, itemID: number, region: string): Promise<any> {
        
        let _infos = [];

        try {
            await blizzard.wow.item({id: itemID, origin: region})
            .then(response => {
                _infos.push(response.data);
            });

            chat.reply('Informações sobre o item' + '\n' + 
                      'Nome: ' + _infos[0].name + '\n' +
                      'Descrição: ' + _infos[0].description + '\n' +
                      'Equipável: ' + _infos[0].equippable + '\n' + 
                      'Qualidade: ' + _infos[0].quality + '\n' + 
                      'Level do item: ' + _infos[0].itemLevel + '\n' +
                      'Level necessário para utilizar: ' + _infos[0].requiredLevel);
        
            if (_infos[0].hasOwnProperty('weaponInfo')) {
                chat.reply('Informações de dano' + '\n' +
                           'Dano máximo: ' + _infos[0].weaponInfo.damage.exactMax + '\n' +
                           'Dano mínimo: ' + _infos[0].weaponInfo.damage.exactMin + '\n' + 
                           'DPS: ' + _infos[0].weaponInfo.dps);
            }

            if (_infos[0].hasOwnProperty('armor')) {
                chat.reply('Informações de armadura' + '\n' + 
                          'Armadura: ' + _infos[0].armor);
            }
        } catch {
            chat.reply('Nada foi encontrado :broken_heart:');
        }
    }
}

export { Dialog };