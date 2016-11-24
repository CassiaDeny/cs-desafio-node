# cs-desafio-node

## Running project

Você precisa instalar o Node.js e uma instância do MongoDB.

### Dependências 

Utilize o arquivo package.json para instalar todas as dependências.

### Configurações

Altere o arquivo db-config-sample.json para db-config.json e altere os dados de conexão do para o seu banco de dados.

### EndPoints disponíveis

#### Criar usuário 

Verbo HTTP: POST

Rota: /user

Descrição: Recebe via body um objeto json com os dados do usuário a ser criado conforme especificado no desafio.

Exemplo: {"nome": "nome", "email": "email", "senha": "1234", "telefones": [{"numero": "123456789", "ddd": "11"}]}

#### Buscar usuário

Verbo HTTP: GET

Rota: /user/:id 

Descrição: Recebe o id do usuário via querystring e token via header para validação de sessão, conforme especificado no desafio.

Exemplo header: "authentication": "Bearer {token}"

#### Login

Verbo HTTP: PATCH

Rota: /user

Descrição: Recebe via body objeto json com email e senha para a autenticação do login.

Exemplo: {"email": "email", "senha": "1234"}


