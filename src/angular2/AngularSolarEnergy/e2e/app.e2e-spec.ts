import { AngularSolarEnergyPage } from './app.po';

describe('angular-solar-energy App', function() {
  let page: AngularSolarEnergyPage;

  beforeEach(() => {
    page = new AngularSolarEnergyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
