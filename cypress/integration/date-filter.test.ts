const setToStartOfDay = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
};

describe("Date Picker", async () => {
  it("should send a date filter query to API when a range is selected", () => {
    // Arrange
    const fromDate = new Date();
    const toDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear(), fromDate.getMonth(), 14);
    toDate.setFullYear(toDate.getFullYear(), toDate.getMonth(), 23);
    setToStartOfDay(fromDate);
    setToStartOfDay(toDate);

    cy.intercept("GET", "/api/feedback*", []).as("feedback");
    const expectedQuery = [fromDate, toDate]
      .map((date) => date.toISOString())
      .join(",");
    const fromDateRegex = new RegExp(`\\s+${fromDate.getDate()}th`);
    const toDateRegex = new RegExp(`\\s+${toDate.getDate()}rd`);
    // Act
    cy.visit("/results");
    cy.findAllByRole("textbox").eq(0).click();
    cy.findAllByRole("button", { name: fromDateRegex }).click();
    cy.findAllByRole("button", { name: toDateRegex }).click();

    // Assert
    cy.wait("@feedback");
    cy.wait("@feedback").its("request.url").should("include", expectedQuery);
  });
});
