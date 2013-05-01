function GraphView (options){
    this.name = "Graphique";
    this.val_lat = 0;
    this.val_lon = 1;
    this.chart;
    this.getName = function () {
        return this.name;
    };
    
    this.setUp = function (data){
		for (var index in data[0]) {
			data[0][index][0] *= 1000;
		}
		$("#content").html("<div id='graph'></div>");
		this.chart = new Highcharts.StockChart({
			chart: {
				renderTo: "graph"
			},
			title: {
				text: this.name,
				x: -20 //center
			},
			rangeSelector: {
				selected: 1
			},
			series: [{
					name: "Valeur",
					data: data[0]
				}]
		});
    };
    
    this.refresh = function (data){    		
		data[0][0][0] *= 1000;
		this.chart.series[0].addPoint(data[0][0]);
    };
}