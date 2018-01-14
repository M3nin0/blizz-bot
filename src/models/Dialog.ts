import * as blizzard  from 'blizzard.js';

class Dialog {
    
    public static start(): string {
        return ' \
            Olá, eu sou o bliz-bot, e estou aqui para te ajudar a obte ' +
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

    
    public static searchProfile(nameProfile: string, realm: string, origin: string ): string {
        return ''
    }

}

export { Dialog };