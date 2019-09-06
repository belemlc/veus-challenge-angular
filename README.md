# Veus Shopping

Aplicação SPA básica usando Angular 8

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

Luiz Carlos Belem `<belemlc@gmail.com>`
<small>(21) 97300-8600</small>


## Development server

Executar o comando `docker-compose up -d --build` ou `ng server` para rodar o servidor de desenvolvimento. Navegue em `http://localhost:4200/`.

A aplicação irá fazer `auto login`  com usuário previamente criado, irá pegar o token gerado pela API e armazena-lo usando localStorage, por ser uma aplicação para fins demonstrativo do uso da API, acabei fazendo dessa forma para não perder muito tempo, da mesma forma que acabei também deixando em um único componente ganhar mais tempo.

Caso use `docker` para levantar a aplicação, pode ir acompanhado o progresso pelo log usando o comando `docker logs veus_web -f`.