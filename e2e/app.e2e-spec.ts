import { KekPage } from './app.po';

describe('kek App', () => {
  let page: KekPage;

  beforeEach(() => {
    page = new KekPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
