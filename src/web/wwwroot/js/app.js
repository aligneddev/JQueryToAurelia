/**
 * The main startup interface for the OOP page.
 */
function app(dataApi) {
    this.dataApi = dataApi;
}

app.prototype.initialize = function () {
    var _this = this;
    var yearOptionsPromise = this.dataApi.getYearOptions().then(function (options) {
        _this.fillYearOptions(options);
    });

    var fillTablePromise = this.getAndBuildTable('all');
    return $.when(yearOptionsPromise, fillTablePromise);
};

app.prototype.fillYearOptions = function (options) {
    var _this = this;
    var select = $("#yearSelect");
    $.each(options, function (val, text) {
        select.append(new Option(text, val));
    });

    _this.setupYearOptionSelect(select);
};

app.prototype.setupYearOptionSelect = function (select) {
    var _this = this;
    select.on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var select = optionSelected.text();

        // update based on the selection
        _this.getAndBuildTable(select);
    });
};

app.prototype.getAndBuildTable = function (option) {
    var _this = this;
    var rowSelector = '#dataTable tbody tr';

    // get the data
    this.showLoading();
    return this.dataApi.getEnergyData(option).then(function (data) {
        $('#unit').text(data[0].unit);
        $(rowSelector).remove().end();
        _this.fillTableWithData(data);

        // row details click event
        _this.setupRowDetails(rowSelector, data);
        _this.hideLoading();
    });
};

app.prototype.fillTableWithData = function(data){
    $.each(data, function (key, item) {
            $('#dataTable > tbody:last-child').append('<tr>'
                + '<td>' + item.countryId + '</td>'
                + '<td>' + item.countryName + '</td>'
                + '<td>' + item.quantity + '</td>');
        });
};

app.prototype.setupRowDetails = function (rowSelector, data) {
    var _this = this;
    $(rowSelector).on('click', function () {
        var details = $(this);
        var countryId = $(details[0].cells[0]).text();
        _this.showDetails(data, countryId);
    });
}

app.prototype.showDetails = function (data, countryId) {
    // find the country
    var match = this.findCountry(data, countryId);

    // put the information into the Bootstrap modal
    var ul = $('#detailsModal #details');
    ul.empty();
    this.fillDetails(ul, match);
    $('#detailsModal').modal('show');
};

app.prototype.fillDetails = function(ul, country){
    ul.append('<li>' + country.countryId + '</li>');
    ul.append('<li>' + country.countryName + '</li>');
    ul.append('<li>' + country.quantity + '</li>');
    ul.append('<li>' + country.year + '</li>');
    ul.append('<li>' + country.commodityTransactionName + '</li>');
};

app.prototype.findCountry = function (data, countryId) {
    return data.filter((item) => {
        return item.countryId.toString() === countryId.toString();
    })[0];
};

app.prototype.showLoading = function () {
    $("#loadingIndicator").show();
};

app.prototype.hideLoading = function () {
    window.setTimeout(function () {
        $("#loadingIndicator").fadeOut();
    }, 500);
};