const { classificarAlerta, enviarNotificacao, processarAlerta } = require('../src/alertas');

describe('Testes Unitários: classificarAlerta', () => {
    // Cenário 1: Valores acima de 80
    test('Deve retornar "Crítico" para valores maiores que 80', () => {
        expect(classificarAlerta(81)).toBe("Crítico");
        expect(classificarAlerta(100)).toBe("Crítico");
    });

    // Cenário 2: Exatamente 80 (Fronteira - deve cair na regra do > 50)
    test('Deve retornar "Alto" para o valor limite exato de 80', () => {
        expect(classificarAlerta(80)).toBe("Alto");
    });

    // Cenário 3: Valores entre 51 e 79
    test('Deve retornar "Alto" para valores estritamente maiores que 50 e menores que 80', () => {
        expect(classificarAlerta(51)).toBe("Alto");
        expect(classificarAlerta(75)).toBe("Alto");
    });

    // Cenário 4: Exatamente 50 (Fronteira - deve cair na regra final)
    test('Deve retornar "Moderado" para o valor limite exato de 50', () => {
        expect(classificarAlerta(50)).toBe("Moderado");
    });

    // Cenário 5: Valores abaixo de 50 (incluindo zero e negativos)
    test('Deve retornar "Moderado" para valores menores que 50', () => {
        expect(classificarAlerta(49)).toBe("Moderado");
        expect(classificarAlerta(0)).toBe("Moderado");
        expect(classificarAlerta(-10)).toBe("Moderado");
    });
});

describe('Testes Unitários: enviarNotificacao', () => {
    // Cenário 6: Formatação correta da string
    test('Deve formatar corretamente a mensagem com o nível de alerta recebido', () => {
        expect(enviarNotificacao("Crítico")).toBe("Notificação enviada: Crítico");
        expect(enviarNotificacao("Alto")).toBe("Notificação enviada: Alto");
        expect(enviarNotificacao("Moderado")).toBe("Notificação enviada: Moderado");
    });
});

describe('Testes de Integração: processarAlerta', () => {
    // Cenário 7: Integração de ponta a ponta
    test('Deve classificar, processar e retornar a string correta para fluxo Crítico', () => {
        expect(processarAlerta(95)).toBe("Notificação enviada: Crítico");
    });

    test('Deve classificar, processar e retornar a string correta para fluxo Alto', () => {
        expect(processarAlerta(80)).toBe("Notificação enviada: Alto"); 
        expect(processarAlerta(60)).toBe("Notificação enviada: Alto");
    });

    test('Deve classificar, processar e retornar a string correta para fluxo Moderado', () => {
        expect(processarAlerta(50)).toBe("Notificação enviada: Moderado"); 
        expect(processarAlerta(20)).toBe("Notificação enviada: Moderado");
    });
});