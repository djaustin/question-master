import data from "../fixtures/results.json";

describe("Results Page", () => {
  before(() => {
    cy.login();
  });
  beforeEach(() =>
    Cypress.Cookies.preserveOnce(
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url"
    )
  );
  it("should show feedback in a table", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.findByRole("cell", { name: /happy times/i });
  });
  it("should allow global text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.findByLabelText(/search all columns/i).type("sad");
    cy.findByText(/happy/i).should("not.exist");
    cy.findByText(/sad times/i).should("be.visible");
  });
  it("should allow date text filtering", () => {
    cy.intercept("GET", "/api/feedback", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.findAllByRole("textbox").eq(2).type("29");
    cy.findByText(/28-09/i).should("not.exist");
    cy.findByText(/29-09/i).should("be.visible");
  });
  it("should allow comment text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.findAllByRole("textbox").eq(3).type("happy");
    cy.findByText(/sad times/i).should("not.exist");
    cy.findByText(/neutral times/i).should("not.exist");
    cy.findByText(/happy times/i).should("be.visible");
  });
  it("should allow username text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.findAllByRole("textbox").eq(4).type("zz");
    cy.findByText(/xx123456/i).should("not.exist");
    cy.findByText(/ab123456/i).should("not.exist");
    cy.findByText(/zz123456/i).should("be.visible");
  });
  it("should allow score range filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.findAllByRole("spinbutton").eq(0).type("2");
    cy.findAllByRole("spinbutton").eq(1).type("4");
    cy.findByText(/sad times/i).should("not.exist");
    cy.findByText(/happy times/i).should("not.exist");
    cy.findByText(/neutral times/i).should("be.visible");
  });
  it("should allow address text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.findAllByRole("textbox").eq(5).type("192");
    cy.findByText(/127.0.0.1/i).should("not.exist");
    cy.findByText(/10.131.0.1/i).should("not.exist");
    cy.findByText(/192.168.0.1/i).should("be.visible");
  });
});
