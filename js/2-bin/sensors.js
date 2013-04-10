var timeoutid, timeoutview;
var time_last_up = 0;

/**
 * La fonction qui permet de changer la vue courante (Afficher la carte au lieu du grapgique par exemple)
 * @param i le numero du capteur
 * @param j le numéro de la valeur du capteur
 * @param view le numéro de la nouvelle vue
 * */

function changeview(i, j, view) {
    time_last_up = 0;
	clearTimeout(timeoutid);   // On enlève les timeouts de refresh des valeurs et l'intervalle de rafraichissement de la vue
	clearInterval(timeoutview);
	$("#views").children("li").attr("class", "");   // On fait passer l'onglet associé à la vue en mode actif
	$("#views").children("li:nth-child(" + (view + 1) + ")").attr("class", "active");
	$("#content").html(""); // On vide le contenu de l'ancienne vue
	
	$.ajax({
		url: server + "/bin/get.php",
		type: "GET",
		data: "t=" + time_last_up + "&c=" + i + "&v=" + j
	})
			.done(function(data) {
		if (typeof data === "string") {         // On vérifie qu'il y a bien du JSON à lire
			if (data === "n"){
				return;
			} else {
				data = JSON.parse(data);
			}
		}

    	time_last_up = data[data.length - 1][0];    // On met a jour le timestamp de la dernière donnée reçue
		timeoutview = views[capteurs[i].values[j].type[view]].callback(i, j, view, data);   // On appelle le callback du la nouvelle vue pour l'initialiser
	})
            .always(function(){
                timeoutid = setTimeout(refresh, 1000, i, j, view);  // On pose un timeout pour l'actualisation de la nouvelle vue
    });
}

/**
 * Rafraichit le vue courante
 * @param i le numero du capteur
 * @param j le numéro de la valeur du capteur
 * @param view le numéro de la vue a rafraichir
 * */

function refresh(i, j, view) {
	$.ajax({
		url: server + "/bin/get.php",
		type: "GET",
		data: "t=" + time_last_up + "&c=" + i + "&v=" + j
	})
			.done(function(data) {
		if (typeof data === "string") {         // On vérifie qu'il y a bien du JSON à lire
			if (data === "n"){
				return;
			} else {
				data = JSON.parse(data);
			}
		}

		time_last_up = data[data.length - 1][0];
		views[capteurs[i].values[j].type[view]].refresh(i, j, view, data, time_last_up);    // On appelle le callback pour rafraichir l'état du capteur
	})
            .always(function(){
                timeoutid = setTimeout(refresh, 1000, i, j, view);  // On remet un timeout pour que le capteur se rafraichisse toutes les secondes
    });
}

/**
 * Change le capteur affiché
 * @param i le numero du capteur
 * @param j le numéro de la valeur du capteur
 * */

function changecapt(i, j) {
	$("#views").html(""); // On vide le contenu des onglets qui contiennent les vues de l'ancien capteur
	for (var k in capteurs[i].values[j].type) {
		$("#views").append("<li><a href='#' onclick='changeview(" + i + ", " + j + "," + k + ")'>" + views[capteurs[i].values[j].type[k]].display + "</a></li>");   // On remplit les onglets avec les nouvelles valeurs
	}
	changeview(i, j, 0); // On active la première vue
}