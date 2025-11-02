const data = require('../fixtures/example.json');

describe('name from the admin panel', () => {
	it('ticket booking', () => {
		const user = data.users.happy;
		const seats = data.seats;
		const selectors = data.selectors2;

		cy.openAdminPage();
		cy.get(selectors.emailInput).type(user.email);
		cy.get(selectors.passwordInput).type(user.password);
		cy.get(selectors.loginButton).click();

		cy.get(selectors.confStepMovie)
			.contains(selectors.confStepMovieTitle, 'Ведьмак')
			.invoke('text')
			.then((filmNameFromAdmin) => {
				cy.visit('https://qamid.tmweb.ru/client/index.php');

				cy.get(selectors.movie)
					.contains(selectors.movieTitle, filmNameFromAdmin)
					.invoke('text')
					.then((filmNameFromSite) => {
						expect(filmNameFromSite.trim()).to.equal(filmNameFromAdmin.trim());

						cy.get(selectors.pageNavDay).click();

						cy.get('.movie').contains(selectors.timeSlot).click();

						seats.forEach((seat) => {
							const seatSelector = selectors.buyingSchemeRow
								.replace('{row}', seat.row)
								.replace('{seat}', seat.seat);
							cy.get(seatSelector).should('be.visible').click();
						});

						cy.get(selectors.acceptButton).click();
						cy.contains(selectors.successMessage).should('be.visible');
					});
			});
	});
});
  