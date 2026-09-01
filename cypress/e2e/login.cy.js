/// <reference types="cypress" />

import loginData from '../fixtures/loginData.json'
import LoginPage from '../support/Pages/LoginPage'
import SharedLayoutPage from '../support/Pages/SharedLayoutPage'

describe('Login Page', () => {

    beforeEach(() => {
        cy.visit('/')

        LoginPage.logo()
            .should('be.visible')
    })

    it('Main Login Page elements are visible', () => {
        LoginPage.usernameInput().should('be.visible')
        LoginPage.passwordInput().should('be.visible')
        LoginPage.loginButton().should('be.visible')

        LoginPage.forgotPasswordButton()
            .should('be.visible')
            .and('contain.text', 'Forgot your password?')
    })

    it('Input fields should be empty', () => {
        LoginPage.usernameInput().should('have.value', '')
        LoginPage.passwordInput().should('have.value', '')
    })

    it('Password field has type "password"', () => {
        LoginPage.passwordInput()
            .should('have.attr', 'type', 'password')
    })

    it('Logs in with valid credentials', () => {
        cy.env(['username', 'password']).then(({ username, password }) => {
            LoginPage.login(username, password)
        })

        cy.url().should('include', '/dashboard')

        SharedLayoutPage.pageTitle()
            .should('be.visible')
            .and('contain.text', 'Dashboard')
    })

    loginData.invalidCredentials.forEach((data) => {

        it(`Shows error for ${data.testName}`, () => {

            cy.env(['username', 'password']).then(({ username, password }) => {

                let loginUsername = username
                let loginPassword = password

                if (data.field === 'username') {
                    loginUsername = data.invalidValue
                }

                if (data.field === 'password') {
                    loginPassword = data.invalidValue
                }

                LoginPage.login(loginUsername, loginPassword)
            })

            LoginPage.invalidCredentialsMessage()
                .should('be.visible')
                .and('contain.text', 'Invalid credentials')
        })
    })

    loginData.emptyCredentials.forEach((data) => {

        it(`Shows error for ${data.testName}`, () => {

            cy.env(['username', 'password']).then(({ username, password }) => {

                if (data.field !== 'username') {
                    LoginPage.usernameInput().type(username)
                }

                if (data.field !== 'password') {
                    LoginPage.passwordInput().type(password)
                }

                LoginPage.loginButton().click()
            })

            LoginPage.requiredFieldMessage(data.field)
                .should('have.text', 'Required')
        })
    })

    it('Forgot Password link navigates to Reset Password page', () => {
        LoginPage.forgotPasswordButton().click()

        LoginPage.resetPasswordTitle()
            .should('be.visible')
            .and('contain.text', 'Reset Password')
    })

    it('Back to Login link navigates back to Login page', () => {
        LoginPage.forgotPasswordButton().click()

        LoginPage.resetPasswordTitle()
            .should('be.visible')
            .and('contain.text', 'Reset Password')

        LoginPage.backToLoginButton().click()

        LoginPage.logo()
            .should('be.visible')
    })
})