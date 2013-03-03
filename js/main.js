var chart;
var timeoutid;
var time_last_up = 0;

function append_point(val) {
	chart.series[0].addPoint(val);
}

function refresh(i, j) {
	$.ajax({
		url: "http://home.konfiot.net/Cookie-WebUI-Server/bin/get.php",
		type: "GET",
		data: "t=" + time_last_up + "&c=" + i + "&v=" + j
	})
			.done(function(data) {
		for (noval in data) {
			time_last_up = data[noval][0];
			data[noval][0]*=1000;
			append_point(data[noval]);
			//alert(time_last_up);
		}
	});
	timeoutid = setTimeout(refresh, 1000, i, j);
}

function changecapt(i, j) {
	clearTimeout(timeoutid);

	time_last_up = 0

	$.ajax({
		url: "http://home.konfiot.net/Cookie-WebUI-Server/bin/get.php",
		type: "GET",
		data: "t=" + time_last_up + "&c=" + i + "&v=" + j
	})
			.done(function(data) {
		time_last_up = data[data.length - 1][0];
		for(index in data){
			data[index][0]*=1000;
		}
		$("#content").html("<div id='graph'></div>");
		chart = new Highcharts.StockChart({
			chart: {
				renderTo: "graph",
			},
			title: {
				text: capteurs[i]["values"][j],
				x: -20 //center
			},
			rangeSelector: {
				selected: 1
			},
			series: [{
					name: "Valeur",
					data: data
				}]
		});
		setTimeout(refresh, 1000, i, j, time_last_up);
	});
}

$(function() {
	for (var i in capteurs) {
		$("#sidebar").append("<li class=\"nav-header\">" + capteurs[i]["name"] + "</li>");
		for (var j in capteurs[i]["values"]) {
			$("#sidebar").append("<li><a href=\"#\" onclick=changecapt(" + i + "," + j + ")>" + capteurs[i]["values"][j] + "<a/></li>");
		}
	}
});