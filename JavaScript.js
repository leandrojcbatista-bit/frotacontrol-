async function registrarSaida() {
    // Esta é a URL que você gerou no Google Apps Script
    const URL_GOOGLE = "https://script.google.com/macros/s/AKfycbyY503MIprU_1je6ZY6fdVBVFxwEki22jDsPhaCDsHTejHnCfXsg1CjgV6JotV3LFgx/exec";

    // Coleta os dados dos campos do formulário
    const dados = {
        data: document.getElementById('sData').value,
        hora: document.getElementById('sHora').value,
        veiculo: document.getElementById('sVeiculo').options[document.getElementById('sVeiculo').selectedIndex].text,
        motorista: document.getElementById('sMotorista').options[document.getElementById('sMotorista').selectedIndex].text,
        km_ini: document.getElementById('sKmIni').value,
        destino: document.getElementById('sDestino').value
    };

    // Formata os dados para o Google entender (URLSearchParams)
    const corpo = new URLSearchParams();
    for (const chave in dados) {
        corpo.append(chave, dados[chave]);
    }

    try {
        // Envia para o Google Sheets
        await fetch(URL_GOOGLE, {
            method: 'POST',
            mode: 'no-cors', // Necessário para evitar bloqueios de segurança
            body: corpo
        });

        alert("Viagem iniciada com sucesso!");
        nav('dashboard'); // Volta para a tela principal
        
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao salvar na planilha.");
    }
}
