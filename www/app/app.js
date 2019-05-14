

$(function() {
	console.log("App Load Time: ", ((Date.now() - appTimerStart) + 1800) / 1000, ' Secs');
});

function initApp() {
	console.log("App Finish Time: ", ((Date.now() - appTimerStart) + 1800) / 1000, ' Secs');

	loadTrelloCreds(function() {
		loadPage('#home');
	});
}

function reinitApp() {

}

function pageLoaded(pageRef, loadType) {
	closeNav();


}

function loadTrelloCreds(callback) {
	userProfile();
	setboardName();

	listBoards(function() {
		callback();
	});
}

function showLoader(divID) {
    $(divID).html("<div style='text-align:center;width: 100%;margin-top:100px;'><span class='fa fa-spinner fa-2x fa-spin'></span></div>");
}
function hideLoader(divID) {
    $(divID).html("<div style='text-align:center;width: 100%;margin-top:100px;display: none;'><span class='fa fa-spinner fa-2x fa-spin'></span></div>");
}