describe('dashboardPage', () =>{

    beforeEach(() => {
        cy.visit('/')
        cy.get('[alt="orangehrm-logo"]')
        .should('be.visible')
         cy.env(['username', 'password']).then(({username, password}) => {
            cy.login(username, password)
        })
    })

    it('verify this really is Dashboard', () =>{
        cy.get('.oxd-topbar-header-breadcrumb-module').should('be.visible').and('contain.text', 'Dashboard');
    })

    it('verify all Dashboard widgets are visible', () =>{
        cy.contains('.oxd-text--p', 'Time at Work').should('be.visible');
        cy.contains('.oxd-text--p', 'My Actions').should('be.visible');
        cy.contains('.oxd-text--p', 'Quick Launch').should('be.visible');
        cy.contains('.oxd-text--p', 'Buzz Latest Posts').should('be.visible');
        cy.contains('.oxd-text--p', 'Employees on Leave Today').should('be.visible');
        cy.contains('.oxd-text--p', 'Employee Distribution by Sub Unit').should('be.visible');
        cy.contains('.oxd-text--p', 'Employee Distribution by Location').should('be.visible');
    })

    it('Time at Work button navigates to Attendance page', () =>{
        cy.get('.orangehrm-attendance-card-action').click();
        cy.url().should('include', '/attendance')
        cy.get('.oxd-topbar-header-breadcrumb-module').should('be.visible').and('contain.text', 'Attendance');
    })
})