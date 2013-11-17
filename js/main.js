/* MAIN */

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

require.config({
    paths: {
        jquery			: "vendor/jquery/jquery.min-1.10.2-dev",/*
        jquery	 		: "vendor/jquery/jquery.min-1.10.2-prod"*/
        damier			: "app/damier/damier",
        player			: "app/damier/player",
        pion  			: "app/damier/pion",
        dcase 	 		: "app/damier/case",
        possibleMoove	: "app/damier/possibleMoove"
    }
});


require([
	"damier", 
	"player", 
	"jquery"/*, 
	"pion", 
	"case", 
	"possibleMoove"*/
],
function(Damier, Player, $){
    $(document).ready(function() {
    	//loadCss('http://127.0.0.1/damierProject/css/template.css');
    	//console.log(typeof Damier);
		var player = new Player();
		//console.log(player.side);
		var damier = new Damier(player.side);
		damier.updatePossibleMooves.call(damier,damier.getState());

		$('.pionBlanc,.pionGris').hover(function () {
			var text = "";
			var inE = this.dataset;
			for(p in inE) {
				text+= p+' => '+inE[p]+'</br>';
			}
			$('.messageBox #mouseover').html(text);
		});
	});
});