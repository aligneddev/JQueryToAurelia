import '/lib/jQuery/dist/jquery.js';

export default class LoadingIndicator {
    public showLoading() {
        $("#loadingIndicator").show();
    };

    public hideLoading() {
        window.setTimeout(function () {
            $("#loadingIndicator").fadeOut();
        }, 500);
    };
}