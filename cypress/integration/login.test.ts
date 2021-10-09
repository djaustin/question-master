describe("Login", () => {
  it("should allow login with env variable credentials", () => {
    // Act
    cy.login();

    // Assert
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.getCookie("next-auth.session-token").should("not.be.null");
  });
  it("should display an error on incorrect credentials", () => {
    // Act
    cy.login("notauser", "notapassword");

    // Assert
    cy.findByText(/error signing in/i);
  });
  it("should display an error on no username", () => {
    // Arrange
    cy.visit("/auth/signin");

    // Act
    cy.findByLabelText(/password/i).type("password");
    cy.findByRole("button", { name: /sign in/i }).click();

    // Assert
    cy.findByText(/username.*required/i);
  });
  it("should display an error on no password", () => {
    // Arrange
    cy.visit("/auth/signin");

    // Act
    cy.findByLabelText(/username/i).type("username");
    cy.findByRole("button", { name: /sign in/i }).click();

    // Assert
    cy.findByText(/password.*required/i);
  });
  it("should successfully redirect to the config page", () => {
    // Arrange
    cy.visit("/config");

    // Act
    cy.findByLabelText(/username/i).type(Cypress.env("ADMIN_USERNAME"));
    cy.findByLabelText(/password/i).type(Cypress.env("ADMIN_PASSWORD"));
    cy.findByRole("button", { name: /sign in/i }).click();

    // Assert
    cy.url().should("eq", Cypress.config().baseUrl + "/config");
  });
  it("should successfully redirect to the results page", () => {
    // Arrange
    cy.visit("/dashboard/results");

    // Act
    cy.findByLabelText(/username/i).type(Cypress.env("ADMIN_USERNAME"));
    cy.findByLabelText(/password/i).type(Cypress.env("ADMIN_PASSWORD"));
    cy.findByRole("button", { name: /sign in/i }).click();

    // Assert
    cy.url().should("eq", Cypress.config().baseUrl + "/dashboard/results");
  });
});
