const { processarAlerta } = require('../src/alertas');
const { expect,test } = require('@jest/globals');


test('processamento completo de alerta crítico', () => {
  const resultado = processarAlerta(90);
  expect(resultado).toBe('Notificação enviada: Crítico');
});
