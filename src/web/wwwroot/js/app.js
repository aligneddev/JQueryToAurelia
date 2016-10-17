
/**
 * The main startup interface for the OOP page.
 */
function app(dataApi){
    this.dataApi = dataApi;
}

app.prototype.initialize = function(){
    return this.dataApi.getYearOptions();
};