import LoginPage from '../support/Pages/LoginPage'
import SharedLayoutPage from '../support/Pages/SharedLayoutPage'

describe('Shared Layout', () => {

    beforeEach(() => {
        cy.visit('/')

        LoginPage.orangeHrmLogo()
            .should('be.visible')

        cy.env(['username', 'password']).then(({ username, password }) => {
            cy.login(username, password)
        })
    })


    describe('Shared Elements', () => {

        it('Shared layout elements are visible', () => {

            SharedLayoutPage.clientBrandBanner().should('be.visible')
            SharedLayoutPage.searchInput().should('be.visible')

            const menuItems = [
                'Admin',
                'PIM',
                'Leave',
                'Time',
                'Recruitment',
                'My Info',
                'Performance',
                'Dashboard',
                'Directory',
                'Maintenance',
                'Claim',
                'Buzz'
            ]

            menuItems.forEach((item) => {
                SharedLayoutPage.menuItem(item)
                    .should('be.visible')
            })

            SharedLayoutPage.collapseButton().should('be.visible')
            SharedLayoutPage.upgradeButton().should('be.visible')
            SharedLayoutPage.profileButton().should('be.visible')
        })
    })


    describe('Sidebar Navigation', () => {

        const navigationPages = [
            {
                name: 'Admin',
                url: '/admin',
                title: 'Admin'
            },
            {
                name: 'PIM',
                url: '/pim',
                title: 'PIM'
            },
            {
                name: 'Leave',
                url: '/leave',
                title: 'Leave'
            },
            {
                name: 'Time',
                url: '/time',
                title: 'Time'
            },
            {
                name: 'Recruitment',
                url: '/recruitment',
                title: 'Recruitment'
            },
            {
                name: 'Performance',
                url: '/performance',
                title: 'Performance'
            },
            {
                name: 'Dashboard',
                url: '/dashboard',
                title: 'Dashboard'
            },
            {
                name: 'Directory',
                url: '/directory',
                title: 'Directory'
            },
            {
                name: 'Claim',
                url: '/claim',
                title: 'Claim'
            },
            {
                name: 'Buzz',
                url: '/buzz',
                title: 'Buzz'
            }
        ]


        navigationPages.forEach((page) => {

            it(`${page.name} link navigates to ${page.name} page`, () => {

                SharedLayoutPage.openMenuItem(page.name)

                cy.url().should('include', page.url)

                SharedLayoutPage.pageTitle()
                    .should('be.visible')
                    .and('contain.text', page.title)
            })
        })


        it('My Info link navigates to My Info page', () => {

            SharedLayoutPage.openMenuItem('My Info')

            cy.url().should('include', '/pim')

            SharedLayoutPage.pageTitle()
                .should('be.visible')
        })


        it('Maintenance link navigates to Maintenance page', () => {

            SharedLayoutPage.openMenuItem('Maintenance')

            cy.url().should('include', '/maintenance')

            SharedLayoutPage.maintenanceAccessTitle()
                .should('be.visible')
                .and('contain.text', 'Administrator Access')
        })


        it('Search field is working properly', () => {

            SharedLayoutPage.searchMenu('Admin')

            SharedLayoutPage.menuItem('Admin')
                .should('be.visible')

            SharedLayoutPage.menuItem('PIM')
                .should('not.exist')
        })


        it('Sidebar can be collapsed and expanded', () => {

            SharedLayoutPage.collapseSidebar()

            SharedLayoutPage.expandButton()
                .should('be.visible')

            SharedLayoutPage.expandSidebar()

            SharedLayoutPage.collapseButton()
                .should('be.visible')
        })
    })


    describe('Profile Menu', () => {

        it('Profile menu displays all available options', () => {

            SharedLayoutPage.openProfileMenu()

            SharedLayoutPage.profileOption('About')
                .should('be.visible')

            SharedLayoutPage.profileOption('Support')
                .should('be.visible')

            SharedLayoutPage.profileOption('Change Password')
                .should('be.visible')

            SharedLayoutPage.profileOption('Logout')
                .should('be.visible')
        })


        it('About button opens correct dialog', () => {

            SharedLayoutPage.openProfileMenu()
            SharedLayoutPage.openProfileOption('About')

            SharedLayoutPage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'About')

            SharedLayoutPage.aboutDialogCloseButton().click()
        })


        it('Support link opens Support page', () => {

            SharedLayoutPage.openProfileMenu()
            SharedLayoutPage.openProfileOption('Support')

            SharedLayoutPage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Getting Started with OrangeHRM')
        })


        it('Change Password link opens Update Password page', () => {

            SharedLayoutPage.openProfileMenu()
            SharedLayoutPage.openProfileOption('Change Password')

            SharedLayoutPage.mainTitle()
                .should('be.visible')
                .and('contain.text', 'Update Password')
        })


        it('Logout button is working', () => {

            SharedLayoutPage.openProfileMenu()
            SharedLayoutPage.openProfileOption('Logout')

            LoginPage.loginTitle()
                .should('be.visible')
                .and('contain.text', 'Login')
        })
    })
})