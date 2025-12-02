describe("Juego del Ahorcado - ATDD", () => {
  const BACKEND = "https://ahorcado-agiles-u1qj.onrender.com";
  const FRONT = "https://agiles-tpi-2025-front-end.vercel.app";
  const ALFABETO = "abcdefghijklmnopqrstuvwxyz".split("");


  function clickLetra(l) {
    cy.get(`[data-cy=key-${l.toLowerCase()}]`, { timeout: 3000 })
      .should("exist")
      .and("be.visible")
      .click()
      .then(($btn) => {
        cy.wrap($btn).should(($b) => {
          if (Cypress.$($b).is(":visible")) {
            expect($b).to.be.disabled;
          }
        });
      });
  }

  beforeEach(() => {
    cy.intercept("POST", `${BACKEND}/nueva_partida*`).as("nuevaPartida");

    cy.visit(FRONT);


    cy.wait("@nuevaPartida");
    cy.wait(500); 

    cy.get("[data-cy=key-a]", { timeout: 5000 }).should("be.visible");

    cy.request("GET", `${BACKEND}/api/debug-palabra`)
      .its("body.palabra")
      .then((pal) => {
        expect(pal, "debug palabra devuelta").to.be.a("string").and.not.be.empty;
        cy.wrap(pal).as("palabra");
        cy.log(`Palabra actual del backend: ${pal}`);
      });
  });

  it("El juego perfecto (gana sin errores)", function () {
    cy.get("@palabra").then((palabraActual) => {
      const letras = [...new Set(palabraActual.toLowerCase().split(""))];

      cy.log(`Jugando palabra: ${palabraActual}`);
      cy.wrap(letras).each((l) => clickLetra(l));

      cy.contains(/ganaste/i, { timeout: 5000 }).should("be.visible");
    });
  });

  it("El peor juego (pierde sin aciertos)", function () {
    cy.get("@palabra").then((palabraActual) => {
      const palabraLower = palabraActual.toLowerCase();
      const letras = ALFABETO.filter((c) => !palabraLower.includes(c)).slice(0, 6);

      cy.log(`Probando letras incorrectas: ${letras.join(", ")}`);
      cy.wrap(letras).each((l) => clickLetra(l));

      cy.contains(/perdiste/i, { timeout: 5000 }).should("be.visible");
    });
  });

  it("Gana con algunos errores", function () {
    cy.get("@palabra").then((palabraActual) => {
      const palabraLower = palabraActual.toLowerCase();

      const incorrectas = ALFABETO.filter((c) => !palabraLower.includes(c)).slice(0, 2);
      const correctas = [...new Set(palabraLower.split(""))];

      const letras = [...incorrectas, ...correctas];

      cy.log(`Mezcla de errores y aciertos: ${letras.join(", ")}`);
      cy.wrap(letras).each((l) => clickLetra(l));

      cy.contains(/ganaste/i, { timeout: 5000 }).should("be.visible");
    });
  });

  it("Pierde con algunos aciertos", function () {
    cy.get("@palabra").then((palabraActual) => {
      const palabraLower = palabraActual.toLowerCase();

      const correctas = [...new Set(palabraLower.split(""))].slice(0, 1);
      const incorrectas = ALFABETO.filter((c) => !palabraLower.includes(c)).slice(0, 6);

      const letras = [...correctas, ...incorrectas];

      cy.log(`Acierta algunas pero pierde: ${letras.join(", ")}`);
      cy.wrap(letras).each((l) => clickLetra(l));

      cy.contains(/perdiste/i, { timeout: 5000 }).should("be.visible");
    });
  });
});
