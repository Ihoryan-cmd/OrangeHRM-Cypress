class LoginPage {

    logo() {
        return cy.get('[alt="orangehrm-logo"]')
    }

    usernameInput() {
        return cy.get('[name="username"]')
    }

    passwordInput() {
        return cy.get('[name="password"]')
    }

    loginButton() {
        return cy.get('[type="submit"]')
    }

    forgotPasswordButton() {
        return cy.get('.orangehrm-login-forgot-header')
    }

    invalidCredentialsMessage() {
        return cy.contains('Invalid credentials')
    }

    requiredFieldMessage(fieldName) {
        return cy.get(`[name="${fieldName}"]`)
            .parents('.oxd-input-group')
            .find('.oxd-input-field-error-message')
    }

    resetPasswordTitle() {
        return cy.get('.orangehrm-forgot-password-title')
    }

    backToLoginButton() {
        return cy.get('.orangehrm-forgot-password-reset--link')
    }

    loginTitle() {
        return cy.get('.orangehrm-login-title')
    }

    login(username, password) {
        this.usernameInput().type(username)
        this.passwordInput().type(password)
        this.loginButton().click()
    }
}

export default new LoginPage()