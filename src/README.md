

For my SD Code Camp November 6th, 2016 (http://www.southdakotacodecamp.com/sessions/clean-javascript,4) talk (the link is probably only active until 2017, see text below)
and for [NE Code in May 2017](https://nebraskacode.amegala.com/Sessions).

I've talked to many who complain about JavaScript and don't view it as real development. Web development continues to grow and along with that comes larger JavaScript applications and a never ending flow of new frameworks and tools. Based on my experience this summer with interns (http://geekswithblogs.net/Aligned/archive/2016/08/24/teaching-javascript.aspx) and over the last years of working on a large JavaScript driven application, I've learned that JavaScript code can be readable and maintainable using methodologies that we've adopted in C#, Java etc. SOLID principles, good naming practices and Object Orientated can all be used to create JavaScript applications.

In this talk, I'll start from a jQuery driven UI (grid with filtering) and move through steps to clean up the code. We'll look at OOP, inversion of control approaches, TypeScript, Jasmine (unit testing). Then we'll convert jQuery code into KnockoutJs to see how data-binding tools can help reduce DOM manipulations and simplify code. If there's time we'll touch on RequireJs (module loading) and show the same solution in Aurelia (a framework that does even more for us).

This is a tall order for an hour, so we'll have to move quickly through the code changes, but I think you'll see the benefits of treating JavaScript like a real language.

## Server

- ASP.Net MVC Core
- xunit for tests: https://docs.microsoft.com/en-us/dotnet/articles/core/testing/unit-testing-with-dotnet-test

## Data

Using Data from https://api.datamarket.azure.com/UnitedNations/Energy/ with my free subscription key. I'm storing some in JSON files and then serving them from MVC.

## Key Points

- Client side code doesn't have to be a mess
- Gain speed and reduce bandwidth with bundling and minification
- https://docs.asp.net/en/latest/client-side/bundling-and-minification.htm
- Clean Code matters for productivity
- Reducing Technical Debt

## Recommended resources

https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882
https://cleancoders.com/episode/clean-code-episode-1/view

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

Show a loading indicator for at least 500 ms while loading data


## Aurelia

See my [Aurelia implementation](https://github.com/aligneddev/aureliaEnergyJSServices) using the [JavaScriptServices](https://github.com/aspnet/JavaScriptServices) `dotnet new aurelia` project for the code and [my article](http://www.aligneddev.net/blog/2016/JavaScript-Mess-To-CleanerCode-Step-4/) for more information. 