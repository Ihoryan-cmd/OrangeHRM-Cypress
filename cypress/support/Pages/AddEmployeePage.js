class AddEmployeePage {

    openFromPimMenu() {
        cy.contains('.oxd-main-menu-item--name', 'PIM').click()
        cy.contains('.oxd-topbar-body-nav-tab-item', 'Add Employee').click()
    }

    visit() {
        cy.visit('/web/index.php/pim/addEmployee')
    }

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

    fillEmployee(data) {
        if (data.firstName !== undefined && data.firstName !== '') {
            this.firstNameInput().type(data.firstName)
        }

        if (data.middleName !== undefined && data.middleName !== '') {
            this.middleNameInput().type(data.middleName)
        }

        if (data.lastName !== undefined && data.lastName !== '') {
            this.lastNameInput().type(data.lastName)
        }
    }

    setEmployeeId(employeeId) {
        this.employeeIdInput()
            .clear()
            .type(employeeId)
    }

    saveEmployeeId(aliasName = 'employeeId') {
        this.employeeIdInput()
            .invoke('val')
            .as(aliasName)
    }

    uploadPhoto(filePath) {
        this.fileInput()
            .selectFile(filePath, { force: true })
    }

    enableLoginDetails() {
        this.loginDetailsToggle().click()
    }

    fillLoginDetails(data) {
        if (data.username !== undefined && data.username !== '') {
            this.usernameInput().type(data.username)
        }

        if (data.password !== undefined && data.password !== '') {
            this.passwordInput().type(data.password)
        }

        if (data.confirmPassword !== undefined && data.confirmPassword !== '') {
            this.confirmPasswordInput().type(data.confirmPassword)
        }
    }

    submit() {
        this.saveButton().click()
    }

    assertPersonalDetailsLoaded() {
        this.mainTitle()
            .should('be.visible')
            .and('contain.text', 'Personal Details')
    }

    assertValidationMessage(message) {
        this.validationMessages()
            .should('be.visible')
            .and('contain.text', message)
    }

    assertEmployeeInList(employeeId) {
        this.tableCells()
            .should('contain.text', employeeId)
    }
}

export default new AddEmployeePage()
