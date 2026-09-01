class AddEmployeePage {

    mainTitle() {
        return cy.get('.orangehrm-main-title')
    }

    firstNameInput() {
        return cy.get('[name="firstName"]')
    }

    middleNameInput() {
        return cy.get('[name="middleName"]')
    }

    lastNameInput() {
        return cy.get('[name="lastName"]')
    }

    employeeIdInput() {
        return cy.contains('label', /^Employee Id$/)
            .parents('.oxd-input-group')
            .find('input')
    }

    loginDetailsToggle() {
        return cy.get('.oxd-switch-wrapper')
    }

    loginDetailsCheckbox() {
        return cy.get('.oxd-switch-wrapper input[type="checkbox"]')
    }

    fileInput() {
        return cy.get('.oxd-file-input')
    }

    profileImageButton() {
        return cy.get('.employee-image-action')
    }

    cancelButton() {
        return cy.get('.oxd-button--ghost')
    }

    saveButton() {
        return cy.get('[type="submit"]')
    }

    usernameInput() {
        return cy.contains('label', /^Username$/)
            .parents('.oxd-input-group')
            .find('input')
    }

    passwordInput() {
        return cy.contains('label', /^Password$/)
            .parents('.oxd-input-group')
            .find('input')
    }

    confirmPasswordInput() {
        return cy.contains('label', /^Confirm Password$/)
            .parents('.oxd-input-group')
            .find('input')
    }

    enabledStatusRadio() {
        return cy.get('input[type="radio"][value="1"]')
    }

    disabledStatusRadio() {
        return cy.get('input[type="radio"][value="2"]')
    }

    employeeListTab() {
        return cy.contains('.oxd-topbar-body-nav-tab-item', 'Employee List')
    }

    addEmployeeTab() {
        return cy.contains('.oxd-topbar-body-nav-tab-item', 'Add Employee')
    }

    tableCells() {
        return cy.get('.oxd-padding-cell')
    }

    validationMessages() {
        return cy.get('.oxd-input-group__message')
    }
}

export default new AddEmployeePage()