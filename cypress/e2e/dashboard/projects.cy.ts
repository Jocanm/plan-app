describe("Projects flow test", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.resetRepos();
    cy.login("password");
  });

  const createFirstProject = (projectName: string) => {
    cy.getByTestId("sidebar-create-first-project-cta").click();
    cy.getByTestId("create-project-inline-input").type(
      `${projectName} {enter}`
    );
  };

  it("New users should not have projects and should be able to create their fist project", () => {
    cy.get('[data-testid^="sidebar-project-item"]').should("have.length", 0);
    cy.getByTestId("sidebar-create-first-project-cta").should("exist");

    createFirstProject("My first project");

    cy.getByTestId("sidebar-create-first-project-cta").should("not.exist");
    cy.get('[data-testid^="sidebar-project-item"]')
      .should("have.length", 1)
      .contains("My first project");
  });

  it.only("When user creates a first project, it should be redirected to the new project page", () => {
    // createFirstProject("My first project");
    cy.getByTestId("project-header-title")
      .should("have.prop", "tagName", "H1")
      .should("contain.text", "My first project");
  });

  it("Users should be able to create multiple projects", () => {
    cy.get('[data-testid^="sidebar-project-item"]').should("have.length", 0);
    cy.getByTestId("sidebar-create-first-project-cta").should("exist");

    createFirstProject("Custom project");

    cy.getByTestId("sidebar-create-project-cta").click();
    cy.getByTestId("create-project-inline-input").type(
      "My second project {enter}"
    );
    cy.get('[data-testid^="sidebar-project-item"]').should("have.length", 2);
  });
});
