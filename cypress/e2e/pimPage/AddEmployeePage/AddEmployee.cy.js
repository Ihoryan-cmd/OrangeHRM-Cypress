import employeeData from '../../../fixtures/employeeData.json'
describe('Add Employee', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[alt="orangehrm-logo"]')
        .should('be.visible')
         cy.env(['username', 'password']).then(({username, password}) => {
            cy.login(username, password)
        })
        cy.contains('.oxd-main-menu-item--name', 'PIM').click();
        cy.contains('.oxd-topbar-body-nav-tab-item', 'Add Employee').click();
    })
    // describe('Page Load and Initial State', () => {
    //     it('Add employee page is loaded', () =>{
    //         cy.url().should('include', '/addEmployee');
    //         cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'Add Employee');
    //     })

    //     it('All elements are visible', () =>{
    //         cy.get('[name="firstName"]').should('be.visible');
    //         cy.get('[name="middleName"]').should('be.visible')
    //         cy.get('[name="lastName"]').should('be.visible')
    //         cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input').should('be.visible');
    //         cy.get('.oxd-switch-wrapper').should('be.visible')
    //         cy.get('.employee-image-action').should('be.visible')
    //         cy.get('.oxd-button--ghost').should('be.visible')
    //         cy.get('.orangehrm-left-space').should('be.visible')
    //     })

    //     it('Employee ID already generated', () =>{
    //         cy.contains('label', 'Employee Id')
    //         .parents('.oxd-input-group')
    //         .find('input')
    //         .should('not.have.value', '')
    //     })

    //     it('Fields that should be empty are empty', () =>{
    //         cy.get('[name="firstName"]').should('have.value', '');
    //         cy.get('[name="middleName"]').should('have.value', '')
    //         cy.get('[name="lastName"]').should('have.value', '')
    //     })

    //     it('Create Login Details checkbox is not checked', () =>{
    //         cy.get('.oxd-switch-wrapper input[type="checkbox"]')
    //         .should('not.be.checked')
    //     })
    // })

    // describe('Create an employee', () =>{
    //         it('Create an employee with required fields', () =>{
    //             const data = employeeData.requiredFieldsOnly
    //             cy.get('[name="firstName"]').type(data.firstName);
    //             cy.get('[name="lastName"]').type(data.lastName);
                // cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input').invoke('val').as('employeeId')
                // cy.get('[type="submit"]').click();
                // cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'Personal Details')
                // cy.contains('.oxd-topbar-body-nav-tab-item', 'Employee List').click();
                // cy.get('@employeeId').then((employeeId) => {
                // cy.get('.oxd-padding-cell')
                //     .should('contain.text', employeeId)
    //             })
    //         })

    //         it('Create employee with all fields', () =>{
    //             const data = employeeData.allFields

    //             cy.get('[name="firstName"]').type(data.firstName);
    //             cy.get('[name="middleName"]').type(data.middleName);
    //             cy.get('[name="lastName"]').type(data.lastName);
    //             cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input').clear().type(data.employeeId);
    //             cy.get('[type="submit"]').click();
    //             cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'Personal Details')
    //             cy.contains('.oxd-topbar-body-nav-tab-item', 'Employee List').click();
    //             cy.get('.oxd-padding-cell').should('contain.text', data.employeeId);
    //         })

    //         it('Create an employye with the picture', () =>{
    //             const data = employeeData.employeeWithPhoto
    //             cy.get('[name="firstName"]').type(data.firstName);
    //             cy.get('[name="lastName"]').type(data.lastName);
    //             cy.get('[class="oxd-file-input"]').selectFile('cypress/fixtures/employeePhoto.jpg',{ force: true });
    //             cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input').invoke('val').as('employeeId')
    //             cy.get('[type="submit"]').click();
    //             cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'Personal Details')
    //             cy.contains('.oxd-topbar-body-nav-tab-item', 'Employee List').click();
    //             cy.get('@employeeId').then((employeeId) => {
    //             cy.get('.oxd-padding-cell')
    //                 .should('contain.text', employeeId)
    //             })
    //         })
        
    // })

    // describe('Create an employee(negative scenarious)', () =>{
    //     employeeData.withoutRequiredFields.forEach((data) => {

    //         it(`Create an employee without ${data.missingField}`, () => {
    //         if(data.firstName !== ''){
    //             cy.get('[name="firstName"]').type(data.firstName);
    //         }       
    //         if(data.lastName !== ''){
    //             cy.get('[name="lastName"]').type(data.lastName);
    //         }
    //         cy.get('[type="submit"]').click();
    //         cy.get('.oxd-input-group__message').should('be.visible').and('contain.text', 'Required');         
    //         })
            
    //     })

    //         it(' Create an employee with duplicated Id', () =>{
    //             const data = employeeData.duplicatedId
    //             const employeeId = String(Math.floor(Math.random() * 900000) + 100000)
    //             cy.get('[name="firstName"]').type(data.firstName);
    //             cy.get('[name="lastName"]').type(data.lastName);
    //             cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input').clear().type(employeeId);
    //             cy.get('[type="submit"]').click();
    //             cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'Personal Details')
    //             cy.contains('.oxd-topbar-body-nav-tab-item', 'Add Employee').click();
    //             cy.get('[name="firstName"]').type(data.firstName);
    //             cy.get('[name="lastName"]').type(data.lastName);
    //             cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input').clear().type(employeeId);
    //             cy.get('[type="submit"]').click();
    //             cy.get('.oxd-input-group__message').should('be.visible').and('contain.text', 'Employee Id already exists');
    //         })
        
    //         employeeData.fieldsOverMaximumLength.forEach((data) => {   
    //         it(`Create an employee with invalid length in ${data.testName}`, () =>{
    //               if(data.testName === 'firstName'){
    //                 cy.get('[name="firstName"]').type(data.firstName);
    //                 cy.get('[name="lastName"]').type(data.lastName);
    //               }
    //               if(data.testName === 'middleName'){
    //                 cy.get('[name="firstName"]').type(data.firstName);
    //                 cy.get('[name="middleName"]').type(data.middleName);
    //                 cy.get('[name="lastName"]').type(data.lastName);                   
    //               }
    //               if(data.testName === 'lastName'){
    //                 cy.get('[name="firstName"]').type(data.firstName);
    //                 cy.get('[name="lastName"]').type(data.lastName);                    
    //               }
    //               if(data.testName === 'employeeId'){
    //                 cy.get('[name="firstName"]').type(data.firstName);
    //                 cy.get('[name="lastName"]').type(data.lastName);
    //                 cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input').clear().type(data.employeeId);                    
    //               }
    //             cy.get('[type="submit"]').click();
    //             cy.get('.oxd-input-group__message').should('be.visible').and('contain.text', data.warningMessage);
    //             })
    //         })
    // })

    describe('Create Login Details)', () =>{
        // it('Validate that all expected elements are axisting', () =>{
        //     cy.get('[class="oxd-switch-wrapper"]').click();
        //     cy.contains('label', 'Username').parents('.oxd-input-group').find('input').should('be.visible');
        //     cy.get('input[type="radio"][value="1"]').should('be.checked');
        //     cy.get('input[type="radio"][value="2"]').should('not.be.checked');
        //     cy.contains('label', 'Password').parents('.oxd-input-group').find('input').should('be.visible');
        //     cy.contains('label', 'Confirm Password').parents('.oxd-input-group').find('input').should('be.visible');
        // })

        // it('Create an employee', () =>{ 
        //     const data = employeeData.createLoginDetails;
        //     cy.get('[name="firstName"]').type(data.firstName);
        //     cy.get('[name="lastName"]').type(data.lastName);
        //     cy.get('[class="oxd-switch-wrapper"]').click();
        //     cy.contains('label', 'Username').parents('.oxd-input-group').find('input').type(data.username);
        //     cy.contains('label', 'Password').parents('.oxd-input-group').find('input').type(data.password);
        //     cy.contains('label', 'Confirm Password').parents('.oxd-input-group').find('input').type(data.confirmPassword);
        //     cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input').invoke('val').as('employeeId')
        //     cy.get('[type="submit"]').click();
        //     cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'Personal Details')
        //     cy.contains('.oxd-topbar-body-nav-tab-item', 'Employee List').click();
        //     cy.get('@employeeId').then((employeeId) => {
        //     cy.get('.oxd-padding-cell').should('contain.text', employeeId)
        //     })
        // })
        employeeData.createLoginDetailsWithMissingRequiredFields.forEach((data) =>{       
            it(`Create employee without ${data.fieldName}`, () => {
                cy.get('[name="firstName"]').type(data.firstName);
                cy.get('[name="lastName"]').type(data.lastName);
                cy.get('[class="oxd-switch-wrapper"]').click();    

                if(data.username !== ''){
                    cy.contains('label', 'Username').parents('.oxd-input-group').find('input').type(data.username);
                }
                if(data.password !== ''){
                    cy.contains('label', 'Password').parents('.oxd-input-group').find('input').type(data.password);
                }
                if(data.confirmPassword !== ''){
                    cy.contains('label', 'Confirm Password').parents('.oxd-input-group').find('input').type(data.confirmPassword);
                }   
            cy.get('[type="submit"]').click();
            cy.get('.oxd-input-group__message').should('be.visible').and('contain.text', data.warningMessage);

            })
        })


    })
})