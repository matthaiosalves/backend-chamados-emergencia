# 🚒 Monitoramento de Ocorrências - Discord Webhook

## 📌 Descrição

Este projeto realiza o **monitoramento de ocorrências** e as envia para um **webhook do Discord**. Ele consiste em duas partes principais:

1. **Backend (Node.js + Express)**: Recebe os dados e os formata corretamente antes de enviá-los ao Discord.
2. **Web Scraping (JavaScript + Tampermonkey)**: Captura dados diretamente do site e os envia para o backend.

## 🚀 Tecnologias Utilizadas

- **Node.js** (Backend)
- **Express.js** (Servidor API)
- **Axios** (Requisições HTTP)
- **Body-parser** (Processamento de JSON)
- **CORS** (Permissão de acessos externos)
- **Tampermonkey** (Extensão para rodar scripts no navegador)
- **JavaScript** (Web Scraping)

## 📂 Estrutura do Projeto

```
monitoramento-discord/
├── backend/       # Servidor Node.js
│   ├── index.js   # Arquivo principal do backend
│   ├── package.json  # Dependências
│   ├── ...
├── webscraping/   # Scripts de captura de dados
│   ├── script.js  # Script para extrair dados do site
│   ├── README.md  # Instruções do scraper
```

## 📦 Instalação do Backend

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/monitoramento-discord.git
   ```

2. Entre na pasta do backend:

   ```sh
   cd monitoramento-discord/backend
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

4. Configure o webhook do Discord no arquivo `index.js`:

   ```javascript
   const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/SEU-TOKEN";
   ```

5. Inicie o servidor:
   ```sh
   node index.js
   ```
   O servidor estará rodando na porta **3000** por padrão.

## 🔍 Configuração do Web Scraping

Para capturar os dados do site, utilizamos um script JavaScript que roda no navegador via **Tampermonkey**.

### 📥 Instalação do Tampermonkey

1. Instale a extensão **Tampermonkey** no seu navegador:

   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2. Adicione um novo script e copie o conteúdo de `webscraping/script.js`.

3. Salve e ative o script.

### 📌 Como Funciona o Script

- O script **captura** as ocorrências do site de monitoramento.
- Os dados são **enviados automaticamente** para o backend via **fetch API**.
- Os eventos aparecem no Discord após o backend processá-los.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para modificar e utilizar como desejar! 🚀
