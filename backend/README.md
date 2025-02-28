# 🚒 Monitoramento de Ocorrências - Discord Webhook

## 📌 Descrição

Este é um servidor **Node.js** desenvolvido para receber informações de ocorrências, formatá-las em uma tabela estruturada e enviá-las para um **webhook do Discord**. Ele garante que os dados sejam entregues corretamente e respeita as limitações do Discord, quebrando mensagens longas automaticamente.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Axios** (para enviar mensagens ao Discord)
- **Body-parser** (para processar JSON nas requisições)
- **CORS** (para permitir acessos externos)

## 📦 Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/monitoramento-discord.git
   ```

2. Entre na pasta do projeto:

   ```sh
   cd monitoramento-discord
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

## ⚙️ Configuração

1. **Edite o arquivo `index.js`** e substitua `SEU-TOKEN` pela URL do seu webhook do Discord:

   ```javascript
   const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/SEU-TOKEN";
   ```

2. **Inicie o servidor**:
   ```sh
   node index.js
   ```
   O servidor estará rodando na porta **3000** por padrão.

## 📤 Como Usar

Este servidor recebe requisições `POST` no endpoint `/monitoramento` com um JSON contendo as ocorrências. Exemplo de requisição:

```json
[
  {
    "Registro": "20254BBM01777",
    "Endereco": "Rua Presidente Juscelino Kubitschek",
    "Natureza": "Acidente de Trânsito",
    "DataHora": "28/02/2025 18:14"
  },
  {
    "Registro": "20254BBM01775",
    "Endereco": "Rua Rio Pajeú, nº 244",
    "Natureza": "Queda de Veículo",
    "DataHora": "28/02/2025 17:55"
  }
]
```

### 🖥 Exemplo de Requisição com **cURL**

```sh
curl -X POST "http://localhost:3000/monitoramento" \
     -H "Content-Type: application/json" \
     -d '[{"Registro": "20254BBM01777", "Endereco": "Rua Presidente Juscelino Kubitschek", "Natureza": "Acidente de Trânsito", "DataHora": "28/02/2025 18:14"}]'
```

## 📝 Regras de Envio

✅ **Tudo em um único embed**: As ocorrências são formatadas em uma tabela.
✅ **Quebra de mensagens automática**: Se ultrapassar 2000 caracteres, será dividido em vários embeds.
✅ **Formato legível**: Utiliza blocos de código para organizar os dados.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para modificar e utilizar como desejar! 🚀
