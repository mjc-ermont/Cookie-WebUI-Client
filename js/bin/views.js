var views = {
	graph: {
		display: "Graphique",
		callback: function(i, j, view, data) {
			var timestamp = Array();
			var data_mod = Array();
			for (var index in data) {
				data[index][0] *= 1000;
				if (timestamp.indexOf(data[index][0]) === -1){
					data_mod.push(data[index]);
				}
				timestamp[index] = data[index][0];
			}
			$("#content").html("<div id='graph'></div>");
			chart = new Highcharts.StockChart({
				chart: {
					renderTo: "graph"
				},
				title: {
					text: capteurs[i].values[j].name,
					x: -20 //center
				},
				rangeSelector: {
					selected: 1
				},
				series: [{
						name: "Valeur",
						data: data_mod
					}]
			});
		},
		refresh: function(i, j, view, data, time_last_up) {
			for (var noval in data) {
				time_last_up = data[noval][0];
				data[noval][0] *= 1000;
				chart.series[0].addPoint(data[noval]);
			}
		}


	},
	raw: {
		display: "Données",
		callback: function(i, j, view, data) {
			$("#content").html("<p><h1>" + data[data.length - 1][1] + " " + capteurs[i].values[j].unit + "</h1>Dernière mise à jour il y à <span id='time_last_up'>" + Math.floor((new Date().getTime() / 1000) - time_last_up) + "</span> secondes</p>");
			return setInterval(function() {
				$("#time_last_up").html("" + Math.floor((new Date().getTime() / 1000) - time_last_up));
			}, 1000);
		},
		refresh: function(i, j, view, data, time_last_up) {
			$("#content").html("<p><h1>" + data[data.length - 1][1] + " " + capteurs[i].values[j].unit + "</h1>Dernière mise à jour il y à <span id='time_last_up'>" + Math.floor((new Date().getTime() / 1000) - time_last_up) + "</span> secondes</p>");
		}
	},
	map: {
		display: "Carte",
		init: function(i, j, view) {
			var hauteur;
			if (typeof(window.innerHeight) === 'number'){
				hauteur = window.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight){
				hauteur = document.documentElement.clientHeight;
			}
				
			$("#content").html("<div id='map' style='height:" + (hauteur-200) + "px'></div>");
			map = L.map('map').setView([51.505, -0.09], 13);
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
			L.control.scale().addTo(map);
			L.control.locate().addTo(map);
		},
		callback: function(i, j, view, data) {

		},
		refresh: function(i, j, view, data, time_last_up) {

		}
	}
};
