class DashboardPage {

    widget(widgetName) {
        return cy.contains('.oxd-text--p', widgetName)
    }

    timeAtWorkButton() {
        return cy.get('.orangehrm-attendance-card-action')
    }

    openTimeAtWork() {
        this.timeAtWorkButton().click()
    }

    dashboardTitle(){
        return cy.get('.oxd-topbar-header-breadcrumb-module').should('contain.text', 'Dashboard');
    }
}

export default new DashboardPage()