import { apiConfig } from "./api-config.js";

export async function buscaID(ID) {
    try {
        console.log(`Fazendo requisição para: ${apiConfig.baseURL}/clients`);

        // Fazendo a requisição para obter todos os clientes
        const response = await fetch(`${apiConfig.baseURL}/clients`);

        // Verifica se a resposta é válida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte a resposta para JSON (que será um array de clientes)
        const data = await response.json();

        // Exibe o retorno da API no console para debug
        console.log("Resposta da API:", data);

        // Busca o cliente diretamente no array 'data'
        const clienteEncontrado = data.find(cliente => cliente.id === ID);

        if (clienteEncontrado) {
            console.log("Cliente encontrado:", clienteEncontrado);
            return clienteEncontrado;
        } else {
            alert("Cliente não encontrado");
            return null;
        }

    } catch (error) {
        console.error("Erro ao buscar cliente:", error.message);
        alert("Erro ao buscar cliente");
    }
}
