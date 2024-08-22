import "./commands";


export const getField = (fieldName) => {
    const errorField = cy.get(`#${fieldName}Errors`);

    return {
        shouldHaveError: () => errorField.should("not.be.empty"),
        shouldNotHaveError: () => errorField.should("be.empty")
    };
};

