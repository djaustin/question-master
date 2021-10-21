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
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.wait(500);

    cy.findAllByRole("textbox").eq(2).type("29");
    cy.findByText(/28-09/i).should("not.exist");
    cy.findByText(/29-09/i).should("be.visible");
  });
  it("should allow comment text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.wait(500);

    cy.findAllByRole("textbox").eq(3).type("happy");
    cy.findByText(/sad times/i).should("not.exist");
    cy.findByText(/neutral times/i).should("not.exist");
    cy.findByText(/happy times/i).should("be.visible");
  });
  it("should allow username text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.wait(500);

    cy.findAllByRole("textbox").eq(4).type("zz");
    cy.findByText(/xx123456/i).should("not.exist");
    cy.findByText(/ab123456/i).should("not.exist");
    cy.findByText(/zz123456/i).should("be.visible");
  });
  it("should allow score range filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.wait("@feedback");
    cy.findAllByRole("spinbutton").eq(0).type("2");
    cy.findAllByRole("spinbutton").eq(1).type("4");
    cy.findByText(/sad times/i).should("not.exist");
    cy.findByText(/happy times/i).should("not.exist");
    cy.findByText(/neutral times/i).should("be.visible");
  });
  it("should allow address text filtering", () => {
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.wait(500);

    cy.findAllByRole("textbox").eq(5).type("192");
    cy.findByText(/127.0.0.1/i).should("not.exist");
    cy.findByText(/10.131.0.1/i).should("not.exist");
    cy.findByText(/192.168.0.1/i).should("be.visible");
  });
  it("should show to maximum number of pages correctly and the 'previous' button should be disabled", () => {
    const numberOfResults = 50;
    cy.intercept("GET", "/api/count*", {body: numberOfResults}).as("count");
    cy.visit("/dashboard/results");
    cy.wait(3000);

    cy.findByLabelText(/page-range-available/i).contains("10");
    cy.findByLabelText(/previous page/i).should('be.disabled')
  });
  it("should call the api with a skip value of 5 when the 'next' button is clicked and make the 'next' button disabled", () => {
    cy.intercept("GET", "/api/count*", {body: 10}).as("count");
    cy.intercept("GET", "/api/feedback*", data).as("feedback");
    cy.visit("/dashboard/results");
    cy.wait(3000);

    cy.wait("@feedback").its("request.url").should("include", "0");

    cy.findByLabelText(/next page/i).click();

    cy.wait("@feedback");
    cy.wait("@feedback").its("request.url").should("include", "5");
    cy.findByLabelText(/next page/i).should('be.disabled')
  });
});
