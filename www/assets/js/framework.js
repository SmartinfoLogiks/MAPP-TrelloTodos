function loadAppCore() {
	pageHash = window.location.hash;

	registerEventListeners();

	loadPage(pageHash);

	//loadMenus();
	//loadUserinfoBar();

	if (typeof window['initApp'] == "function") initApp();
}

function reloadAppCore(pageRef) {
	cleanWorkspace();
	loadPage(pageRef);
	//loadMenus();
	//loadUserinfoBar();

	reinitApp();
}

function registerEventListeners() {
	$("body").delegate("a.pageLink[href]", "click", function(e) {
		
		href = $(this).attr("href");
		if (href != null && href.length > 1 && href.substr(0, 1) == "#") {
			loadPage(href.substr(1));
			//kanchan script
			//href1 = href.split("/");
			//loadPage(href1[0]);
		}
	});

	$("body").delegate(".actionCmd[cmd],.actionCMD[cmd],.actionIcon[cmd]", "click", function(e) {
		e.preventDefault();

		cmd = $(this).attr("cmd");

		if (window[cmd] != null && typeof window[cmd] == "function") {
			window[cmd](this);
		} else {
			console.info("Command Not Found", cmd);
		}
	});
}

function registerPageEvents() {

}

function cleanWorkspace() {
	$("#mainContainer").html("");
	$("#templates").html("");
}

function loadPage(pageRef, callBack) {
	if (pageRef == null || pageRef.length <= 0) {
		pageRef = appConfig.PAGEHOME;
	}
	if (pageRef.substr(0, 1) == "#") {
		pageRef = pageRef.substr(1);
	}
	if (appConfig.PAGECONFIG.NOHEADER != null && appConfig.PAGECONFIG.NOHEADER.length > 0) {
		if (appConfig.PAGECONFIG.NOHEADER.inArray(pageRef)) {
			$("#topbar").hide();
		} else {
			$("#topbar").show();
		}
	}

	//No Footer Required
	if (appConfig.PAGECONFIG.NOFOOTER != null && appConfig.PAGECONFIG.NOFOOTER.length > 0) {
		if (appConfig.PAGECONFIG.NOFOOTER.inArray(pageRef)) {
			$("#footer").hide();
		} else {
			$("#footer").show();
		}
	}

	//Login Required
	if (appConfig.PAGECONFIG.NOLOGIN != null && appConfig.PAGECONFIG.NOLOGIN.length > 0) {
		if (!appConfig.PAGECONFIG.NOLOGIN.inArray(pageRef)) {
			if (!_AUTH.isLoggedIn()) {
				loadPage("#login");
				lgksToast("Login Required");
				return;
			}
		}
	}
	if (typeof window['trackView'] == "function") trackView("pageview", pageRef.toUpperCase());
	//cleanWorkspace();

	pageRef = pageRef.split("/");

	$.get("app/pages/" + pageRef[0] + ".html", function(html) {
		//Internationalization Of HTML Content
		html = html.replace(/#[a-zA-Z0-9-_,.]+#/gi, htmlContentReplacer);

		//updateTitle(pageRef.toTitle());

		$("body").attr("class", pageRef + "-body app");
		$("#mainContainer").attr("class", pageRef + "-view container-fluid").html(html);

		registerPageEvents();
		//_TRIGGERS.runTriggers('onPagePostload',pageRef);
	}).done(function() {
		pageLoaded(pageRef, "success");
		_TRIGGERS.runTriggers('onPageLoad', pageRef);
	}).fail(function() {
		pageLoaded(pageRef, "error");
		_TRIGGERS.runTriggers('onPageError', pageRef);
	}).always(function() {

		//Update Menu Title
		//Initiate Page Elements
		//Load components
		//Initiate Events

		if (callBack != null) {
			if (typeof callBack == "function") {
				callBack(pageRef);
			} else if (window[callBack] != null && typeof window[callBack] == "function") {
				callBack(pageRef);
			}
		}
	});
}

function loadComponent(compName, callBack) {
	//$.getScript("./app/comps/topbar/index.js", function() {});
	$.get("app/comps/" + compName + "/index.html", function(html) {
		$("#templates").append("<div id='" + compName + "'>" + html + "</div>");

		_TRIGGERS.runTriggers('onComponentLoad', compName);

		if (callBack != null && window[callBack] != null) {
			window[callBack](compName);
		}
	});
}



$(document).on("mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
});