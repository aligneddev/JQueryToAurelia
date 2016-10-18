/**
 * Interact with the API on the server.
 */
function dataApi() {

}

dataApi.prototype.yearOptions = [];

/**
 * Get the year options.
 */
dataApi.prototype.getYearOptions = function () {
    var _this = this;
    if(this.yearOptions.length > 0){
        // jQuery 2.2.3's way of deferreds and promises
        // browsers will have native implementation: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
        // that will vary from this approach
        return $.Deferred().result(this.yearOptions);
    }

    // return the promise
    return $.getJSON('/api/energy/yearOptions').then(function(options){
        // let's cache the results, it doesn't help in the current setup (we only load it once), but would help if multiple pages or other imagined scenarios
        // this shows the usefullness of a dataApi class, using promises, and a caching option.
        _this.yearOptions = options;
        return options;
    });
}

/**
 * Get the energy data from the API.
 */
dataApi.prototype.getEnergyData = function (option) {
    return $.getJSON('/api/energy/solar?year=' + option);
}