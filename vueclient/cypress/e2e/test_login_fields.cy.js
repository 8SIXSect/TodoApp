import { getField, typeIntoField } from "../support/e2e";


describe("Input values into login fields and confirm validity", () => {
    beforeEach(() => cy.visit("/login"))

    it("Input no data into entry box and get error because they are required fields", () => {
        cy.get("button")
            .first()
            .click()

        for (const field of ["username", "password"]) {
            getField(field).shouldHaveError();
        }
        
    })

    it("Input a username that's too short into field", () => {
        typeIntoField("username", "ab", true);
    })

    it("Input a username that uses non-alphabetic characters", () => {
        typeIntoField("username", "#42***?", true);
    })

    it("Input a username that is valid into field", () => {
        typeIntoField("username", "myUsername", false);
    })

    it("Input a password that is too short into field", () => {
        typeIntoField("password", "short", true);
    })

    it("Input a password that types non-keyboard characters", () => {
        typeIntoField("password", "αΘθΨψΩ", true);
    })

    it("Input a valid password into field", () => {
        typeIntoField("password", "super123@Secure", false);
    })

})

