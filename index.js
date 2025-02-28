const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1345154794272063509/zHqyDnCLbp76h8lRkgb7W4va9VgDfJInioEEGitAcQkvfLVRqbQMxxMnd1Zld0Cj9MmD"; 

app.use(cors()); // Habilita CORS para todas as origens
app.use(bodyParser.json());

app.post("/monitoramento", async (req, res) => {
    try {
        const dados = req.body;

        if (!Array.isArray(dados) || dados.length === 0) {
            return res.status(400).json({ error: "Dados inválidos ou vazios." });
        }

        // Criar uma tabela formatada dentro do embed
        let embedDescription = "```Registro   | Endereço                         | Natureza                          | Data/Hora \n";
        embedDescription += "-----------|---------------------------------|--------------------------------|----------------\n";

        dados.forEach(d => {
            embedDescription += `${d.Registro.padEnd(10)} | ${d.Endereco.substring(0, 30).padEnd(30)} | ${d.Natureza.substring(0, 20).padEnd(20)} | ${d.DataHora}\n`;
        });

        embedDescription += "```"; // Fecha o bloco de código

        // Criar o embed único
        const embed = {
            title: "🚨 Relatório de Ocorrências 🚒",
            description: embedDescription,
            color: 16711680 // Vermelho
        };

        // Enviar a mensagem para o Discord
        await axios.post(DISCORD_WEBHOOK_URL, { username: "Monitoramento Bombeiros", embeds: [embed] });
        res.status(200).json({ message: "Dados enviados para o Discord com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar para o Discord:", error);
        res.status(500).json({ error: "Erro ao enviar os dados para o Discord." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
