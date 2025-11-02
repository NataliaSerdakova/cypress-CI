const data = require('../fixtures/example.json');

describe('admin login', () => {
	it('successful login check', () => {
		const user = data.users.happy;
		cy.openAdminPage();

		cy.get(data.selectors.emailInput).type(user.email);
		cy.get(data.selectors.passwordInput).type(user.password);
		cy.get(data.selectors.loginButton).click();

		cy.contains(data.selectors.adminPageTitle).should('be.visible');
	});

	it('check for unsuccessful login', () => {
		const user = data.users.sad;
		cy.openAdminPage();

		cy.get(data.selectors.emailInput).type(user.email);
		cy.get(data.selectors.passwordInput).type(user.password);
		cy.get(data.selectors.loginButton).click();

		cy.contains('body', data.selectors.errorMessage).should('be.visible');
	});
});