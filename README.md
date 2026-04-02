# bolao

Projeto de plataforma online para o "bolão da copa".

## Ideia

Este projeto foi criado com o intuito de aprendizado de desenvolvimento e de novas tecnologias.

Além disso, o foco era facilitar e melhorar a forma como era feito os bolões no meu grupo de amigos e familiares, sem precisar fazer as apostas no papel ou em planilhas no Excel e com visualização em tempo real.


## O Projeto

### Tela inicial

![image-1](./docs/image-1.png)

### Tela Cadastro e Login

![image-4](./docs/image-2.png)

![image-5](./docs/image-3.png)

### Tela de loading

![image-6](./docs/image-4.png)

### Tela de campeonatos

![image-7](./docs/image-7.png)

### Tela de aposta

![image-8](./docs/image-6.png)

### Tela de dashboard do campeonato

![image-9](./docs/image-7.png)

### Tela de jogos do campeonato

![image-10](./docs/image-8.png)

### Tela de apostas para um jogo

![image-11](./docs/image-9.png)

### Tela de apostas de um usuário

![image-13](./docs/image-10.png)

### Tela de configurações

![image-14](./docs/image-11.png)

### Tela de administrador

![image-15](./docs/image-12.png)

![image-16](./docs/image-13.png)

![image-17](./docs/image-14.png)

## Pré-requisitos

Instalar os componentes:

- `Node 24.14.x` ~ Front-End;
- `PHP 8.5` ~ Back-End;
    - `Composer 2.9.5` ~ PHP Dependency Manager;
- `MariaDB 11.4.10` ~ Database;
    - Ou no `Docker Desktop 4.67` ~ Container platform;

### Instalar dependências

Instale as dependências da `api`, do `app` e do `banco` com o comando:

```bash
npm run install-all
```

Se for utilizar o docker, rode o comando:

```bash
npm run install-mariadb
```

### Configurações necessárias

#### Database

Conecte no banco utilizando as credenciais abaixo e crie o banco `bolao`:
- Username: `root`;
- Password: `123456`;

Crie e configure o arquivo `knexfile.js` baseado no arquivo `knexfile.sample.js`.

Crie toda a estrutura do banco rodando o comando:

```bash
npm run knex migrate:latest
```

Se quiser, rode o comando abaixo para preencher o banco com alguns dados padrões:

```bash
npm run knex seed:run
```

#### API

Pode ser necessário configurar o php para acessar o banco mariadb/mysql, para isso:
- Copie o arquivo o `php.ini-development` e cole como `php.ini`.
- Abra o arquivo e ajuste as seguintes informações:
    - Remova o símbolo `;` da linha `;extension_dir = "ext"`.
    - Remova o símbolo `;` da linha `;extension=pdo_mysql`.

Crie e configure o arquivo `.env` baseado no arquivo `.env.development`.

### Executar

Para executar tudo será necessário rodar os comandos abaixo em terminais diferentes e deixá-los abertos executando.

Iniciar API:

```bash
npm run server
```

Iniciar APP:

```bash
npm run start
```

Se estiver utilizando o banco no docker:

```bash
npm run mariadb
```

## Deploy

### Configurações necessárias

#### API

Crie e configure o arquivo `.env.production` baseado no arquivo `.env.development`.

#### APP

Crie e configure o arquivo `.env.production` baseado no arquivo `.env.development`.

### Front & Back-End

Para gerar o diretório `deploy` com tudo que é necessário para o ambiente produtivo:

```bash
npm run deploy
```

### Database

Para somente gerar os SQLs para executar no banco de dados:
1. Crie um schema "vazio" ou utilize um em que as migrations não tenham sido executadas nele ainda.
2. Modifique, no arquivo `knexfile.js`, o parâmetro `onlyLogQuery` para `true`.
3. Rode o comando de migration: `npm run knex migrate:latest`.
