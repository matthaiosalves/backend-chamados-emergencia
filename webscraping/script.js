// ==UserScript==
// @name         Monitoramento Bombeiros Cascavel + Webhook
// @namespace    http://tampermonkey.net/
// @version      2025-02-28
// @description  Monitora a tabela de ocorrências dos Bombeiros de Cascavel e envia atualizações para um webhook.
// @author       Você
// @match        http://www.bombeiroscascavel.com.br/sysbmnew/grid_imprensa/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const WEBHOOK_URL = "http://localhost:3000/monitoramento"; // URL do seu backend para processar os dados e enviar ao Discord
    let ultimoDados = null; // Armazena os últimos dados coletados

    console.log("🔍 Iniciando monitoramento contínuo...");

    async function clicarBotao() {
        let botao;

        for (let i = 0; i < 5; i++) {
            botao = document.querySelector("#sc_b_pesq_bot");
            if (botao) break;
            console.log(`🔄 Tentando encontrar o botão... (${i + 1}/5)`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1s
        }

        if (botao) {
            console.log("✅ Botão encontrado! Clicando...");
            botao.click();
            botao.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            await new Promise(resolve => setTimeout(resolve, 5000)); // Aguarda carregamento da tabela
            coletarDadosTabela();
        } else {
            console.log("❌ Botão não encontrado. Tentando novamente em 2 segundos...");
            setTimeout(clicarBotao, 2000);
        }
    }

    async function coletarDadosTabela() {
        console.log("📋 Buscando a tabela...");

        let tabela = document.querySelector("#sc_grid_body table tbody");
        if (!tabela) {
            console.log("⚠️ Tabela não encontrada! Verificando dentro de iframes...");
            let iframes = document.querySelectorAll("iframe");

            for (let iframe of iframes) {
                try {
                    let doc = iframe.contentDocument || iframe.contentWindow.document;
                    tabela = doc.querySelector("#sc_grid_body table tbody");
                    if (tabela) {
                        console.log("✅ Tabela encontrada dentro de um iframe!");
                        break;
                    }
                } catch (error) {
                    console.log("⚠️ Não foi possível acessar o iframe:", error);
                }
            }
        }

        if (!tabela) {
            console.log("❌ A tabela ainda não carregou.");
            return;
        }

        console.log("📌 Coletando dados da tabela...");
        let linhas = tabela.querySelectorAll("tr");
        let dados = [];

        linhas.forEach(linha => {
            let registro = linha.querySelector('[id^="id_sc_field_rgo_nr_rgo_"]')?.innerText.trim() || "N/A";
            let obm = linha.querySelector('[id^="id_sc_field_sigmavi_obm_obm_"]')?.innerText.trim() || "N/A";
            let dataHora = linha.querySelector('[id^="id_sc_field_rgo_datahora_recebimento_"]')?.innerText.trim().replace("\n", " ") || "N/A";
            let municipio = linha.querySelector('[id^="id_sc_field_rgo_municipio_"]')?.innerText.trim() || "N/A";
            let endereco = linha.querySelector('[id^="id_sc_field_endereco_"]')?.innerText.trim() || "N/A";
            let natureza = linha.querySelector('[id^="id_sc_field_evento_"]')?.innerText.trim() || "N/A";
            let vitimas = linha.querySelector('[id^="id_sc_field_vitimas_"]')?.innerText.trim().replace(/\n/g, ", ") || "N/A";
            let veiculos = linha.querySelector('[id^="id_sc_field_veiculos_"]')?.innerText.trim().replace(/\n/g, ", ") || "N/A";

            if (registro !== "N/A") {
                dados.push({ Registro: registro, OBM: obm, DataHora: dataHora, Municipio: municipio, Endereco: endereco, Natureza: natureza, Vitimas: vitimas, Veiculos: veiculos });
            }
        });

        console.log("📌 Dados coletados:", dados);

        if (JSON.stringify(dados) !== JSON.stringify(ultimoDados)) {
            console.log("🔄 Atualização detectada! Enviando para o backend...");
            enviarParaBackend(dados);
            ultimoDados = dados;
        } else {
            console.log("✅ Nenhuma atualização encontrada.");
        }
    }

    async function enviarParaBackend(dados) {
        fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (response.ok) {
                console.log("✅ Dados enviados com sucesso para o backend!");
            } else {
                console.error("❌ Falha ao enviar os dados:", response.statusText);
            }
        })
        .catch(error => console.error("❌ Erro ao enviar para o backend:", error));
    }

    setInterval(() => {
        clicarBotao();
        coletarDadosTabela();
    }, 90000); // Repetir a cada 90 segundos

})();
