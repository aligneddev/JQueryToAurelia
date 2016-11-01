import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia Energy';
    config.map([
      { route: ['', 'energy'], name: 'energy', moduleId: 'energy/energy', nav: true, title: 'Energy' }
    ]);

    this.router = router;
  }
}
