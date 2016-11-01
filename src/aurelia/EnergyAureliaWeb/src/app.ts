import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia Energy';
    config.map([
      // http://stackoverflow.com/questions/40348535/organize-by-folder-in-aurelia
      { route: ['', 'energy'], name: 'energy', moduleId: 'energy/energy', nav: true, title: 'Energy' }
    ]);

    this.router = router;
  }
}
