const data = require('../fixtures/example.json');

describe('home page', () => {
    beforeEach(() => {
        cy.openHomePage();
    });

    it('page title', () => {
        cy.get(data.homePage.pageTitle).should('be.visible');
    });

    it('movie display', () => {
        cy.get(data.homePage.movieTitles).should('have.length.greaterThan', 0);
        for (const title of ['Сталкер(1979)', 'Ведьмак', 'Законопослушный гражданин']) {
            cy.checkMovieVisibility(title, data.homePage.movieTitles, '.movie__title');
        }
    });

    it('Show correct number of days', () => {
        cy.get(data.homePage.dayNavigation).should('have.length', 7);
    });
});