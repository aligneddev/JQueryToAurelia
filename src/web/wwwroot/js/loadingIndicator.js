var loadingIndicator = function () {

}
loadingIndicator.prototype.showLoading = function () {
    $("#loadingIndicator").show();
};

loadingIndicator.prototype.hideLoading = function () {
    window.setTimeout(function () {
        $("#loadingIndicator").fadeOut();
    }, 500);
};