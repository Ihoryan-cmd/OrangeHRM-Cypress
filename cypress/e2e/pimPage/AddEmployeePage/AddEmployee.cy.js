import employeeData from '../../../fixtures/employeeData.json'
import addEmployeePage from '../../../support/pages/AddEmployeePage'

describe('Add Employee', () => {

    beforeEach(() => {
        cy.visit('/')

        cy.get('[alt="orangehrm-logo"]')
            .should('be.visible')

        cy.env(['username', 'password']).then(({username, password}) => {
            cy.login(username, password)
        })

        addEmployeePage.openFromPimMenu()
    })


    describe('Page Load and Initial State', () => {

        it('Add Employee page is loaded', () => {
            cy.url().should('include', '/addEmployee')

            addEmployeePage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Add Employee')
        })


        it('All elements are visible', () => {
            addEmployeePage.firstNameInput().should('be.visible')
            addEmployeePage.middleNameInput().should('be.visible')
            addEmployeePage.lastNameInput().should('be.visible')
            addEmployeePage.employeeIdInput().should('be.visible')
            addEmployeePage.loginDetailsToggle().should('be.visible')
            addEmployeePage.profileImageButton().should('be.visible')
            addEmployeePage.cancelButton().should('be.visible')
            addEmployeePage.saveButton().should('be.visible')
        })


        it('Employee ID is already generated', () => {
            addEmployeePage.employeeIdInput()
                .should('not.have.value', '')
        })


        it('Fields that should be empty are empty', () => {
            addEmployeePage.firstNameInput().should('have.value', '')
            addEmployeePage.middleNameInput().should('have.value', '')
            addEmployeePage.lastNameInput().should('have.value', '')
        })


        it('Create Login Details checkbox is not checked', () => {
            addEmployeePage.loginDetailsCheckbox()
                .should('not.be.checked')
        })
    })


    describe('Create an employee', () => {

        it('Create an employee with required fields', () => {
            const data = employeeData.requiredFieldsOnly

            addEmployeePage.fillEmployee(data)
            addEmployeePage.saveEmployeeId()
            addEmployeePage.submit()
            addEmployeePage.assertPersonalDetailsLoaded()

            addEmployeePage.employeeListTab().click()

            cy.get('@employeeId').then((employeeId) => {
                addEmployeePage.assertEmployeeInList(employeeId)
            })
        })


        it('Create employee with all fields', () => {
            const data = employeeData.allFields
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)

            addEmployeePage.fillEmployee(data)
            addEmployeePage.setEmployeeId(employeeId)
            addEmployeePage.submit()
            addEmployeePage.assertPersonalDetailsLoaded()

            addEmployeePage.employeeListTab().click()
            addEmployeePage.assertEmployeeInList(employeeId)
        })


        it('Create an employee with a picture', () => {
            const data = employeeData.employeeWithPhoto

            addEmployeePage.fillEmployee(data)
            addEmployeePage.uploadPhoto('cypress/fixtures/employeePhoto.jpg')
            addEmployeePage.saveEmployeeId()
            addEmployeePage.submit()
            addEmployeePage.assertPersonalDetailsLoaded()

            addEmployeePage.employeeListTab().click()

            cy.get('@employeeId').then((employeeId) => {
                addEmployeePage.assertEmployeeInList(employeeId)
            })
        })
    })


    describe('Create an employee - Negative Scenarios', () => {

        employeeData.withoutRequiredFields.forEach((data) => {

            it(`Create an employee without ${data.missingField}`, () => {
                addEmployeePage.fillEmployee(data)
                addEmployeePage.submit()
                addEmployeePage.assertValidationMessage('Required')
            })
        })


        it('Create an employee with duplicate ID', () => {
            const data = employeeData.duplicatedId
            const employeeId = String(Math.floor(Math.random() * 900000) + 100000)

            addEmployeePage.fillEmployee(data)
            addEmployeePage.setEmployeeId(employeeId)
            addEmployeePage.submit()
            addEmployeePage.assertPersonalDetailsLoaded()

            // Direct visit is kept because the SPA transition was unstable in this scenario.
            addEmployeePage.visit()
            addEmployeePage.firstNameInput().should('be.visible')

            addEmployeePage.fillEmployee(data)
            addEmployeePage.setEmployeeId(employeeId)
            addEmployeePage.submit()

            addEmployeePage.assertValidationMessage('Employee Id already exists')
        })


        employeeData.fieldsOverMaximumLength.forEach((data) => {

            it(`Create an employee with invalid length in ${data.testName}`, () => {
                addEmployeePage.fillEmployee(data)

                if (data.employeeId !== undefined && data.employeeId !== '') {
                    addEmployeePage.setEmployeeId(data.employeeId)
                }

                addEmployeePage.submit()
                addEmployeePage.assertValidationMessage(data.warningMessage)
            })
        })
    })


    describe('Create Login Details', () => {

        it('Validate that all expected elements are visible', () => {
            addEmployeePage.enableLoginDetails()

            addEmployeePage.usernameInput().should('be.visible')
            addEmployeePage.enabledStatusRadio().should('be.checked')
            addEmployeePage.disabledStatusRadio().should('not.be.checked')
            addEmployeePage.passwordInput().should('be.visible')
            addEmployeePage.confirmPasswordInput().should('be.visible')
        })


        it('Create an employee with login details', () => {
            const data = employeeData.createLoginDetails

            addEmployeePage.fillEmployee(data)
            addEmployeePage.enableLoginDetails()
            addEmployeePage.fillLoginDetails(data)
            addEmployeePage.saveEmployeeId()
            addEmployeePage.submit()
            addEmployeePage.assertPersonalDetailsLoaded()

            addEmployeePage.employeeListTab().click()

            cy.get('@employeeId').then((employeeId) => {
                addEmployeePage.assertEmployeeInList(employeeId)
            })
        })


        describe('Required Fields Validation', () => {

            employeeData.createLoginDetailsWithMissingRequiredFields.forEach((data) => {

                it(`Create employee without ${data.fieldName}`, () => {
                    addEmployeePage.fillEmployee(data)
                    addEmployeePage.enableLoginDetails()
                    addEmployeePage.fillLoginDetails(data)
                    addEmployeePage.submit()

                    addEmployeePage.assertValidationMessage(data.warningMessage)
                })
            })
        })


        describe('Username Validation', () => {

            employeeData.usernameWithOverMaxAndLessMinLength.forEach((data) => {

                it(`Username length ${data.testName}`, () => {
                    addEmployeePage.fillEmployee(data)
                    addEmployeePage.enableLoginDetails()
                    addEmployeePage.fillLoginDetails(data)
                    addEmployeePage.submit()

                    addEmployeePage.assertValidationMessage(data.warningMessage)
                })
            })


            it('Duplicate username', () => {
                const data = employeeData.duplicatedUsername
                const username = `user${Date.now()}`

                addEmployeePage.fillEmployee(data)
                addEmployeePage.enableLoginDetails()

                addEmployeePage.fillLoginDetails({
                    username: username,
                    password: data.password,
                    confirmPassword: data.confirmPassword
                })

                addEmployeePage.saveEmployeeId()
                addEmployeePage.submit()
                addEmployeePage.assertPersonalDetailsLoaded()

                addEmployeePage.employeeListTab().click()

                cy.get('@employeeId').then((employeeId) => {
                    addEmployeePage.assertEmployeeInList(employeeId)
                })

                addEmployeePage.addEmployeeTab().click()

                addEmployeePage.fillEmployee(data)
                addEmployeePage.enableLoginDetails()

                addEmployeePage.fillLoginDetails({
                    username: username,
                    password: data.password,
                    confirmPassword: data.confirmPassword
                })

                addEmployeePage.submit()
                addEmployeePage.assertValidationMessage(data.warningMessage)
            })
        })


        describe('Password Validation', () => {

            employeeData.passwordValidation.forEach((data) => {

                it(`${data.testName}`, () => {
                    addEmployeePage.fillEmployee(data)
                    addEmployeePage.enableLoginDetails()
                    addEmployeePage.fillLoginDetails(data)
                    addEmployeePage.submit()

                    addEmployeePage.assertValidationMessage(data.warningMessage)
                })
            })
        })


        describe('Confirm Password', () => {

            it('Confirm Password mismatch', () => {
                const data = employeeData.confirmPassword

                addEmployeePage.fillEmployee(data)
                addEmployeePage.enableLoginDetails()
                addEmployeePage.fillLoginDetails(data)
                addEmployeePage.submit()

                addEmployeePage.assertValidationMessage(data.warningMessage)
            })
        })
    })
})
