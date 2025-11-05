describe("Juego del Ahorcado - ATDD", () => {
  const BACKEND = "http://127.0.0.1:8000";
  const FRONT = "http://localhost:3000";
  const ALFABETO = "abcdefghijklmnopqrstuvwxyz".split("");

  beforeEach(() => {
    cy.visit(FRONT);

    cy.get("[data-cy=key-a]", { timeout: 5000 }).should("be.visible");

    cy.request("GET", `${BACKEND}/api/debug-palabra`)
      .its("body.palabra")
      .then((pal) => {
        expect(pal, "debug palabra devuelta").to.be.a("string").and.not.be.empty;
        cy.wrap(pal).as("palabra");
      });
  });

  it("El juego perfecto (gana sin errores)", function () {
    cy.get("@palabra").then((palabraActual) => {
      const letras = [...new Set(palabraActual.split(""))];
      letras.forEach((l) => {
        cy.get(`[data-cy=key-${l.toLowerCase()}]`).click();
      });
      cy.contains(/ganaste/i, { timeout: 5000 }).should("be.visible");
    });
  });

  it("El peor juego (pierde sin aciertos)", function () {
    cy.get("@palabra").then((palabraActual) => {
      const pool = ALFABETO.filter((c) => !palabraActual.includes(c));
      const letras = pool.slice(0, 6); 
      letras.forEach((l) => {
        cy.get(`[data-cy=key-${l}]`).click();
      });
      cy.contains(/perdiste/i, { timeout: 5000 }).should("be.visible");
    });
  });

  it("Gana con algunos errores", function () {
    cy.get("@palabra").then((palabraActual) => {
      const incorrectas = ALFABETO.filter((c) => !palabraActual.includes(c)).slice(0, 2);
      
      const correctas = [...new Set(palabraActual.split(""))];
      
      const letras = [...incorrectas, ...correctas]; 
      
      letras.forEach((l) => {
        cy.get(`[data-cy=key-${l.toLowerCase()}]`).click();
      });
      cy.contains(/ganaste/i, { timeout: 5000 }).should("be.visible");
    });
  });

  it("Pierde con algunos aciertos", function () { 
    cy.get("@palabra").then((palabraActual) => {
      const correctas = [...new Set(palabraActual.split(""))].slice(0, 1);
      
      const incorrectas = ALFABETO.filter((c) => !palabraActual.includes(c)).slice(0, 6);

      const letras = [...correctas, ...incorrectas]; 
      
      letras.forEach((l) => {
        cy.get(`[data-cy=key-${l.toLowerCase()}]`).click();
      });
      cy.contains(/perdiste/i, { timeout: 5000 }).should("be.visible");
    });
  });
});