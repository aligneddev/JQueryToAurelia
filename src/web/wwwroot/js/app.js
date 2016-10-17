
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
        $.each(data, function (key, item) {
            $('#dataTable > tbody:last-child').append('<tr>'
                + '<td>' + item.countryId + '</td>'
                + '<td>' + item.countryName + '</td>'
                + '<td>' + item.quantity + '</td>');
        });

        // row details click event
        _this.setupRowDetails(rowSelector, data);
        _this.hideLoading();
    });
};

app.prototype.setupRowDetails = function (rowSelector, data) {
    var _this = this;
    $(rowSelector).on('click', function () {
        var details = $(this);
        var countryId = $(details[0].cells[0]).text();

        // find the country
        var match = _this.findCountry(data, countryId);

        // put the information into the Bootstrap modal
        var ul = $('#detailsModal #details');
        ul.empty();
        ul.append('<li>' + match.countryId + '</li>');
        ul.append('<li>' + match.countryName + '</li>');
        ul.append('<li>' + match.quantity + '</li>');
        ul.append('<li>' + match.year + '</li>');
        ul.append('<li>' + match.commodityTransactionName + '</li>');
        $('#detailsModal').modal('show');
    });
}

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