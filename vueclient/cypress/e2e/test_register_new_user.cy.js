import { getField } from "../support/e2e"


describe("Input values into register field and confirm that a user already exists", () => {
    beforeEach(() => {
        cy.visit("/signup")
    })

    it("Input no data into entry box and get error because they are required fields", () => {
        cy.get("button")
            .first()
            .click()

        for (const field of ["email", "username", "password"]) {
            getField(field).shouldHaveError();
        }
        
    })

    it("Input Invalid email into email field", () => {
        cy.get("#email").type("a90ofdjjod");
        getField("email").shouldHaveError();
    })

    it("Input valid email into email field", () => {
        cy.get("#email").type("test@firefox.org");
        getField("email").shouldNotHaveError();
    })

    it("Input a username that's too short into field", () => {
        cy.get("#username").type("ab");
        getField("username").shouldHaveError();
    })

    it("Input a username that uses non-alphabetic characters", () => {
        cy.get("#username").type("#42***?");
        getField("username").shouldHaveError();
    })
})

