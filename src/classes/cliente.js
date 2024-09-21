// Classe Cliente com getters
export class Cliente {
    constructor(id, name, clientSince, appointmentHistory, loyaltyCard) {
        this.id = id;
        this.name = name;
        this.clientSince = clientSince;
        this.appointmentHistory = appointmentHistory;
        this.loyaltyCard = loyaltyCard;
    }

    // Getter para o nome do cliente
    get getName() {
        return this.name;
    }

    // Getter para a data de início do cliente
    get getClientSince() {
        return this.clientSince;
    }

    // Getter para o histórico de agendamentos
    get getAppointmentHistory() {
        return this.appointmentHistory;
    }

    // Getter para o cartão de fidelidade
    get getLoyaltyCard() {
        return this.loyaltyCard;
    }

    // Método para retornar o número total de cortes
    get getTotalCuts() {
        return this.loyaltyCard.totalCuts;
    }

    // Método para retornar quantos cortes faltam para completar o cartão
    get getCutsRemaining() {
        return this.loyaltyCard.cutsRemaining;
    }

    // Método para retornar o número total de agendamentos
    getTotalAppointments() {
        return this.appointmentHistory.length;
    }

    // Método para retornar a data e a hora de um agendamento específico
    getAppointmentDetails(appointmentNumber) {
        if (appointmentNumber > 0 && appointmentNumber <= this.appointmentHistory.length) {
            const appointment = this.appointmentHistory[appointmentNumber - 1];
            return `Data: ${appointment.date}, Hora: ${appointment.time}`;
        } else {
            return `Agendamento número ${appointmentNumber} não encontrado.`;
        }
    }
}

// Função que transforma o retorno em um objeto com métodos getters
export function criarClienteObjeto(clienteData) {
    return new Cliente(
        clienteData.id,
        clienteData.name,
        clienteData.clientSince,
        clienteData.appointmentHistory,
        clienteData.loyaltyCard
    );
}
