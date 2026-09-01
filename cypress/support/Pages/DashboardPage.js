class DashboardPage {

    widget(widgetName) {
        return cy.contains('.oxd-text--p', widgetName)
    }

    timeAtWorkButton() {
        return cy.get('.orangehrm-attendance-card-action')
    }

    dashboardTitle() {
        return cy.get('.oxd-topbar-header-breadcrumb-module')
    }

    openTimeAtWork() {
        this.timeAtWorkButton().click()
    }
}

export default new DashboardPage()