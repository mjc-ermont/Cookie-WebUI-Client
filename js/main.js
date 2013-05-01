var sensor, value, view, balloon;
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
            name: "Xday",
            values: [{
                name: "beat",
                ids: [0,1,2,3],
                views: [new GraphView()]
            }]
        }]
    });

    $.ajax({
    	url: server + "/bin/get.php",
    	type: "GET",
    	data: "t=0"
	})
			.done(function(data) {
        balloon.addData(data);
        balloon.setValue(0,0);
        balloon.refresh();
    });
});