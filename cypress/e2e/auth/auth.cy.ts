import { ROUTES } from "../../../src/lib/config/constants";

describe("Auth tests", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });

  describe("Middleware behavior", () => {
    it("Should redirect to login if NOT authenticated user is in private route", () => {
      cy.visit(ROUTES.DASHBOARD);
      cy.url().should("include", ROUTES.LOGIN);
    });

    it("Should allow NOT authenticated user to access public route", () => {
      cy.visit(ROUTES.LOGIN);
      cy.url().should("include", ROUTES.LOGIN);
    });

    it("Should NOT allow authenticated users to access auth pages", () => {
      cy.login("password");
      cy.visit(ROUTES.LOGIN);

      cy.url().should("not.contain", ROUTES.LOGIN);
    });

    it("Should allow authenticated user to access private routes", () => {
      cy.login("password");
      cy.visit(ROUTES.DASHBOARD);

      cy.location("pathname").should("contain", ROUTES.DASHBOARD);
    });
  });

  describe("Sign out", () => {
    it("Should take the user to login after he pressed logout button", () => {
      cy.login("password");

      // WORKAROUND: Wait for React hydration to attach Server Action to form
      // Without this, form has placeholder action that throws error
      // Root cause: Server Actions in Client Components with async wrappers
      // don't hydrate correctly in Cypress environment
      cy.wait(1000);
      cy.getByTestId("signout-button").should("be.visible").click();
      cy.location("pathname").should("contain", ROUTES.LOGIN);
    });
  });

  // describe("Login", () => {
  //   it("Should redirect to error page if there was an error redirection and append error to url", () => {
  //     const CUSTOM_ERROR = "customError";

  //     cy.visit(ROUTES.LOGIN, {
  //       qs: { error: CUSTOM_ERROR },
  //     });

  //     cy.location().should(loc => {
  //       expect(loc.pathname).contain(ROUTES.ERROR);
  //       expect(loc.search).contain(`error=${CUSTOM_ERROR}`);
  //     });
  //   });
  // });
});
