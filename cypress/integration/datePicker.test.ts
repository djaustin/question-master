import getFeedbackWithSpecificDate from "../fixtures/feedback";

describe("Date Picker", async() => {
  it("should call the date api endpoint", () => {
    // Arrange
    const dateNow = new Date();
    const sixthOfTheMonth = dateNow.setFullYear(dateNow.getFullYear(), dateNow.getMonth(), 6);
    const eigthOfTheMonth = dateNow.setFullYear(dateNow.getFullYear(), dateNow.getMonth(), 8);
    cy.intercept("GET", "/api/feedback", getFeedbackWithSpecificDate(sixthOfTheMonth)).as("feedback");
    const dateRange = [sixthOfTheMonth, eigthOfTheMonth];
    cy.intercept("GET", "/api/date", {}).as("date");

    // Act
    cy.visit("/results");
    cy.findAllByRole("textbox").click();
    cy.findAllByRole("button").findByLabelText(`Choose ${sixthOfTheMonth}`).click();

    // Assert
    cy.wait("@date").its("request.query.dateRange").should("eq", dateRange);
  });

});
