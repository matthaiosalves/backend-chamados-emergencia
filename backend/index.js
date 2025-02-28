const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = "WEBHOOK_URL"; 

app.use(cors());
app.use(bodyParser.json());

app.post("/monitoramento", async (req, res) => {
    try {
        const dados = req.body;

        if (!Array.isArray(dados) || dados.length === 0) {
            return res.status(400).json({ error: "Dados inválidos ou vazios." });
        }

        // Cabeçalho da tabela
        const header = "```Registro   | Endereço                         | Natureza                          | Data/Hora \n" +
                       "-----------|---------------------------------|--------------------------------|----------------\n";
        let messages = [];
        let currentMessage = header;

        dados.forEach(d => {
            let row = `${d.Registro.padEnd(10)} | ${d.Endereco.substring(0, 30).padEnd(30)} | ${d.Natureza.substring(0, 20).padEnd(20)} | ${d.DataHora}\n`;

            // Verifica se a próxima linha ultrapassaria o limite do Discord (2000 caracteres)
            if ((currentMessage.length + row.length + 3) > 2000) {
                currentMessage += "```"; // Fecha o bloco de código
                messages.push(currentMessage);
                currentMessage = header + row; // Começa um novo bloco de código
            } else {
                currentMessage += row;
            }
        });

        // Adiciona a última mensagem se ainda não foi enviada
        if (currentMessage.length > header.length) {
            currentMessage += "```";
            messages.push(currentMessage);
        }

        // Enviar mensagens separadas
        for (const msg of messages) {
            await axios.post(DISCORD_WEBHOOK_URL, { username: "Monitoramento Bombeiros", embeds: [{ title: "🚨 Relatório de Ocorrências 🚒", description: msg, color: 16711680 }] });
        }

        res.status(200).json({ message: "Dados enviados para o Discord com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar para o Discord:", error);
        res.status(500).json({ error: "Erro ao enviar os dados para o Discord." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
