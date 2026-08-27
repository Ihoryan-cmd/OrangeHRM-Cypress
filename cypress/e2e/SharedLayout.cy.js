describe('sharedLayout', () =>{
    beforeEach(() => {
        cy.visit('/')
        cy.get('[alt="orangehrm-logo"]')
        .should('be.visible')
        cy.env(['username', 'password']).then(({username, password}) => {
            cy.login(username, password)
        })
    })
    describe('Shared Elements', () => {
        it('Shared layout elements are visible', () =>{
            cy.get('[alt="client brand banner"]').should('be.visible');
            cy.get('[placeholder="Search"]').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Admin').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'PIM').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Leave').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Time').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Recruitment').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'My Info').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Performance').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Dashboard').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Directory').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Maintenance').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Claim').should('be.visible');
            cy.contains('.oxd-main-menu-item--name', 'Buzz').should('be.visible');
            cy.get('.bi-chevron-left').should('be.visible');
            cy.get('.orangehrm-upgrade-button').should('be.visible');
            cy.get('.oxd-userdropdown-name').should('be.visible');
        })
    })

    describe('Sidebar Navigation', () => {

    it('Admin link navigates to Admin page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Admin').click()

        cy.url().should('include', '/admin')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Admin')
    })

    it('PIM link navigates to PIM page', () => {
        cy.contains('.oxd-main-menu-item--name', 'PIM').click()

        cy.url().should('include', '/pim')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'PIM')
    })

    it('Leave link navigates to Leave page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Leave').click()

        cy.url().should('include', '/leave')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Leave')
    })

    it('Time link navigates to Time page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Time').click()

        cy.url().should('include', '/time')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Time')
    })

    it('Recruitment link navigates to Recruitment page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Recruitment').click()

        cy.url().should('include', '/recruitment')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Recruitment')
    })

    it('My Info link navigates to My Info page', () => {
        cy.contains('.oxd-main-menu-item--name', 'My Info').click()

        cy.url().should('include', '/pim')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
    })

    it('Performance link navigates to Performance page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Performance').click()

        cy.url().should('include', '/performance')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Performance')
    })

    it('Dashboard link navigates to Dashboard page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Dashboard').click()

        cy.url().should('include', '/dashboard')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Dashboard')
    })

    it('Directory link navigates to Directory page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Directory').click()

        cy.url().should('include', '/directory')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Directory')
    })

    it('Maintenance link navigates to Maintenance page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Maintenance').click()

        cy.url().should('include', '/maintenance')

        cy.get('.orangehrm-admin-access-title')
            .should('be.visible')
            .and('contain.text', 'Administrator Access')
    })

    it('Claim link navigates to Claim page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Claim').click()

        cy.url().should('include', '/claim')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Claim')
    })

    it('Buzz link navigates to Buzz page', () => {
        cy.contains('.oxd-main-menu-item--name', 'Buzz').click()

        cy.url().should('include', '/buzz')

        cy.get('.oxd-topbar-header-breadcrumb-module')
            .should('be.visible')
            .and('contain.text', 'Buzz')
    })
    it('Search field is working properly', () =>{
        cy.get('[placeholder="Search"]').type('Admin');
        cy.contains('.oxd-main-menu-item--name', 'Admin').should('be.visible');

        cy.contains('.oxd-main-menu-item--name', 'PIM').should('not.exist');
    })

    it('Sidebar can be collapsed and expanded', () =>{
        cy.get('.bi-chevron-left').click()
        cy.get('.bi-chevron-right').should('be.visible');
        cy.get('.bi-chevron-right').click()
        cy.get('.bi-chevron-left').should('be.visible');

    })

})
    describe('Profile Menu', () =>{

        it('Profile menu displays all available options', () => {
        cy.get('[class="oxd-userdropdown-name"]').click();
        cy.get('[class="oxd-userdropdown-link"]').should('be.visible').and('contain.text', 'About');
        cy.get('[class="oxd-userdropdown-link"]').should('be.visible').and('contain.text', 'Support');
        cy.get('[class="oxd-userdropdown-link"]').should('be.visible').and('contain.text', 'Change Password');
        cy.get('[class="oxd-userdropdown-link"]').should('be.visible').and('contain.text', 'Logout');
        })

        it('About button is opening correct page', () =>{
            cy.get('[class="oxd-userdropdown-name"]').click();
            cy.contains('.oxd-userdropdown-link', 'About').click();
            cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'About');
            cy.get('.oxd-dialog-close-button-position').click();
        })

        it('Support link opens Support page', () => {
            cy.get('[class="oxd-userdropdown-name"]').click();
            cy.contains('.oxd-userdropdown-link', 'Support').click();
            cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'Getting Started with OrangeHRM');
        })
        
        it('Change Password link opens Update Password page', () => {
            cy.get('[class="oxd-userdropdown-name"]').click();
            cy.contains('.oxd-userdropdown-link', 'Change Password').click();
            cy.get('.orangehrm-main-title').should('be.visible').and('contain.text', 'Update Password');
        })

         it('Logout button is working', () => {
            cy.get('[class="oxd-userdropdown-name"]').click();
            cy.contains('.oxd-userdropdown-link', 'Logout').click();
            cy.get('.orangehrm-login-title').should('be.visible').and('contain.text', 'Login');
        })
    })      
    
})

