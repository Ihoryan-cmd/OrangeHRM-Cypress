# OrangeHRM Cypress Test Automation

## Overview

This project is an end-to-end test automation framework for the OrangeHRM web application using Cypress.

The project was created to practice UI test automation, test design, Page Object Model implementation, data-driven testing, and validation of common user workflows.

## Tech Stack

- Cypress 15
- JavaScript
- Node.js
- Page Object Model (POM)
- JSON fixtures
- Git / GitHub

## Test Coverage

The project currently covers the following areas of OrangeHRM:

### Login

- Login page UI validation
- Valid login
- Invalid username
- Invalid password
- Required field validation
- Password field validation
- Forgot Password navigation
- Back to Login navigation

### Dashboard

- Dashboard page validation
- Dashboard widgets visibility
- Time at Work navigation

### Shared Layout

- Sidebar menu visibility
- Sidebar navigation
- Menu search
- Sidebar collapse and expand
- Profile menu options
- About dialog
- Support page navigation
- Change Password navigation
- Logout

### Add Employee

- Page load and initial state
- Employee creation with required fields
- Employee creation with all fields
- Employee photo upload
- Required field validation
- Duplicate Employee ID validation
- Maximum field length validation
- Create Login Details
- Username validation
- Duplicate username validation
- Password validation
- Confirm Password validation

### Employee List

- Page load and initial state
- Search by Employee Name
- Search by Employee ID
- Search for non-existing employee
- Reset filters
- Table headers validation
- Edit employee
- Delete employee
- Cancel employee deletion

## Project Structure

```text
cypress/
├── e2e/
│   ├── pimPage/
│   │   ├── AddEmployeePage/
│   │   │   └── AddEmployee.cy.js
│   │   └── EmployeeList/
│   │       └── EmployeeList.cy.js
│   ├── DashboardPage.cy.js
│   ├── login.cy.js
│   └── SharedLayout.cy.js
│
├── fixtures/
│   ├── employeeData.json
│   ├── employeePhoto.jpg
│   └── loginData.json
│
└── support/
    ├── Pages/
    │   ├── AddEmployeePage.js
    │   ├── DashboardPage.js
    │   ├── EmployeeList.js
    │   ├── LoginPage.js
    │   └── SharedLayoutPage.js
    ├── commands.js
    └── e2e.js
```

## Test Design

The project uses the Page Object Model to separate element locators from test scenarios.

Tests include:

- Positive scenarios
- Negative scenarios
- Validation testing
- Boundary testing
- Data-driven testing using JSON fixtures
- Dynamic test data to reduce conflicts between repeated test runs

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- OrangeHRM running locally

The current Cypress configuration uses:

```text
http://localhost:8081
```

as the application base URL.

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Environment Configuration

Create a file named:

```text
cypress.env.json
```

in the root directory of the project.

Add your OrangeHRM credentials:

```json
{
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD"
}
```

The `cypress.env.json` file is excluded from Git using `.gitignore` and should not be committed to the repository.

## Running Tests

Open Cypress Test Runner:

```bash
npm run cy:open
```

Run all tests in headless mode:

```bash
npm run cy:run
```

You can also use:

```bash
npm test
```

to run the test suite.

## Notes

The application is running locally, so OrangeHRM must be available before executing the tests.

Some test scenarios create employees dynamically to keep the tests independent and reduce conflicts caused by duplicate test data.

## Author

QA Automation practice project created as part of hands-on Cypress and test automation learning.