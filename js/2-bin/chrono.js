/**
 * Récupère la chronologie de vol et l'affiche
 * */

function getchrono() {
    $.ajax({
		url: server + "/bin/get_chrono.php",
		type: "GET"
	})
			.done(function(data) {
		if (typeof data === "string") {         // On vérifie qu'il y a bien du JSON à lire
			if (data === "n"){
				return;
			} else {
				data = JSON.parse(data);
			}
		}
		for (var i in data.events) {
			$("#chrono").append("<li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">" + data.events[i].titre + "<b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li class=\"disabled\"><a>" + data.events[i].description + "</a></li><li class=\"disabled\"><a>" + data.events[i].contributeurs + "</a></li><li class=\"disabled\"><a>" + data.events[i].lieu + "</a></li></ul></li>");
		}
	});
}