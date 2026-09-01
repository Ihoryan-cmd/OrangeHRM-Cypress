/// <reference types="cypress" />

import employeeData from '../../../fixtures/employeeData.json'
import LoginPage from '../../../support/Pages/LoginPage'
import SharedLayoutPage from '../../../support/Pages/SharedLayoutPage'
import AddEmployeePage from '../../../support/Pages/AddEmployeePage'

describe('Add Employee', () => {

    beforeEach(() => {
        cy.visit('/')

        LoginPage.logo()
            .should('be.visible')

        cy.env(['username', 'password']).then(({ username, password }) => {
            LoginPage.login(username, password)
        })

        cy.url().should('include', '/dashboard')

        SharedLayoutPage.menuItem('PIM').click()
        AddEmployeePage.addEmployeeTab().click()

        AddEmployeePage.mainTitle()
            .should('be.visible')
            .and('contain.text', 'Add Employee')
    })


    describe('Page Load and Initial State', () => {

        it('Add Employee page is loaded', () => {
            cy.url().should('include', '/addEmployee')

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Add Employee')
        })


        it('All elements are visible', () => {
            AddEmployeePage.firstNameInput().should('be.visible')
            AddEmployeePage.middleNameInput().should('be.visible')
            AddEmployeePage.lastNameInput().should('be.visible')
            AddEmployeePage.employeeIdInput().should('be.visible')
            AddEmployeePage.loginDetailsToggle().should('be.visible')
            AddEmployeePage.profileImageButton().should('be.visible')
            AddEmployeePage.cancelButton().should('be.visible')
            AddEmployeePage.saveButton().should('be.visible')
        })


        it('Employee ID is already generated', () => {
            AddEmployeePage.employeeIdInput()
                .should('not.have.value', '')
        })


        it('Employee name fields are empty', () => {
            AddEmployeePage.firstNameInput().should('have.value', '')
            AddEmployeePage.middleNameInput().should('have.value', '')
            AddEmployeePage.lastNameInput().should('have.value', '')
        })


        it('Create Login Details checkbox is not checked', () => {
            AddEmployeePage.loginDetailsCheckbox()
                .should('not.be.checked')
        })
    })


    describe('Create Employee', () => {

        it('Creates an employee with required fields', () => {
            const data = employeeData.requiredFieldsOnly

            AddEmployeePage.firstNameInput().type(data.firstName)
            AddEmployeePage.lastNameInput().type(data.lastName)

            AddEmployeePage.employeeIdInput()
                .invoke('val')
                .as('employeeId')

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            AddEmployeePage.employeeListTab().click()

            cy.get('@employeeId').then((employeeId) => {
                AddEmployeePage.tableCells()
                    .should('contain.text', employeeId)
            })
        })


        it('Creates an employee with all fields', () => {
            const data = employeeData.allFields
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)

            AddEmployeePage.firstNameInput().type(data.firstName)
            AddEmployeePage.middleNameInput().type(data.middleName)
            AddEmployeePage.lastNameInput().type(data.lastName)

            AddEmployeePage.employeeIdInput()
                .clear()
                .type(employeeId)

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            AddEmployeePage.employeeListTab().click()

            AddEmployeePage.tableCells()
                .should('contain.text', employeeId)
        })


        it('Creates an employee with a picture', () => {
            const data = employeeData.employeeWithPhoto

            AddEmployeePage.firstNameInput().type(data.firstName)
            AddEmployeePage.lastNameInput().type(data.lastName)

            AddEmployeePage.fileInput()
                .selectFile('cypress/fixtures/employeePhoto.jpg', { force: true })

            AddEmployeePage.employeeIdInput()
                .invoke('val')
                .as('employeeId')

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            AddEmployeePage.employeeListTab().click()

            cy.get('@employeeId').then((employeeId) => {
                AddEmployeePage.tableCells()
                    .should('contain.text', employeeId)
            })
        })
    })


    describe('Employee Validation', () => {

        employeeData.withoutRequiredFields.forEach((data) => {

            it(`Shows validation when ${data.missingField} is missing`, () => {

                if (data.firstName !== '') {
                    AddEmployeePage.firstNameInput().type(data.firstName)
                }

                if (data.lastName !== '') {
                    AddEmployeePage.lastNameInput().type(data.lastName)
                }

                AddEmployeePage.saveButton().click()

                AddEmployeePage.validationMessages()
                    .should('be.visible')
                    .and('contain.text', 'Required')
            })
        })


        it('Shows validation for duplicate Employee ID', () => {
            const data = employeeData.duplicatedId
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)

            AddEmployeePage.firstNameInput().type(data.firstName)
            AddEmployeePage.lastNameInput().type(data.lastName)

            AddEmployeePage.employeeIdInput()
                .clear()
                .type(employeeId)

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            // Direct visit is used because the SPA transition is unstable here.
            cy.visit('/web/index.php/pim/addEmployee')

            AddEmployeePage.firstNameInput()
                .should('be.visible')

            AddEmployeePage.firstNameInput().type(data.firstName)
            AddEmployeePage.lastNameInput().type(data.lastName)

            AddEmployeePage.employeeIdInput()
                .clear()
                .type(employeeId)

            AddEmployeePage.saveButton().click()

            AddEmployeePage.validationMessages()
                .should('be.visible')
                .and('contain.text', 'Employee Id already exists')
        })


        employeeData.fieldsOverMaximumLength.forEach((data) => {

            it(`Shows validation for invalid ${data.testName} length`, () => {

                if (data.firstName) {
                    AddEmployeePage.firstNameInput().type(data.firstName)
                }

                if (data.middleName) {
                    AddEmployeePage.middleNameInput().type(data.middleName)
                }

                if (data.lastName) {
                    AddEmployeePage.lastNameInput().type(data.lastName)
                }

                if (data.employeeId) {
                    AddEmployeePage.employeeIdInput()
                        .clear()
                        .type(data.employeeId)
                }

                AddEmployeePage.saveButton().click()

                AddEmployeePage.validationMessages()
                    .should('be.visible')
                    .and('contain.text', data.warningMessage)
            })
        })
    })


    describe('Create Login Details', () => {

        it('Login Details fields are visible after enabling the option', () => {
            AddEmployeePage.loginDetailsToggle().click()

            AddEmployeePage.usernameInput().should('be.visible')
            AddEmployeePage.enabledStatusRadio().should('be.checked')
            AddEmployeePage.disabledStatusRadio().should('not.be.checked')
            AddEmployeePage.passwordInput().should('be.visible')
            AddEmployeePage.confirmPasswordInput().should('be.visible')
        })


        it('Creates an employee with login details', () => {
            const data = employeeData.createLoginDetails
            const username = `user${Date.now()}`

            AddEmployeePage.firstNameInput().type(data.firstName)
            AddEmployeePage.lastNameInput().type(data.lastName)

            AddEmployeePage.loginDetailsToggle().click()

            AddEmployeePage.usernameInput().type(username)
            AddEmployeePage.passwordInput().type(data.password)
            AddEmployeePage.confirmPasswordInput().type(data.confirmPassword)

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')
        })


        describe('Required Fields Validation', () => {

            employeeData.createLoginDetailsWithMissingRequiredFields.forEach((data) => {

                it(`Shows validation when ${data.fieldName} is missing`, () => {

                    AddEmployeePage.firstNameInput().type(data.firstName)
                    AddEmployeePage.lastNameInput().type(data.lastName)

                    AddEmployeePage.loginDetailsToggle().click()

                    if (data.username) {
                        AddEmployeePage.usernameInput().type(data.username)
                    }

                    if (data.password) {
                        AddEmployeePage.passwordInput().type(data.password)
                    }

                    if (data.confirmPassword) {
                        AddEmployeePage.confirmPasswordInput().type(data.confirmPassword)
                    }

                    AddEmployeePage.saveButton().click()

                    AddEmployeePage.validationMessages()
                        .should('be.visible')
                        .and('contain.text', data.warningMessage)
                })
            })
        })


        describe('Username Validation', () => {

            employeeData.usernameWithOverMaxAndLessMinLength.forEach((data) => {

                it(`Username length ${data.testName}`, () => {

                    AddEmployeePage.firstNameInput().type(data.firstName)
                    AddEmployeePage.lastNameInput().type(data.lastName)

                    AddEmployeePage.loginDetailsToggle().click()

                    AddEmployeePage.usernameInput().type(data.username)
                    AddEmployeePage.passwordInput().type(data.password)
                    AddEmployeePage.confirmPasswordInput().type(data.confirmPassword)

                    AddEmployeePage.saveButton().click()

                    AddEmployeePage.validationMessages()
                        .should('be.visible')
                        .and('contain.text', data.warningMessage)
                })
            })


            it('Shows validation for duplicate username', () => {
                const data = employeeData.duplicatedUsername
                const username = `user${Date.now()}`

                AddEmployeePage.firstNameInput().type(data.firstName)
                AddEmployeePage.lastNameInput().type(data.lastName)

                AddEmployeePage.loginDetailsToggle().click()

                AddEmployeePage.usernameInput().type(username)
                AddEmployeePage.passwordInput().type(data.password)
                AddEmployeePage.confirmPasswordInput().type(data.confirmPassword)

                AddEmployeePage.saveButton().click()

                AddEmployeePage.mainTitle()
                    .should('be.visible')
                    .and('contain.text', 'Personal Details')

                cy.visit('/web/index.php/pim/addEmployee')

                cy.wait(100)

                AddEmployeePage.firstNameInput().type(data.firstName)
                AddEmployeePage.lastNameInput().type(data.lastName)

                AddEmployeePage.loginDetailsToggle().click()

                AddEmployeePage.usernameInput().type(username)
                AddEmployeePage.passwordInput().type(data.password)
                AddEmployeePage.confirmPasswordInput().type(data.confirmPassword)

                AddEmployeePage.saveButton().click()

                AddEmployeePage.validationMessages()
                    .should('be.visible')
                    .and('contain.text', data.warningMessage)
            })
        })


        describe('Password Validation', () => {

            employeeData.passwordValidation.forEach((data) => {

                it(data.testName, () => {

                    AddEmployeePage.firstNameInput().type(data.firstName)
                    AddEmployeePage.lastNameInput().type(data.lastName)

                    AddEmployeePage.loginDetailsToggle().click()

                    AddEmployeePage.usernameInput().type(data.username)
                    AddEmployeePage.passwordInput().type(data.password)
                    AddEmployeePage.confirmPasswordInput().type(data.confirmPassword)

                    AddEmployeePage.saveButton().click()

                    AddEmployeePage.validationMessages()
                        .should('be.visible')
                        .and('contain.text', data.warningMessage)
                })
            })
        })


        describe('Confirm Password', () => {

            it('Shows validation when passwords do not match', () => {
                const data = employeeData.confirmPassword

                AddEmployeePage.firstNameInput().type(data.firstName)
                AddEmployeePage.lastNameInput().type(data.lastName)

                AddEmployeePage.loginDetailsToggle().click()

                AddEmployeePage.usernameInput().type(data.username)
                AddEmployeePage.passwordInput().type(data.password)
                AddEmployeePage.confirmPasswordInput().type(data.confirmPassword)

                AddEmployeePage.saveButton().click()

                AddEmployeePage.validationMessages()
                    .should('be.visible')
                    .and('contain.text', data.warningMessage)
            })
        })
    })
})