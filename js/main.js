var balloon;
$(function() {
    /*$("#bar").css("width", "60%");
	for (var i in capteurs) {
		$("#sidebar").append("<li class=\"nav-header\">" + capteurs[i].name + "</li>"); // On remplit la sidebar de navigation avec les noms des capteurs
		for (var j in capteurs[i].values) {
			if (capteurs[i].values[j].list) {
				$("#sidebar").append("<li class=\"sensor_list\" id=" + i + "" + j + "><a href=\"#\" onclick=changecapt(" + i + "," + j + ")>" + capteurs[i].values[j].name + "</a></li>");  // Et avec les noms de chaque valeur qui doit être listée
			} else if((typeof capteurs[i].values[j].group) !== "undefined"){
                if((typeof $("#" + capteurs[i].values[j].group).get(0)) === "undefined"){
                    $("#sidebar").append("<li id='"+ capteurs[i].values[j].group +"'><a>" + capteurs[i].values[j].group + "</a></li>");
                }
            }
		}
	}
    $("#bar").css("width", "70%");
	getchrono();    // On actualise la chronologie
    $("#bar").css("width", "100%");
    setTimeout(function() {
        $("#bar_container").fadeOut();
    }, 500);*/
    balloon = new Balloon({
        sensors:[{
            name: "GPS",
            values: [{
                name: "Position",
                ids: [0,1],
                views: [new GraphView()]
            },
            {
                name: "Vitesse",
                ids: [2],
                views: [new GraphView()]
            },
            {
                name: "Altitude",
                ids: [4],
                views: [new GraphView()]
            }]
        },
        {
            name: "Acceleromètre",
            values: [{
                name: "Norme accélération",
                ids: [0],
                views: [new GraphView()]
            }]
        },
        {
            name: "Humidité",
            values: [{
                name: "Humidité",
                ids: [0],
                views: [new GraphView()]
            },
            {
                name: "Température Intérieure",
                ids: [1],
                views: [new GraphView()]
            }]
        },
        {
            name: "Pression intérieure",
            values: [{
                name: "Pression intérieure",
                ids: [0],
                views: [new GraphView()]
            }]
        },
        {
            name: "Température éxtérieure",
            values: [{
                name: "Température éxtérieure",
                ids: [0],
                views: [new GraphView()]
            }]
        },
        {
            name: "Pile",
            values: [{
                name: "Tension Pile",
                ids: [0],
                views: [new GraphView()]
            }]
        },
        {
            name: "Pression éxtérieure",
            values: [{
                name: "Pression éxtérieure",
                ids: [0],
                views: [new GraphView()]
            }]
        }]
    });
    
    var values = balloon.getValues();
    var k = 0, l = 0;
    for (var i in values){
        $("#sidebar").append("<li class=\"nav-header\">" + i + "</li>");
        for (var j in values[i]){
            $("#sidebar").append("<li onclick='changecapt("+k+","+l+")'><a href='#'>" + values[i][j] + "</a></li>");
            l++;
        }
        k++;
        l=0;
    }

    $.ajax({
        url: server + "/bin/get.php",
        type: "GET",
        data: "t=0"
	})
			.done(function(data) {
        balloon.addData(data);
    });
});

function changecapt(no_capt, no_val){
    balloon.setValue(no_capt, no_val);
//    balloon.refresh();

}