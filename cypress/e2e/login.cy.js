/// <reference types="cypress" />
import loginData from '../fixtures/loginData.json'
loginData.invalidCredentials
describe('Login Page', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('logs in with valid credentials', () => {
        cy.env(['username', 'password']).then(({username, password}) => {
            cy.login(username, password)
        })

        cy.url().should('include', '/dashboard')
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


  
})