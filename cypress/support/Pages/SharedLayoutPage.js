class SharedLayoutPage {

    clientBrandBanner() {
        return cy.get('[alt="client brand banner"]')
    }

    searchInput() {
        return cy.get('[placeholder="Search"]')
    }

    menuItem(name) {
        return cy.contains('.oxd-main-menu-item--name', name)
    }

    pageTitle() {
        return cy.get('.oxd-topbar-header-breadcrumb-module')
    }

    mainTitle() {
        return cy.get('.orangehrm-main-title')
    }

    collapseButton() {
        return cy.get('.bi-chevron-left')
    }

    expandButton() {
        return cy.get('.bi-chevron-right')
    }

    upgradeButton() {
        return cy.get('.orangehrm-upgrade-button')
    }

    profileButton() {
        return cy.get('.oxd-userdropdown-name')
    }

    profileOption(optionName) {
        return cy.contains('.oxd-userdropdown-link', optionName)
    }

    profileOptions() {
        return cy.get('.oxd-userdropdown-link')
    }

    aboutDialogCloseButton() {
        return cy.get('.oxd-dialog-close-button-position')
    }

    maintenanceAccessTitle() {
        return cy.get('.orangehrm-admin-access-title')
    }


    openMenuItem(name) {
        this.menuItem(name).click()
    }

    searchMenu(text) {
        this.searchInput().type(text)
    }

    collapseSidebar() {
        this.collapseButton().click()
    }

    expandSidebar() {
        this.expandButton().click()
    }

    openProfileMenu() {
        this.profileButton().click()
    }

    openProfileOption(optionName) {
        this.profileOption(optionName).click()
    }
}

export default new SharedLayoutPage()