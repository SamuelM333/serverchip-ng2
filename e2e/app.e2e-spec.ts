import { ServerchipWebAppPage } from './app.po';

describe('serverchip-web-app App', function() {
  let page: ServerchipWebAppPage;

  beforeEach(() => {
    page = new ServerchipWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
