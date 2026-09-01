/// <reference types="cypress" />

import LoginPage from '../../../support/Pages/LoginPage'
import SharedLayoutPage from '../../../support/Pages/SharedLayoutPage'
import EmployeeList from '../../../support/Pages/EmployeeList'
import AddEmployeePage from '../../../support/Pages/AddEmployeePage'

describe('Employee List', () => {

    beforeEach(() => {
        cy.visit('/')

        LoginPage.logo()
            .should('be.visible')

        cy.env(['username', 'password']).then(({ username, password }) => {
            LoginPage.login(username, password)
        })

        cy.url().should('include', '/dashboard')

        SharedLayoutPage.menuItem('PIM').click()

        EmployeeList.employeeListButton()
            .should('be.visible')
    })


    describe('Page Load and Initial State', () => {

        it('Employee List page is loaded properly', () => {
            cy.url().should('include', '/viewEmployeeList')

            EmployeeList.employeeListButton()
                .should('be.visible')
                .and('contain.text', 'Employee List')
        })


        it('All elements are visible', () => {
            EmployeeList.employeeNameField().should('be.visible')
            EmployeeList.employeeIdField().should('be.visible')
            EmployeeList.employmentStatusField().should('be.visible')
            EmployeeList.includeField().should('be.visible')
            EmployeeList.supervisorNameField().should('be.visible')
            EmployeeList.jobTitleField().should('be.visible')
            EmployeeList.subUnitField().should('be.visible')
            EmployeeList.resetButton().should('be.visible')
            EmployeeList.searchButton().should('be.visible')
            EmployeeList.addButton().should('be.visible')
        })
    })


    describe('Employee Search', () => {

        it('Search employee by Employee Name', () => {
            const firstName = `Mis${Date.now()}`
            const lastName = `Syb${Date.now()}`

            EmployeeList.addButton().click()

            AddEmployeePage.firstNameInput().type(firstName)
            AddEmployeePage.lastNameInput().type(lastName)
            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            EmployeeList.employeeListButton().click()

            EmployeeList.employeeNameField().type(firstName)
            EmployeeList.searchButton().click()

            EmployeeList.recordsFound()
                .should('have.text', '(1) Record Found')

            EmployeeList.tableRows()
                .should('have.length', 1)
                .and('contain.text', firstName)
        })


        it('Search employee by Employee ID', () => {
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            const firstName = `Mis${Date.now()}`
            const lastName = `Syb${Date.now()}`

            EmployeeList.addButton().click()

            AddEmployeePage.firstNameInput().type(firstName)
            AddEmployeePage.lastNameInput().type(lastName)

            AddEmployeePage.employeeIdInput()
                .clear()
                .type(employeeId)

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            EmployeeList.employeeListButton().click()

            // Small wait because OrangeHRM sometimes re-renders the input.
            cy.wait(100)

            EmployeeList.employeeIdField().type(employeeId)
            EmployeeList.searchButton().click()

            EmployeeList.recordsFound()
                .should('have.text', '(1) Record Found')

            EmployeeList.tableRows()
                .should('have.length', 1)
                .and('contain.text', employeeId)
        })


        it('Search for non-existing employee', () => {
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)

            EmployeeList.employeeIdField().type(employeeId)
            EmployeeList.searchButton().click()

            EmployeeList.noRecordsFound()
                .should('be.visible')
        })
    })


    describe('Reset Filters', () => {

        it('Reset button clears entered fields', () => {
            const firstName = `Mis${Date.now()}`
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)

            EmployeeList.employeeNameField().type(firstName)
            EmployeeList.employeeIdField().type(employeeId)

            EmployeeList.resetButton().click()

            EmployeeList.employeeNameField()
                .should('have.value', '')

            EmployeeList.employeeIdField()
                .should('have.value', '')
        })
    })


    describe('Results Table', () => {

        it('All expected table headers are visible', () => {
            EmployeeList.idHeader().should('be.visible')
            EmployeeList.firstNameHeader().should('be.visible')
            EmployeeList.lastNameHeader().should('be.visible')
            EmployeeList.jobTitleHeader().should('be.visible')
            EmployeeList.employmentStatusHeader().should('be.visible')
            EmployeeList.subUnitHeader().should('be.visible')
            EmployeeList.supervisorHeader().should('be.visible')
            EmployeeList.actionsHeader().should('be.visible')
        })


        it('Edit previously created employee', () => {
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            const firstName = `Mis${Date.now()}`
            const lastName = `Syb${Date.now()}`

            EmployeeList.addButton().click()

            AddEmployeePage.firstNameInput().type(firstName)
            AddEmployeePage.lastNameInput().type(lastName)

            AddEmployeePage.employeeIdInput()
                .clear()
                .type(employeeId)

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            EmployeeList.employeeListButton().click()

            cy.contains('.oxd-table-card', employeeId)
                .find('.bi-pencil-fill')
                .click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            AddEmployeePage.firstNameInput()
                .should('have.value', firstName)

            AddEmployeePage.lastNameInput()
                .should('have.value', lastName)

            AddEmployeePage.employeeIdInput()
                .should('have.value', employeeId)
        })


        it('Delete previously created employee', () => {
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            const firstName = `Mis${Date.now()}`
            const lastName = `Syb${Date.now()}`

            EmployeeList.addButton().click()

            AddEmployeePage.firstNameInput().type(firstName)
            AddEmployeePage.lastNameInput().type(lastName)

            AddEmployeePage.employeeIdInput()
                .clear()
                .type(employeeId)

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            EmployeeList.employeeListButton().click()

            cy.contains('.oxd-table-card', employeeId)
                .find('.bi-trash')
                .click()

            cy.contains('button', 'Yes, Delete').click()

            EmployeeList.employeeIdField().type(employeeId)
            EmployeeList.searchButton().click()

            EmployeeList.noRecordsFound()
                .should('be.visible')
        })


        it('Cancel deleting an employee', () => {
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            const firstName = `Mis${Date.now()}`
            const lastName = `Syb${Date.now()}`

            EmployeeList.addButton().click()

            AddEmployeePage.firstNameInput().type(firstName)
            AddEmployeePage.lastNameInput().type(lastName)

            AddEmployeePage.employeeIdInput()
                .clear()
                .type(employeeId)

            AddEmployeePage.saveButton().click()

            AddEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Personal Details')

            EmployeeList.employeeListButton().click()

            cy.contains('.oxd-table-card', employeeId)
                .find('.bi-trash')
                .click()

            cy.contains('button', 'No, Cancel').click()

            EmployeeList.employeeIdField().type(employeeId)
            EmployeeList.searchButton().click()

            EmployeeList.recordsFound()
                .should('have.text', '(1) Record Found')

            EmployeeList.tableRows()
                .should('contain.text', employeeId)
        })
    })
})