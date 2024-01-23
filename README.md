
# [FoodExplorer-api](https://github.com/Daniel-Rosa1/foodExplorer-api) 


O [FoodExplorer-api](https://github.com/Daniel-Rosa1/foodExplorer-api) é uma api rest desenvolvida com java script, consome dados de seu próprio banco de dados e se  comunicar com uma aplicação [FoodExplorer](https://github.com/Daniel-Rosa1/foodExplorer-front-end)  desenvolvida com react.

🚧 FoodExplorer-api is under development 🚧
## Aprendizados

Ao decorrer do desenvolvimento da api do food Explorer tive a oportunidade de criar e desenvolver conhecimento sobre:
-  request e response usando o express;
-  como criar banco de dados e manipular-lo com SQL usando sqllite, sqlite3;
-  knex para fazer as query SQL e criação migrations; 
-  multer para fazer uploade de imagens;
-  bcryptjs para fazer a criptografia de dados do usuário; 
-  utilização de JWT e cookies usado em todas as requisições para validação e autorização de usuário com cookie-parser, cors e dotenv;
-  criação e utilização de variáveis de ambiente com dotenv;
-  mudança na visão sobre como desenvolver usando inversão de dependências, repeitando conceito de imutabilidade e separação de responsabilidades, usando o melhor dos paradigmas POO e funcional. 


## Funcionalidades

- Consumidores: criar cadastro; acessar a aplicação; visualizar pratos; filtrar pratos por nome e ingredientes e acessar pratos com informações detalhadas (novas funcionalidades em breve).
- Administrador: cria, edita e exclui pratos, além de realizar as mesmas ações que o consumidor (novas funcionalidades em breve).


## Rodando localmente

- para ver o projeto completo, rode também o projeto [foodExplorer-front-end](https://github.com/Daniel-Rosa1/foodExplorer-front-end) 

Clone o repositório

```bash
 https://github.com/Daniel-Rosa1/foodExplorer-front-end
```

Entre no diretório do projeto

```bash
  cd foodExplorer-api
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env:

`AUTH_SECRET`  é usado para determinar o secret do jwt e caso não seja informado sera usado um valor "default"

`PORT` usado para informar a porta que o servidor ficara ouvindo, caso não seja adicionado sera usado a porta 3333
## Stack utilizada

**Back-end:** Node, Express, express-async-errors, SQL, sqlite, sqlite3,  knex, multer, bcryptjs, cookie-parser, cors, dotenv, jsonwebtoken, pm2.

