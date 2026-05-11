const { expect, test } = require('@jest/globals');
const { classificarAlerta } = require('../src/alertas');

test("alerta alto", () => {
    expect(classificarAlerta(70)).toBe("Alto");
});