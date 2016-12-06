# Solar Energy project implemented in Angular 2.0

## Getting Started

I'm using Angular 2.0 and the latest [Angular CLI](https://cli.angular.io/). I used Visual Studio Code for my editor, but any text editor or IDE should work.

`npm install -g angular-cli@latest`
I created the project using `ng new`.

### Run the site

To run the project `ng serve --watch`. This will watch for file changes and reload the browser with BrowserSync.
I saw `** NG Live Development Server is running on http://localhost:4200. **` in the console and things are working.
It took 4.83 seconds to get things running.
After saving, it takes about 2 to 5 seconds for the webpack build and the browser sync reload to complete. I wonder what this will be for a large TS project...

`ng serve --prod` to serve 'minified'.
3 bundles in js files, inline, styles, main with cache busting int the name. There is about 210Kb of JavaScript.
3 files, but 2.6 MB.

The CLI project is using [webpack](https://webpack.github.io/).

### Create a component

`ng g component energy`
this creates a folder `energy` with the component, spec, html and css files. It also sets it up in the app.module.

### http

[HTTP with Promises](https://angular.io/docs/ts/latest/tutorial/toh-pt6.html)

I [simulated the WebApi](https://angular.io/docs/ts/latest/tutorial/toh-pt6.html) (search for app.module.ts (v2) in this page) so I wouldn't have to bring in Asp.Net to this project.
return {yearOptions, solar} corresponds with the api/yearOptions and api/solar? in the energy-data.service.ts
[more on in-mem-web-api](https://angular.io/docs/ts/latest/guide/server-communication.html#!#in-mem-web-api).
[another example](https://github.com/angular/in-memory-web-api/blob/master/examples/hero-data.service.ts)

However, I then changed it just to grab the json from the energy-data.service.ts.

### energy data row

I considered a component for each row (as I did in Aurelia with the EnergyDataRowViewModel and template.html), but (click) on the tr should work fine.
I will consider changing the Aurelia approach, but that was done to show the templating/component feature in that project.

## Dependency Injection with Interfaces

[It's possible with an Opaque Token](https://angular.io/docs/ts/latest/guide/dependency-injection.html#!#opaquetoken)

Example is the IEnergyDataService that the EnergyDataService and EnergyDataJsonService. I want to be able to switch between JSON, api calling one, or a test data service in the app.module.ts or in a spec.
See the energy/energy-data-service.token.ts for my attempt

    `import { OpaqueToken } from '@angular/core';
     export let IEnergyDataServiceToken = new OpaqueToken('./energy-data-service.interface');`

app.module.ts has

    `import EnergyDataJsonService from './energy/energy-data-json.service';
     import {IEnergyDataServiceToken} from './energy/energy-data-service.token';
     ....
     providers: [{ provide: IEnergyDataServiceToken, useClass: EnergyDataJsonService }]`

and energy/energy.component.ts gets the token injected

    `import {IEnergyDataService} from './energy-data-service.interface';
     import {IEnergyDataServiceToken} from './energy-data-service.token';
     ...
     constructor(@Inject(IEnergyDataServiceToken) private energyDataService: IEnergyDataService, private router: Router) {}`

## external libraries

Bringing in BootStrap
Using the [ng-BootStrap](https://ng-bootstrap.github.io/#/getting-started).
[StackOverflow help](http://stackoverflow.com/questions/38413044/how-to-add-ng-bootstrap-to-an-angular-cli-broccoli-version-project)
`npm install --save @ng-bootstrap/ng-bootstrap`

in angular-cli.json
and `"../node_modules/bootstrap/dist/css/bootstrap.css"` to styles
others can be placed in the [angular-cli.json scripts array](http://blog.dmbcllc.com/adding-css-and-javascript-to-an-angular-2-cli-project/) or [docs](https://github.com/angular/angular-cli#global-library-installation).

// this caused me this grief, that is still there [my reported issue](https://github.com/ng-bootstrap/ng-bootstrap/issues/1104) and [on SO](http://stackoverflow.com/questions/40915311/angular-2-2-and-ng-bootstrap-cannot-read-property-observable-of-undefined)

`VM35625:9 Uncaught TypeError: Cannot read property 'Observable' of undefined(…)webpackUniversalModuleDefinition @ VM35625:9(anonymous function) @ VM35625:10module.exports @ scripts.bundle.js:28369 @ scripts.bundle.js:6__webpack_require__ @ inline.bundle.js:53694 @ scripts.bundle.js:37__webpack_require__ @ inline.bundle.js:53webpackJsonpCallback @ inline.bundle.js:24(anonymous function) @ scripts.bundle.js:1
main.bundle.js:417`

that I was unable to get around until an answer came on the StackOverflow question.
[Here's my write-up](http://aligneddev.net/blog/2016/Ng-Bootstrap-with-Angular-CLI/) on the setup.

## Routing for Master Details

clicking on the row will navigate to the details view using the router.
[docs on Routing](https://angular.io/docs/ts/latest/tutorial/toh-pt5.html)
[docs on Master/Details in the same page](https://angular.io/docs/ts/latest/tutorial/toh-pt2.html)

* "Note how the switchMap operator maps the id in the observable route parameters to a new Observable, the result of the HeroService.getHero method.
 If the user re-navigates to this component while a getHero request is still inflight, switchMap cancels that old request before calling HeroService.getHero again."
* "The hero id is a number. Route parameters are always strings. So we convert the route parameter value to a number with the JavaScript (+) operator."

## Tools

[Chrome Extension](https://augury.angular.io/guides/)

## Testing

[Testing docs](https://angular.io/docs/ts/latest/guide/testing.html)

`ng test` run Karma tests
`ng e2e` via Protractor (Selenium)

The first commit with tests passing is 'Both tests are passing! - energy.component configured correctly to run' aa25b9b.

I like having the spec files next to the component code.

This seems really complicated with testing coupled to the html of the component, but can allow for testing of the binding and clicks in unit tests.

from the default energy.component.spec.ts created by the CLI
`Chrome 54.0.2840 (Windows 7 0.0.0) EnergyComponent should create FAILED
        Can't bind to 'ngModel' since it isn't a known property of 'select'. ("
        </div>
        <div class="row">`

app/testing/router-stubs.ts copied from [the Plunker](https://angular.io/resources/live-examples/testing/ts/app-specs.plnkr.html) [in the testing guide](https://angular.io/docs/ts/latest/guide/testing.html#!#sample-app)

* stub the router-outlet and others in the router-stubs.ts and override in app.component.spec.ts
  * with `TestBed.configureTestingModule({ declarations: [`

'Error: No provider for Http!' => add to the `TestBed.configureTestingModule({ imports: [HttpModule]`

### Testing EnergyDataService

Fake the HttpModule

* use the `@angular/http/testing` and import MockBackend and MockConnection
* see energy-data.service.spec.ts. I learned from http-hero.service.spec.ts [go to the plunker and download the zip](https://angular.io/docs/ts/latest/guide/testing.html#!#top)

### Types of tests to write

My Thoughts

* unit tests against the ts file using `var component = new MyComponent();`
* unit tests with the DOM involved using `TestBed.configureTestingModule({` and
    `let fixture = TestBed.createComponent(AppComponent);
     let app = fixture.debugElement.componentInstance;`
  * This might be a good way to get the [testing pyramid](http://martinfowler.com/bliki/TestPyramid.html) (most unit tests, some integration/service, least UI)
* End to End (e2e) tests using Protractor to run through the UI itself
  * you could use Selenium through C# instead
  * when are the unit tests with the DOM enough?

[Three Ways to Test Angular 2](https://vsavkin.com/three-ways-to-test-angular-2-components-dcea8e90bd8d#.z0725oe1e)
Notes:
From the image at the top.

* Isolated tests
  * no rendering
  * same as ny other JS Object
  * Mock all dependencies
* Shallow tests
  * Isolated Tests++
  * Render the Template without the Children
  * using `TestBed.configureTestingModule(` and `TestBed.createComponent(ConversationsCmp);`
* Integration Tests
  * Render Components
  * Check Components
  * Only Mock Browser Capabilities

Other Resources:

* [Angular2 (2.0.0-beta.13 so things have changed :-()) TDD in ES6](https://www.youtube.com/watch?v=2u7mHBCCSQ4)
* [Testing Strategies with Angular 2](https://youtu.be/f493Xf0F2yU) from Angular Connect 10/01/2016
* [A Test-Driven Development Introduction to Angular 2](https://keyholesoftware.com/2016/05/16/test-driven-intro-angular2/)  2016-05-16 (beta)
* [Testing Angular 2 in 15min](https://youtu.be/bR7JbyjT8ZM) 2016-10-21
* [Testing all your Tasks - Julie Ralph](https://youtu.be/DltUEDy7ItY?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j) 2016-05-04
* [Testing Angular 2.0.x Services and Http with Jasmine and Karma](http://chariotsolutions.com/blog/post/testing-angular-2-0-x-services-http-jasmine-karma/)
* [Angular 2 — Testing Guide](https://medium.com/google-developer-experts/angular-2-testing-guide-a485b6cb1ef0#.44er2v45r)
* [Vikram Subramanian (@vikerman): Unit Tests for Angular 2 Applications at ng-europe 2016](https://youtu.be/dVtDnvTLaIo) - October 29, 2016
* [Assert the urls in the service](http://stackoverflow.com/questions/40977555/unit-test-and-assert-http-get-querystring-call-in-angular2/40978432#40978432)

## Angular 2 Observations

* save to running in browser is 2 to 5 seconds on this very small app, sometimes up to 10 seconds
* Testing looks very deep with options to test the HTML binding and clicks without Automated UI tests
  * 4+ hours later I still don't have a handle on it
* debugging in Chrome gets clunky with webpack's giant main.bundle.js (1.6mb of RAM at one point)

## Forms Example

As a user
I want to be able to keep Notes on my observations
So that I can analyze better

These will only be stored in memorgy and not persist for this demo.

[Angular Docs](https://angular.io/docs/ts/latest/cookbook/form-validation.html)
Template-driven forms can't have isolated unit tests. See the "Testing Considerations" at the bottom of the page. "While not difficult, this takes more time, work and skill". If I had seen that earlier, I may have done the reactive forms approach instead.

## Ahead of Time Compilation

I need to learn more about this option [Docs on Aot](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html). This probably happens with `ng build`.

## This was copied from CLI generated Readme

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).