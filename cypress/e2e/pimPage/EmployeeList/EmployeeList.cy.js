import LoginPage from '../../../support/Pages/LoginPage'
import DashboardPage from '../../../support/Pages/DashboardPage'
import SharedLayoutPage from '../../../support/Pages/SharedLayoutPage'
import EmployeeList from '../../../support/Pages/EmployeeList'
import AddEmployeePage from '../../../support/pages/AddEmployeePage'
describe('Employee List', () =>{
    beforeEach(() =>{
        cy.visit('/')
        LoginPage.logo()
            .should('be.visible')
        
        cy.env(['username', 'password']).then(({ username, password }) => {
            LoginPage.login(username, password)
        cy.url().should('include', '/dashboard')

        DashboardPage.dashboardTitle().should('be.visible');
        SharedLayoutPage.menuItem('PIM').click();   
        })
    })

    describe('Page load and initial state of the Employee list page', () => {
        it('Employee page is loaded properly', () =>{
            cy.url().should('include', '/viewEmployeeList')
            EmployeeList.employeeListButton().should('be.visible').and('contain.text', 'Employee List');
        })

        it('All elements are visible', () =>{
            EmployeeList.employeeListButton().should('be.visible')
            EmployeeList.employeeNameField().should('be.visible')
            EmployeeList.employeeIdField().should('be.visible')
            EmployeeList.employmentStatusField().should('be.visible')
            EmployeeList.IncludeField().should('be.visible')
            EmployeeList.SypervisorNameField().should('be.visible')
            EmployeeList.jobTitleField().should('be.visible')
            EmployeeList.subUnitField().should('be.visible')
            EmployeeList.resetButton().should('be.visible')
            EmployeeList.searchButton().should('be.visible')
            EmployeeList.addButton().should('be.visible')

        })
    })

    describe('Employee Information', () =>{
        it('Search employee by Employee Name', () =>{
            const firstName = `Mis${Date.now().toString().slice(-6)}`
            const lastName = `Syb${Date.now().toString().slice(-6)}`
            EmployeeList.addButton().click();
            AddEmployeePage.firstNameInput().type(firstName);
            AddEmployeePage.lastNameInput().type(lastName);
            AddEmployeePage.saveButton().click();
            AddEmployeePage.assertPersonalDetailsLoaded();
            EmployeeList.employeeListButton().click();
            EmployeeList.employeeNameField().type(firstName);
            EmployeeList.searchButton().click();
            EmployeeList.recordsFound().should('have.text', '(1) Record Found')
            EmployeeList.tableRows().should('have.length', 1).and('contain.text', firstName);
        })

        it('Search employee by emloyee Id', () =>{
             const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
             const lastName = `Syb${Date.now().toString().slice(-6)}`
             const firstName = `Mis${Date.now().toString().slice(-6)}`
            EmployeeList.addButton().click();
            AddEmployeePage.firstNameInput().type(firstName);
            AddEmployeePage.lastNameInput().type(lastName);
            AddEmployeePage.employeeIdInput().clear().type(employeeId)
            AddEmployeePage.saveButton().click();
            AddEmployeePage.assertPersonalDetailsLoaded();
            EmployeeList.employeeListButton().click();
            cy.wait(100);
            EmployeeList.employeeIdField().type(employeeId);
            EmployeeList.searchButton().click();
            EmployeeList.recordsFound().should('have.text', '(1) Record Found')
            EmployeeList.tableRows().should('have.length', 1).and('contain.text', employeeId);
        })

        it('Search for non-existing employee', () =>{
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            EmployeeList.employeeIdField().type(employeeId);
            EmployeeList.searchButton().click();
            EmployeeList.noRecordsFound().should('be.visible');
        })
    })

    describe('Reset button', () =>{
        it('Reset button should clear fields', () =>{
            const firstName = `Mis${Date.now().toString().slice(-6)}`
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            EmployeeList.employeeNameField().type(firstName);
            EmployeeList.employeeIdField().type(employeeId);
            EmployeeList.resetButton().click();
            EmployeeList.employeeNameField().should('have.value', '')
            EmployeeList.employeeIdField().should('have.value', '')
        })
        })

    describe('Results Table', () =>{
        it('All expected table headers are visible', () =>{
            EmployeeList.idHeader().should('be.visible');
            EmployeeList.firstNameHeader().should('be.visible');
            EmployeeList.lastNameHeader().should('be.visible');
            EmployeeList.jobTitleHeader().should('be.visible');
            EmployeeList.employmentStatusHeader().should('be.visible');
            EmployeeList.subUnitHeader().should('be.visible');
            EmployeeList.supervisorHeader().should('be.visible');
            EmployeeList.actionsHeader().should('be.visible');            
        })

        it('Edit previously created employee', () =>{
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            const lastName = `Syb${Date.now().toString().slice(-6)}`
            const firstName = `Mis${Date.now().toString().slice(-6)}`
            EmployeeList.addButton().click();
            AddEmployeePage.firstNameInput().type(firstName);
            AddEmployeePage.lastNameInput().type(lastName);
            AddEmployeePage.employeeIdInput().clear().type(employeeId)
            AddEmployeePage.saveButton().click();
            AddEmployeePage.assertPersonalDetailsLoaded();
            EmployeeList.employeeListButton().click();
            cy.contains('.oxd-table-card', employeeId).find('.bi-pencil-fill').click()
            AddEmployeePage.assertPersonalDetailsLoaded()
            AddEmployeePage.firstNameInput().should('have.value', firstName)
            AddEmployeePage.lastNameInput().should('have.value', lastName)
            AddEmployeePage.employeeIdInput().should('have.value', employeeId)
        })

        it('Delete previously created employee', () =>{
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            const lastName = `Syb${Date.now().toString().slice(-6)}`
            const firstName = `Mis${Date.now().toString().slice(-6)}`
            EmployeeList.addButton().click();
            AddEmployeePage.firstNameInput().type(firstName);
            AddEmployeePage.lastNameInput().type(lastName);
            AddEmployeePage.employeeIdInput().clear().type(employeeId)
            AddEmployeePage.saveButton().click();
            AddEmployeePage.assertPersonalDetailsLoaded();
            EmployeeList.employeeListButton().click();
            cy.contains('.oxd-table-card', employeeId).find('.bi-trash').click()
            cy.contains('button', ' Yes, Delete ').click()
            EmployeeList.employeeIdField().type(employeeId);
            EmployeeList.searchButton().click();
            EmployeeList.noRecordsFound().should('be.visible');
        })

        it('Cancel deleting an employee', () =>{
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
            const lastName = `Syb${Date.now().toString().slice(-6)}`
            const firstName = `Mis${Date.now().toString().slice(-6)}`
            EmployeeList.addButton().click();
            AddEmployeePage.firstNameInput().type(firstName);
            AddEmployeePage.lastNameInput().type(lastName);
            AddEmployeePage.employeeIdInput().clear().type(employeeId)
            AddEmployeePage.saveButton().click();
            AddEmployeePage.assertPersonalDetailsLoaded();
            EmployeeList.employeeListButton().click();
            cy.contains('.oxd-table-card', employeeId).find('.bi-trash').click()
            cy.contains('button', ' No, Cancel ').click()
            EmployeeList.employeeIdField().type(employeeId);
            EmployeeList.searchButton().click();
            EmployeeList.recordsFound().should('have.text', '(1) Record Found')
        })
    })
})