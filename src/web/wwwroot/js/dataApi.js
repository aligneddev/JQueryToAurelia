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
    return  $.getJSON('/api/energy/yearOptions');
}