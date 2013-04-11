$(function() {
    $("#bar").css("width", "60%");
	for (var i in capteurs) {
		$("#sidebar").append("<li class=\"nav-header\">" + capteurs[i].name + "</li>"); // On remplit la sidebar de navigation avec les noms des capteurs
		for (var j in capteurs[i].values) {
			if (capteurs[i].values[j].list) {
				$("#sidebar").append("<li><a href=\"#\" onclick=changecapt(" + i + "," + j + ")>" + capteurs[i].values[j].name + "</a></li>");  // Et avec les noms de chaque valeur qui doit être listée
			}
		}
	}
    $("#bar").css("width", "70%");
	getchrono();    // On actualise la chronologie
    $("#bar").css("width", "1000%");
    setTimeout(function() {
        $("#bar_container").html("");
    }, 1500);
});