const _AUTH = {
	isLoggedIn: function() {
		if (getUserSettings("USERKEY-TOKEN") == null) {
			return false;
		} else {
			return true;
		}
	},

	validate: function() {

	},
	doLogin: function() {

	},
	generateToken: function() {

	},
	doLogout: function(gotoPage) {
		if (appConfig.DEBUG) console.warn("Logout Direct Called");

		if (gotoPage == null || gotoPage.length <= 0) gotoPage = appConfig.PAGEHOME;

		if (window.plugins != null) {
			if (window.plugins.googleplus != null) window.plugins.googleplus.logout()
		}

		lang = getUserSettings("APP-LANG");
		window.localStorage.clear();
		setUserSettings("APP-LANG", lang);

		$.getJSON("app.json", function(data) {
			appConfig = data;
			reloadAppCore(gotoPage);
		});
	},
	getUserToken: function() {
		return getUserSettings("USERKEY-AUTH");
	}
}