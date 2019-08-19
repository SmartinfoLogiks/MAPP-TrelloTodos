var boardIDArr = null;
var boardNameArr = null;
var  i= "";
Handlebars.registerHelper('if', function(conditional, options) {
	if (conditional) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});
Handlebars.registerHelper('datesubstr', function(due) {
	if (due == null || due == "") {
		return "";
	} else {
		var res = due.substring(0, 10);
		var dateformat = new Date(res);
		var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
		var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var dd = dateformat.getDate();
		var yyyy = dateformat.getFullYear();
		var mon = months[dateformat.getMonth()];
		var day = days[dateformat.getDay()];
		var d = day + ", " + " " + dd + " " + mon + " " + yyyy;
		return d;
	}
});

Handlebars.registerHelper('attachments', function(badges) {
var attachment = badges.attachments;
return attachment;
});

Handlebars.registerHelper('comments', function(badges) {
var comments = badges.comments;
return comments;
});

Handlebars.registerHelper('checkItemsChecked', function(badges) {
var checkItemsChecked = badges.checkItemsChecked;
return checkItemsChecked;
});

Handlebars.registerHelper('checkItems', function(badges) {
var checkItems = badges.checkItems;
return checkItems;
});

Handlebars.registerHelper('truncateString', function(name) {
	if (name.length>50) {
	return name.substr(0, 50) +"...";
	} else {
	return name.substr(0, 50);
		
	}
});

Handlebars.registerHelper('color', function(labels) {
var html ="";
for (i = 0; i < labels.length; i++) {
  
  if(labels[i].color=='green'){
  	if (labels[i].name.length>8) {
  		html+="<span class='greenColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
		html+="<span class='greenColor'>"+labels[i].name+"</span>";
		
	}
  } else if(labels[i].color=='yellow') {
  	if (labels[i].name.length>8) {
  		html+="<span class='yellowColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
		html+="<span class='yellowColor'>"+labels[i].name+"</span>";
		
	}
  
  } else if(labels[i].color=='purple'){
  	if (labels[i].name.length>8) {
  		html+="<span class='lavenderColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
  		html+="<span class='lavenderColor'>"+labels[i].name+"</span>";
  	}
  } else if(labels[i].color=='blue'){
  	if (labels[i].name.length>8) {
  		html+="<span class='darkblueColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
  		html+="<span class='darkblueColor'>"+labels[i].name+"</span>";
  	}
  } else if(labels[i].color=='orange'){
  	if (labels[i].name.length>8) {
  		html+="<span class='orangeColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
  		html+="<span class='orangeColor'>"+labels[i].name+"</span>";
  	}
  	
  } else if(labels[i].color=='red'){
  	if (labels[i].name.length>8) {
  		html+="<span class='redColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
  		html+="<span class='redColor'>"+labels[i].name+"</span>";
  	}
  } else if(labels[i].color=='lime'){
  	if (labels[i].name.length>8) {
  		html+="<span class='limeColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
  		html+="<span class='limeColor'>"+labels[i].name+"</span>";
  	}
  	
  } else if(labels[i].color=='sky'){
  	if (labels[i].name.length>8) {
  		html+="<span class='skyblueColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
  		html+="<span class='skyblueColor'>"+labels[i].name+"</span>";
  	}
  	
  } else if(labels[i].color=='black'){
  	if (labels[i].name.length>8) {
  		html+="<span class='greyColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
  		html+="<span class='greyColor'>"+labels[i].name+"</span>";
  	}
  	
  } else if(labels[i].color=='pink'){
  		if (labels[i].name.length>8) {
  		html+="<span class='pinkColor'>"+labels[i].name.substr(0,8)+"..</span>";
  	} else {
  		html+="<span class='pinkColor'>"+labels[i].name+"</span>";
  	}
  }
}

return html;

});


function listBoards(callback) {
	var key = appConfig.TRELLOAPIKEY;
	var token = getUserSettings("USERKEY-TOKEN");
	$.ajax({
		url: "https://api.trello.com/1/members/me/?boards=open&key=" + key + "&token=" + token,
		success: function(result) {
			var theTemplateScript = $("#board-list").html();
			var theTemplate = Handlebars.compile(theTemplateScript);
			var arr = {
				Data: result.boards
			};

			setUserSettings("BOARD_DATA", arr);
			var theCompiledHtml = theTemplate(arr);
			$('#listBoard').html(theCompiledHtml);

			boardData = arr;
			boardIDArr = jsonPath(boardData, "$.Data[*].id");
			boardNameArr = jsonPath(boardData, "$.Data[*].name");

			if (callback != null) callback();
		
		}
	});
}

function userProfile() {
	var key = appConfig.TRELLOAPIKEY;
	var token = getUserSettings("USERKEY-TOKEN");
	
	var urlval = "https://api.trello.com/1/members/me?boardBackgrounds=none&boardsInvited_fields=name%2Cclosed%2CidOrganization%2Cpinned&boardStars=false&cards=none&customBoardBackgrounds=none&customEmoji=none&customStickers=none&fields=all&organizations=none&organization_fields=all&organization_paid_account=false&organizationsInvited=none&organizationsInvited_fields=all&paid_account=false&savedSearches=false&tokens=none&key=" + key + "&token=" + token;

	$.ajax({
		url: urlval,
		success: function(result) {
		
			var avatar = result.avatarUrl;
			if(avatar==null){
				var avatarurl = "app/media/images/default-avatar.png";
			} else {
				var avatarurl = avatar+"/50.png";
			}
		
			$("#userpic").attr("src", avatarurl);
			$("#fullname").text(result.fullName);
			$("#email").text(result.email);
			setUserSettings('USER_ID',result.email);
	
		},
		error: function(result) {
			
			if(result.responseText=="invalid token"){
				lgksToast("Please enter a valid token");
				setUserSettings("USERKEY-TOKEN","");
				loadPage("#login");
			}
		}
	});
}

function setboardName() {
	var Boardname = getUserSettings("BOARD_NAME");
	var Boarddate = getUserSettings("BOARD_DATE");
	$("#headerTexts").text(Boardname);
	$("#headerTextss").text(Boardname);
}

function logoutDirect(pageRef) {
	_AUTH.doLogout(pageRef);
}


// --sidenav---

function openNav() {
	//document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("mySidenav").style.left = "0%";
}

function closeNav() {
	//document.getElementById("mySidenav").style.width = "0";
	document.getElementById("mySidenav").style.left = "-100%";
}

// --bottom-popup---

function openBottom() {
	document.getElementById("myNav").style.height = "80px";
}

function closBottom() {
	document.getElementById("myNav").style.height = "0%";
}

// --onscroll-header---

$(window).scroll(function() {
	var scroll = $(window).scrollTop();

	if (scroll >= 100) {
		$("body").addClass("darkHeader");
	} else {

		$("body").removeClass("darkHeader");
	}
});

/*function setboardName() {
	var Boardname = getUserSettings("BOARD_NAME");
	$("#headerTexts").text(Boardname);
	$("#headerTextss").text(Boardname);

}*/