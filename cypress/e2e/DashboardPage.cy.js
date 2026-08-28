import LoginPage from '../support/Pages/LoginPage'
import DashboardPage from '../support/Pages/DashboardPage'
import SharedLayoutPage from '../support/Pages/SharedLayoutPage'

describe('Dashboard Page', () => {

    beforeEach(() => {
        cy.visit('/')

        LoginPage.logo()
            .should('be.visible')

        cy.env(['username', 'password']).then(({ username, password }) => {
            LoginPage.login(username, password)
        })
    })


    it('Verify this really is Dashboard', () => {

        cy.url().should('include', '/dashboard')

        SharedLayoutPage.pageTitle()
            .should('be.visible')
            .and('contain.text', 'Dashboard')
    })


    it('Verify all Dashboard widgets are visible', () => {

        const widgets = [
            'Time at Work',
            'My Actions',
            'Quick Launch',
            'Buzz Latest Posts',
            'Employees on Leave Today',
            'Employee Distribution by Sub Unit',
            'Employee Distribution by Location'
        ]

        widgets.forEach((widget) => {
            DashboardPage.widget(widget)
                .should('be.visible')
        })
    })


    it('Time at Work button navigates to Attendance page', () => {

        DashboardPage.openTimeAtWork()

        cy.url().should('include', '/attendance')

        SharedLayoutPage.pageTitle()
            .should('be.visible')
            .and('contain.text', 'Attendance')
    })
})