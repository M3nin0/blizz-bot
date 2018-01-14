# Blizz-Bot
[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

Bot para facilitar a busca por informações de personagens, jogos e perfis da Battle.net.

## Conversação

A conversação tenta ser a mais simples possível, permitindo que o bot seja utilizado sem grandes configurações.

## Comandos

Os comandos disponíveis para serem utilizados no bot são:

- !start
    - Ininicialização do bot, com as informações de uso.
- !commands
    - Descreve todos os comandos disponíveis.
- !examples
    - Mostra exemplos de como usar os comandos disponíveis.
- !search_profile
    - Exemplo de utilização: !search_profile wow charni ; amanthul; us
        - A sintaxe é bastante simples, segue o padrão: <code> !search_profile JOGO NOME_PROFILE ; REALM;  </code>
    - Este comando retorna informações do perfil selecionado

## Compilação

```shell
tsc app.ts --lib ES2015
```