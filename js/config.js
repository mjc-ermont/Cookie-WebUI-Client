var capteurs = [
	{
		name: "GPS",
		type: "GPS",
		values: [
			{
				name: "Latitude Degrés",
				type: ["map"],
				unit: "°"
			},
			{
				name: "Latitude Minutes",
				type: ["map"],
				unit: "'"
			},
			{
				name: "Longitude Degrés",
				type: ["map"],
				unit: "°"
			},
			{
				name: "Longitude Minutes",
				type: ["map"],
				unit: "'"
			},
			{
				name: "Temps UTC",
				type: ["map"],
				unit: "H"
			},
			{
				name: "Altitude",
				type: ["graph", "raw"],
				unit: "M"
			}
		]
	},
	{
		name: "Acceleromètre",
		type: "accelero",
		values: [
			{
				name: "Accélération",
				type: ["graph", "raw"],
				unit: "G"
			}
		]
	},
	{
		name: "Humidité",
		type: "hum",
		values: [
			{
				name: "Humidité",
				type: ["graph", "raw"],
				unit: "%RH"
			},
			{
				name: "Température Intérieure",
				type: ["graph", "raw"],
				unit: "°C"
			}
		]
	},
	{
		name: "Pression",
		type: "press",
		values: [
			{
				name: "Pression",
				type: ["graph", "raw"],
				unit: "hPa"
			}
		]
	},
	{
		name: "Temperature Exterieure",
		type: "temp",
		values: [
			{
				name: "Temperature",
				type: ["graph", "raw"],
				unit: "°C"
			}
		]
	},
	{
		name: "Tension Batterie",
		type: "analog",
		values: [
			{
				name: "Tension",
				type: ["graph", "raw"],
				unit: "V"
			}
		]
	},
	{
		name: "Pression Exterieure",
		type: "press",
		values: [
			{
				name: "Pression",
				type: ["graph", "raw"],
				unit: "hPa"
			}
		]
	},
];
var views = {
	graph: {
		display: "Graphique",
		callback: function(i, j, view, data) {
			for (index in data) {
				data[index][0] *= 1000;
			}
			$("#content").html("<div id='graph'></div>");
			chart = new Highcharts.StockChart({
				chart: {
					renderTo: "graph"
				},
				title: {
					text: capteurs[i]["values"][j]["name"],
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
		},
		refresh: function(i, j, view, data, time_last_up) {
			for (noval in data) {
				time_last_up = data[noval][0];
				data[noval][0] *= 1000;
				chart.series[0].addPoint(data[noval]);
			}
		}


	},
	raw: {
		display: "Données",
		callback: function(i, j, view, data) {
			$("#content").html("<p><h1>" + data[data.length - 1][1] + " " + capteurs[i]["values"][j]["unit"] + "</h1>Dernière mise à jour il y à <span id='time_last_up'>" + Math.floor((new Date().getTime() / 1000) - time_last_up) + "</span> secondes</p>");
			return setInterval(function() {
				$("#time_last_up").html("" + Math.floor((new Date().getTime() / 1000) - time_last_up));
			}, 1000);
		},
		refresh: function(i, j, view, data, time_last_up) {
			$("#content").html("<p><h1>" + data[data.length - 1][1] + " " + capteurs[i]["values"][j]["unit"] + "</h1>Dernière mise à jour il y à <span id='time_last_up'>" + Math.floor((new Date().getTime() / 1000) - time_last_up) + "</span> secondes</p>");
		},
	},
	map: {
		display: "Carte",
		callback: function(i, j, view, data) {

		},
		refresh: function(i, j, view, data, time_last_up) {

		}
	}
};