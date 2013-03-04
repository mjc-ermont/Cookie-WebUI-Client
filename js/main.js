var chart;
var timeoutid;
var time_last_up = 0;

function changeview(i, j, view) {
	time_last_up = 0;
	clearTimeout(timeoutid);
	$("#views").children("li").attr("class", "");
	$("#views").children("li:nth-child(" + (view + 1) + ")").attr("class", "active");
	$("#content").html("");
	$.ajax({
		url: "http://home.konfiot.net/Cookie-WebUI-Server/bin/get.php",
		type: "GET",
		data: "t=" + time_last_up + "&c=" + i + "&v=" + j
	})
			.done(function(data) {
		if (typeof data == "string") {
			data = JSON.parse(data);
		}

		time_last_up = data[data.length - 1][0];
		views[capteurs[i]["values"][j]["type"][view]]["callback"](i, j, view, data);
	});
	timeoutid = setTimeout(refresh, 1000, i, j, view);
}

function append_point(val) {
	chart.series[0].addPoint(val);
}

function refresh(i, j, view) {
	$.ajax({
		url: "http://home.konfiot.net/Cookie-WebUI-Server/bin/get.php",
		type: "GET",
		data: "t=" + time_last_up + "&c=" + i + "&v=" + j
	})
			.done(function(data) {
		if (typeof data == "string") {
			data = JSON.parse(data);
		}

		views[capteurs[i]["values"][j]["type"][view]]["refresh"](i, j, view, data, time_last_up);
		time_last_up = data[data.length - 1][0];

	});
	timeoutid = setTimeout(refresh, 1000, i, j);
}

function changecapt(i, j) {
	$("#views").html("");
	for (k in capteurs[i]["values"][j]["type"]) {
		$("#views").append("<li><a href='#' onclick='changeview(" + i + ", " + j + "," + k + ")'>" + views[capteurs[i]["values"][j]["type"][k]]["display"] + "</a></li>");
	}
	changeview(i, j, 0);
}

$(function() {
	for (var i in capteurs) {
		$("#sidebar").append("<li class=\"nav-header\">" + capteurs[i]["name"] + "</li>");
		for (var j in capteurs[i]["values"]) {
			$("#sidebar").append("<li><a href=\"#\" onclick=changecapt(" + i + "," + j + ")>" + capteurs[i]["values"][j]["name"] + "</a></li>");
		}
	}
});