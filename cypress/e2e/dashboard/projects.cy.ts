describe("Projects flow test", () => {
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.visit("/en/auth/login");
    cy.login("password");
  });

  beforeEach(() => {
    cy.visit("/en/dashboard");
  });

  it("New users should not have projects and should be able to create new ones", () => {
    cy.get('[data-testid^="sidebar-project-item"]').should("have.length", 0);
    cy.getByTestId("sidebar-create-first-project-cta").should("exist");

    cy.getByTestId("sidebar-create-first-project-cta").click();
    // cy.getByTestId("sidebar-create-project-input").type("New Project {enter}");
  });
});
