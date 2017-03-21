# From JavaScript Mess to Cleaner Code

For my SD Code Camp November 6th, 2016 (http://www.southdakotacodecamp.com/sessions/clean-javascript,4) talk (probably only active until 2017, see text below).

Edit: [Read my series that goes with this code](http://www.aligneddev.net/blog/2016/JavaScript-Mess-To-CleanerCode-Intro-And-Step-1/).

I've talked to many who complain about JavaScript and don't view it as real development. Web development continues to grow and along with that comes larger JavaScript applications and a never ending flow of new frameworks and tools. Based on my experience this summer with interns (http://geekswithblogs.net/Aligned/archive/2016/08/24/teaching-javascript.aspx) and over the last years of working on a large JavaScript driven application, I've learned that JavaScript code can be readable and maintainable using methodologies that we've adopted in C#, Java etc. SOLID principles, good naming practices and Object Orientated can all be used to create JavaScript applications.

In this talk, I'll start from a jQuery driven UI (grid with filtering) and move through steps to clean up the code. We'll look at OOP, inversion of control approaches, TypeScript, Jasmine (unit testing). Then we'll convert jQuery code into KnockoutJs to see how data-binding tools can help reduce DOM manipulations and simplify code. If there's time we'll touch on RequireJs (module loading) and show the same solution in Aurelia (a framework that does even more for us).

This is a tall order for an hour, so we'll have to move quickly through the code changes, but I think you'll see the benefits of treating JavaScript like a real language.

## Get running

 1. Install .Net Core  (.Net Core SDK https://www.microsoft.com/net/core#windows)
 1. Install/update [NodeJs](http://www.nodejs.org)
 1. open up a command prompt,
    1. mkdir c:\git
    1. cd git
    1. git clone https://github.com/aligneddev/JQueryToAurelia
 1. cd src\Web
 1. dotnet restore (your IDE can do this too on build)
 1. npm install
 1. npm install bower -g
    1. installs bower globally
 1. bower install (grab dependencies)
 1. dotnet build
 1. get the TypeScript compiler installed if you don't have it: http://www.typescriptlang.org/

## Server

* ASP.Net MVC Core: http://www.dot.net (install .net core SDK https://www.microsoft.com/net/core#windows)
  * works on Windows/Mac/Linux! with Visual Studio Code or Visual Studio.

## Data

Using Data from https://api.datamarket.azure.com/UnitedNations/Energy/ with my free subscription key. I'm storing some in JSON files and then serving them from MVC.

## Key Points

* Client side code doesn't have to be a mess
* Gain speed and reduce bandwidth with bundling and minification
  * https://docs.asp.net/en/latest/client-side/bundling-and-minification.htm
* Clean Code matters for productivity
* Reducing Technical Debt

## Recommended resources

https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882
https://cleancoders.com/episode/clean-code-episode-1/view
http://aligneddev.net/resources

## Business Requirements

I want to view the solar energy data available from United Nations
So that I can have a more informed view of the world

I need code examples to show the progression of a ball of code into cleaner code

## Technical Requirements

Given I load the page
Then it should show the data in a table

Given I load the page
Then it should default showing all data

Given the data table
When I click on a row
Then it should show the details

Given I select a different year option
Then it should show the new data in the table

Show a loading indicator while loading data


## Step 1 - JQuery in the html

* jQuery branch

## Step 2 - JQuery code moved into objects

* OOP branch

## Step 3 - TypeScript with KnockoutJs

* tsAndKo
 https://code.visualstudio.com/Docs/languages/typescript
 http://knockoutjs.com/documentation/introduction.html

Add in d.ts files from npm npm install --save @types/knockout

* see package.JSON
 tsconfig.json file set to use es2015 modules for import
  -http://www.typescriptlang.org/docs/handbook/tsconfig-json.html

* in .gitignore add wwwroot/js/tsWithKo/*.js and wwwroot/js/tsWithKo/*.js.map to not check in generated files

 running tsc -w in the command line for this project will compile TypeScript whenever you save a .ts change.

if targeting es6 it will only work with newer browsers
  http://kangax.github.io/compat-table/es6/

### Modules

I'm using es6 for my module (see the tsconfig.json)
https://www.typescriptlang.org/docs/handbook/modules.html
http://www.2ality.com/2014/09/es6-modules-final.html
import * as $ from "jquery";

### Promises without jQuery

http://caniuse.com/#search=promise - all but IE and Opera mini (Edge works)

### Fetch (AJax without jQuery)

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

ES6 struggles:

 1. tsconfig.json target to es6 to get the whatwg-fetch d.ts to compile, but then "Uncaught SyntaxError: Unexpected token export" from export default App;
 1. I walked away from fetch
 1. ended up using requirejs instead of es6 modules.


Wanted to use:
use fetch, es6 module, and es6 promises.

I don't recommend the tsWithKo module requireJs approach. Unless I changed it from require and didn't update this README.md


### Bundling, Webpack options

http://www.jbrantly.com/es6-modules-with-typescript-and-webpack/

### templates with KO

could be external, I'm just using the <script type="text/template">
https://github.com/rniemeyer/knockout-amd-helpers
get the html file and place it in the DOm

computed : rowVmToShowDetailsFor
with console.log to see when it computes


## Step 4-1: Aurelia

This was my oportunity to stop just reading about Aurelia to actually building something with it.
src/aurelia/EnergyWebAurelia
started from the http://aurelia.io
https://github.com/aurelia/skeleton-navigation

* I used AspNetCore TypeScript using gulp
* wanted to AspNetCore and webpack for fun, but… https://github.com/aurelia/skeleton-navigation/issues/703

Follow the README there for getting going
jspm install
npm install

gulp build (move from src to dist)
or gulp watch

dotnet restore
dotnet build
should be enough to get it running on http://localhost:5000

## Step 4-2: AngularJS 2.0

## Step 6-2: ReactJs/Flux/Redux (someday)

[Scott has done a version of this in React and Redux](https://github.com/ComradeCow/solar-energy-react-demo)

## Step 7: Aurelia with https://github.com/aspnet/JavaScriptServices/
