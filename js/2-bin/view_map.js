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
		this.map = L.map('map').setView([51.505, -0.09], 13);
		var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		});
        osm.addTo(this.map);
		L.control.scale().addTo(this.map);
		L.control.locate().addTo(this.map);
        L.Control.Zoomslider().addTo(this.map);
    };
    
    this.refresh = function (data){
        
    };
}