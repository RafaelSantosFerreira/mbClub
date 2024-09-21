"use strict";

import { criarClienteObjeto } from "../classes/cliente.js";
import { buscaID } from "../server/buscaUmCorte.js";


// Capturando o formulário
const form = document.querySelector(".form");

// Adicionando um ouvinte de evento para a submissão do formulário
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Capturando o valor do input de ID do cartão
    const clienteId = document.querySelector("#id-cartao").value;

    // Chamando a função buscaID com o valor do input
    buscaID(clienteId).then((cliente) => {
        if (cliente) {
            // Transformar o cliente retornado em um objeto com getters
            const clienteObjeto = criarClienteObjeto(cliente);

            // Agora você pode usar os métodos getters
            document.querySelector(".customer-name").textContent = clienteObjeto.getName;
            document.querySelector(".customer-date").textContent = `Cliente desde: ${clienteObjeto.getClientSince}`;

            // Atualizando o cartão fidelidade com os ícones corretos
            const totalCortes = clienteObjeto.getTotalCuts;
            const cortesNecessarios = clienteObjeto.getLoyaltyCard.cutsNeeded;

            const stampsContainer = document.querySelector(".stamps");
            stampsContainer.innerHTML = ""; // Limpa o container antes de adicionar os novos ícones

            // Preenchendo os ícones com base no total de cortes
            for (let i = 1; i <= cortesNecessarios; i++) {
                const stampDiv = document.createElement("div");
                stampDiv.classList.add("stamp");

                const img = document.createElement("img");

                // Se o número de cortes executados for maior ou igual ao índice, usa o ícone verde, senão usa o ícone cinza
                if (i <= totalCortes) {
                    img.src = "./icons/Gift-SolidVerde.svg";
                } else {
                    img.src = "./icons/Gift-SolidCinza.svg";
                }

                stampDiv.appendChild(img);
                stampsContainer.appendChild(stampDiv);
            }

            // Atualizando a barra de progresso
            const progressoPercentual = (totalCortes / cortesNecessarios) * 100;
            const progressFill = document.querySelector(".progressFill");
            progressFill.style.width = `${progressoPercentual}%`;

            // Atualizando as informações de texto relacionadas à barra de progresso
            document.querySelector(".progressText strong").textContent = `${cortesNecessarios - totalCortes}`;
            document.querySelector(".progressText span").textContent = `${totalCortes} de ${cortesNecessarios}`;

            // Limpar o histórico atual e adicionar os novos agendamentos
            const historicoTabela = document.querySelector(".historico tbody");
            historicoTabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos agendamentos

            clienteObjeto.getAppointmentHistory.forEach((appointment) => {
                const row = document.createElement("tr");

                const dateCell = document.createElement("td");
                dateCell.innerHTML = `<h1>${appointment.date}</h1><span>${appointment.time}</span>`;
                row.appendChild(dateCell);

                const checkCell = document.createElement("td");
                checkCell.innerHTML = `<img src="./icons/SealCheckVerde.svg" alt="Ícone de corte">`;
                row.appendChild(checkCell);

                historicoTabela.appendChild(row);
            });
        } else {
            alert("Cliente não encontrado.");
        }
    });
});
