class EmployeeList{

    employeeListButton(){
        return cy.contains('.oxd-topbar-body-nav-tab-item', 'Employee List')
    }

    employeeNameField(){
        return cy.contains('label', 'Employee Name')
        .parents('.oxd-input-group')
        .find('input')
    }
    employeeIdField(){
        return cy.contains('label', 'Employee Id')
        .parents('.oxd-input-group')
        .find('input')
    }
    employmentStatusField(){
        return cy.contains('label', 'Employment Status')
        .parents('.oxd-input-group')
        .find('.oxd-select-text-input')
    }
    IncludeField(){
        return cy.contains('label', 'Include')
        .parents('.oxd-input-group')
        .find('.oxd-select-text-input')
    }
    SypervisorNameField(){
        return cy.contains('label', 'Supervisor Name')
        .parents('.oxd-input-group')
        .find('input')
    }
    jobTitleField(){
        return cy.contains('label', 'Job Title')
        .parents('.oxd-input-group')
        .find('.oxd-select-text-input')
    }
    subUnitField(){
        return cy.contains('label', 'Sub Unit')
        .parents('.oxd-input-group')
        .find('.oxd-select-text-input')
    }

    resetButton(){
        return cy.contains('button', ' Reset ')
    }

    searchButton(){
        return cy.contains('button', ' Search ')
    }

    addButton(){
        return cy.contains('button', ' Add ')
    }

    recordsFound() {
        return cy.get('.orangehrm-vertical-padding .oxd-text--span')
    }

    tableRows() {
        return cy.get('.oxd-table-body .oxd-table-card')
    }

    noRecordsFound(){
        return cy.get('.oxd-text--span').should('contain.text', 'No Records Found');
    }

    idHeader(){
        return cy.get('[role="columnheader"]').should('contain.text', 'id')
    }
    firstNameHeader(){
        return cy.get('[role="columnheader"]').should('contain.text', 'First (& Middle) Name')
    }
    lastNameHeader(){
        return cy.get('[role="columnheader"]').should('contain.text', 'Last Name')
    }
    jobTitleHeader(){
        return cy.get('[role="columnheader"]').should('contain.text', 'Job Title')
    }
    employmentStatusHeader(){
        return cy.get('[role="columnheader"]').should('contain.text', 'Employment Status')
    }
    subUnitHeader(){
        return cy.get('[role="columnheader"]').should('contain.text', 'Sub Unit')
    }
    supervisorHeader(){
        return cy.get('[role="columnheader"]').should('contain.text', 'Supervisor')
    }
    actionsHeader(){
        return cy.get('[role="columnheader"]').should('contain.text', 'Actions')
    }    
}
export default new EmployeeList()
