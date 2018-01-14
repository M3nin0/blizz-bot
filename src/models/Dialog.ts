import * as blizz from 'blizzard.js';

const blizzard = blizz.initialize({
    apikey: "TOKEN_BLIZZARD" 
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

    
    public static searchProfile(nameProfile: string, realm: string, locale: string ): any {
        blizzard.wow.character(['profile'], 
        { 
            origin: locale, 
            realm: realm, 
            name: nameProfile 
        }).then(response => {
                console.log(response.data);
        })
    }
}

export { Dialog };