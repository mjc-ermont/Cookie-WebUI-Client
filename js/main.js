var chart;
var map;
var timeoutid, timeoutview;
var time_last_up = 0;

function changeview(i, j, view) {
	time_last_up = 0;
	clearTimeout(timeoutid);
	clearInterval(timeoutview);
	$("#views").children("li").attr("class", "");
	$("#views").children("li:nth-child(" + (view + 1) + ")").attr("class", "active");
	$("#content").html("");
	
	//views[capteurs[i]["values"][j]["type"][view]].init(i, j, view);
	
	$.ajax({
		url: "http://home.konfiot.net/Cookie-WebUI-Server/bin/get.php",
		type: "GET",
		async: false,
		data: "t=" + time_last_up + "&c=" + i + "&v=" + j
	})
			.done(function(data) {
		if (typeof data === "string") {
			if (data === "n"){
				return;
			} else {
				data = JSON.parse(data);
			}
		}

		time_last_up = data[data.length - 1][0];
		timeoutview = views[capteurs[i]["values"][j]["type"][view]].callback(i, j, view, data);
	});
	timeoutid = setTimeout(refresh, 1000, i, j, view);
}

function refresh(i, j, view) {
	$.ajax({
		url: "http://home.konfiot.net/Cookie-WebUI-Server/bin/get.php",
		type: "GET",
		async: false,
		data: "t=" + time_last_up + "&c=" + i + "&v=" + j
	})
			.done(function(data) {
		if (typeof data === "string") {
			if (data === "n"){
				return;
			} else {
				data = JSON.parse(data);
			}
		}

		time_last_up = data[data.length - 1][0];
		views[capteurs[i]["values"][j]["type"][view]].refresh(i, j, view, data, time_last_up);
	});
	timeoutid = setTimeout(refresh, 1000, i, j, view);
}

function changecapt(i, j) {
	$("#views").html("");
	for (var k in capteurs[i]["values"][j]["type"]) {
		$("#views").append("<li><a href='#' onclick='changeview(" + i + ", " + j + "," + k + ")'>" + views[capteurs[i]["values"][j]["type"][k]]["display"] + "</a></li>");
	}
	changeview(i, j, 0);
}

function getchrono() {
	$.ajax({
		url: "http://home.konfiot.net/Cookie-WebUI-Server/bin/get_chrono.php",
		type: "GET",
	})
			.done(function(data) {
		for (var i in data["events"]) {
			$("#chrono").append("<li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">" + data["events"][i]["titre"] + "<b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li class=\"disabled\"><a>" + data["events"][i]["description"] + "</a></li><li class=\"disabled\"><a>" + data["events"][i]["contributeurs"] + "</a></li><li class=\"disabled\"><a>" + data["events"][i]["lieu"] + "</a></li></ul></li>")
		}
	});
}

$(function() {
	for (var i in capteurs) {
		$("#sidebar").append("<li class=\"nav-header\">" + capteurs[i]["name"] + "</li>");
		for (var j in capteurs[i]["values"]) {
			if (capteurs[i]["values"][j]["list"]) {
				$("#sidebar").append("<li><a href=\"#\" onclick=changecapt(" + i + "," + j + ")>" + capteurs[i]["values"][j]["name"] + "</a></li>");
			}
		}
	}
	getchrono();
});