import "./commands";


export const typeIntoField = (fieldName, fieldText, expectError) => {
    cy.get(`#${fieldName}`).type(fieldText);

    const field = getField(fieldName);
    expectError ? field.shouldHaveError() : field.shouldNotHaveError();
}


export const getField = (fieldName) => {
    const errorField = cy.get(`#${fieldName}Errors`);

    return {
        shouldHaveError: () => errorField.should("not.be.empty"),
        shouldNotHaveError: () => errorField.should("be.empty")
    };
};

