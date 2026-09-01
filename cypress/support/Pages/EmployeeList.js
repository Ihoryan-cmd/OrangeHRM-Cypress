class EmployeeList {

    employeeListButton() {
        return cy.contains('.oxd-topbar-body-nav-tab-item', 'Employee List')
    }

    employeeNameField() {
        return cy.contains('label', 'Employee Name')
            .parents('.oxd-input-group')
            .find('input')
    }

    employeeIdField() {
        return cy.contains('label', 'Employee Id')
            .parents('.oxd-input-group')
            .find('input')
    }

    employmentStatusField() {
        return cy.contains('label', 'Employment Status')
            .parents('.oxd-input-group')
            .find('.oxd-select-text')
    }

    includeField() {
        return cy.contains('label', 'Include')
            .parents('.oxd-input-group')
            .find('.oxd-select-text')
    }

    supervisorNameField() {
        return cy.contains('label', 'Supervisor Name')
            .parents('.oxd-input-group')
            .find('input')
    }

    jobTitleField() {
        return cy.contains('label', 'Job Title')
            .parents('.oxd-input-group')
            .find('.oxd-select-text')
    }

    subUnitField() {
        return cy.contains('label', 'Sub Unit')
            .parents('.oxd-input-group')
            .find('.oxd-select-text')
    }

    resetButton() {
        return cy.contains('button', 'Reset')
    }

    searchButton() {
        return cy.contains('button', 'Search')
    }

    addButton() {
        return cy.contains('button', 'Add')
    }

    recordsFound() {
        return cy.get('.orangehrm-vertical-padding .oxd-text--span')
    }

    tableRows() {
        return cy.get('.oxd-table-body .oxd-table-card')
    }

    noRecordsFound() {
        return cy.contains('.oxd-text--span', 'No Records Found')
    }

    idHeader() {
        return cy.contains('[role="columnheader"]', 'Id')
    }

    firstNameHeader() {
        return cy.contains('[role="columnheader"]', 'First (& Middle) Name')
    }

    lastNameHeader() {
        return cy.contains('[role="columnheader"]', 'Last Name')
    }

    jobTitleHeader() {
        return cy.contains('[role="columnheader"]', 'Job Title')
    }

    employmentStatusHeader() {
        return cy.contains('[role="columnheader"]', 'Employment Status')
    }

    subUnitHeader() {
        return cy.contains('[role="columnheader"]', 'Sub Unit')
    }

    supervisorHeader() {
        return cy.contains('[role="columnheader"]', 'Supervisor')
    }

    actionsHeader() {
        return cy.contains('[role="columnheader"]', 'Actions')
    }
}

export default new EmployeeList()