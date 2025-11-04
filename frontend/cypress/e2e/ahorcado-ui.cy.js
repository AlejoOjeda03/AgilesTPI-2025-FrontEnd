/* global cy */


describe("Juego del Ahorcado - ATDD", () => {
  beforeEach(() => {
    // Aseguramos que el frontend esté levantado
    cy.visit("http://localhost:3000");
  });

  it("1️⃣ El juego perfecto (gana sin errores)", () => {
    const letras = ["p", "e", "r", "o"];

    letras.forEach((l) => {
      cy.get("button").contains(new RegExp(`^${l}$`, "i")).click();
    });

    cy.contains(/ganaste/i, { timeout: 5000 }).should("be.visible");
  });

  it("2️⃣ El peor juego (pierde sin aciertos)", () => {
    const letras = ["a", "b", "c", "d", "f", "g"];

    letras.forEach((l) => {
      cy.get("button").contains(new RegExp(`^${l}$`, "i")).click();
    });

    cy.contains(/perdiste/i, { timeout: 5000 }).should("be.visible");
  });

  it("3️⃣ Gana con algunos errores", () => {
    const letras = ["a", "p", "e", "r", "o"];

    letras.forEach((l) => {
      cy.get("button").contains(new RegExp(`^${l}$`, "i")).click();
    });

    cy.contains(/ganaste/i, { timeout: 5000 }).should("be.visible");
  });

  it("4️⃣ Pierde con algunos errores", () => {
    const letras = ["a", "p", "b", "e", "x", "z", "r", "f","y"];

    letras.forEach((l) => {
      cy.get("button").contains(new RegExp(`^${l}$`, "i")).click();
    });

    cy.contains(/perdiste/i, { timeout: 5000 }).should("be.visible");
  });
});
