/**
 * Interact with the API on the server.
 */
function dataApi() {

}

/**
 * Get the year options.
 */
dataApi.prototype.getYearOptions = function () {
    // return the promise
    return $.getJSON('/api/energy/yearOptions');
}

/**
 * Get the energy data from the API.
 */
dataApi.prototype.getEnergyData = function (option) {
    return $.getJSON('/api/energy/solar?year=' + option);
}