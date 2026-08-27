/// <reference types="cypress" />
import loginData from '../fixtures/loginData.json'
describe('Login Page', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('[alt="orangehrm-logo"]')
        .should('be.visible')
    })

        it('Main LoginPage elements are visible', () =>{
            cy.get('[name="username"]').should('be.visible')
            cy.get('[name="password"]').should('be.visible')
            cy.get('[type="submit"]').should('be.visible')
            cy.get('.orangehrm-login-forgot-header').should('be.visible').and('contain.text', 'Forgot your password?')
        })

        it('Input fields should be empty', () =>{
            cy.get('[name="username"]').should('have.value', '')
            cy.get('[name="password"]').should('have.value', '')
        })

        it('Password field has type: "password"', () =>{
            cy.get('[name="password"]').should('have.attr', 'type', 'password')
        })


        it('logs in with valid credentials', () => {
        cy.env(['username', 'password']).then(({username, password}) => {
            cy.login(username, password)
        })
        cy.url().should('include', '/dashboard')
        cy.get('.oxd-topbar-header-breadcrumb-module').should('be.visible').and('contain.text', 'Dashboard')
        })
   
   loginData.invalidCredentials.forEach((data) => {


    it(`shows error for ${data.testName}`, () => {

        cy.env(['username', 'password']).then(({ username, password }) => {

            const loginUsername =
                data.field === 'username' ? data.invalidValue : username

            const loginPassword =
                data.field === 'password' ? data.invalidValue : password

            cy.login(loginUsername, loginPassword)
        })

        cy.contains('Invalid credentials').should('be.visible')
    })
    })

    loginData.emptyCredentials.forEach((data) => {
    it('shows error for ${data.testName}', () => {
        cy.env(['username', 'password']).then(({ username, password }) => {

            if(data.field !== 'username') {
                cy.get('[name = "username"]').type(username)
            }
            if(data.field !== 'password') {
                cy.get('[name = "password"]').type(password)
            }

            cy.get('button[type = "submit"]').click()
        })
        cy.get(`[name="${data.field}"]`)
            .parents('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('have.text', 'Required')
    })
    })
    it('Forgot Password link navigates to Reset Password page', () =>{
        cy.get('.orangehrm-login-forgot-header').click()
        cy.get('.orangehrm-forgot-password-title').should('be.visible').and('contain.text', 'Reset Password')
    })
    it('Back to Login link navigates back to Login page', () => {
        cy.get('.orangehrm-login-forgot-header').click()
        cy.get('.orangehrm-forgot-password-title').should('be.visible').and('contain.text', 'Reset Password')
        cy.get('.orangehrm-forgot-password-reset--link').click()
        cy.get('[alt="orangehrm-logo"]')
        .should('be.visible')
    })
})