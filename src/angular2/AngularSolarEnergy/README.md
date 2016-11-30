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
https://github.com/angular/in-memory-web-api/blob/master/examples/hero-data.service.ts

However, I then changed it just to grab the json from the energy-data.service.ts.

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