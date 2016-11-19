import { App } from '../../src/app';
import RouterFake from './routerFake';

describe('the App module', () => {
  var sut, mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterFake();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Aurelia Energy');
  });

  it('should have a energy route', () => {
    expect(sut.router.routes).toContain(
      { route: ['', 'energy'], name: 'energy', moduleId: 'energy/energy', nav: true, title: 'Energy' });
  });
});
