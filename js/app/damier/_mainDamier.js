/* MAIN */

$(document).ready(function() {
	var player = new Player();
	//console.log(player.side);
	var damier = new Damier(player.side);
	damier.updatePossibleMooves.apply(damier);
});