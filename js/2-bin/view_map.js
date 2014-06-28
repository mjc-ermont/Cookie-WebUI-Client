function MapView (options){
    this.name = "Carte";
    this.val_lat = 0;
    this.val_lon = 1;
    this.getName = function () {
        return this.name;
    };
    
    this.setUp = function (data){
        var hauteur;
		if (typeof(window.innerHeight) === 'number'){
			hauteur = window.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight){
			hauteur = document.documentElement.clientHeight;
		}
		
		$("#content").html("<div id='map' style='height:" + (hauteur-200) + "px'></div>");
		this.map = window.L.map('map').setView([51.505, -0.09], 13);
		var osm = window.L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		});
		var latlngs = [];
        for (var i in data[0]){
            if (typeof(data[1][i]) !== "undefined"){
                latlngs.push([data[0][i][1], data[1][i][1]]);
            }
        }
        console.log(latlngs);
        osm.addTo(this.map);
        this.line = window.L.polyline(latlngs, {color: 'red'}).addTo(this.map);
        this.map.fitBounds(this.line.getBounds());
		window.L.control.scale().addTo(this.map);
		window.L.control.locate().addTo(this.map);
        window.L.Control.Zoomslider().addTo(this.map);
    };
    
    this.refresh = function (data){
        for (var i in data[0]){
            if (typeof(data[1][i]) !== "undefined"){
                this.line.addLatLng([data[0][i][1], data[1][i][1]]);
            }
        }
        this.map.fitBounds(this.line.getBounds());
    };
}