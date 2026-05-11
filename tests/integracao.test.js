const { expect, test } = require('@jest/globals');
const { classificarAlerta, enviarNotificacao } = require('../src/alertas');

test('classificação + notificação', () => {
  const alerta = classificarAlerta(90);
  const resultado = enviarNotificacao(alerta);
  expect(resultado).toBe('Notificação enviada: Crítico');
});
