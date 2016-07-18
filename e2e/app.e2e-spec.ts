import { AngularSimplePage } from './app.po';

describe('angular-simple App', function() {
  let page: AngularSimplePage;

  beforeEach(() => {
    page = new AngularSimplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
