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
        jquery			: "vendor/jquery/jquery.min-1.10.2-dev",
        jqueryUI		: "vendor/jquery/jquery-ui-1.10.3.custom",
        //jquery	 		: "vendor/jquery/jquery.min-1.10.2-prod"
        damier			: "app/damier/damier",
        player			: "app/damier/player",
        pion  			: "app/damier/pion",
        dcase 	 		: "app/damier/case",
        possibleMoove	: "app/damier/possibleMoove"
    }
});


require([
	"damier", 
	"player"/*, 
	"jquery",
	"jqueryUI"/*, 
	"pion", 
	"case", 
	"possibleMoove"*/
],
function(Damier, Player/*, $*/){
	$.event.props.push('dataTransfer');

    $(document).ready(function() {

		var player = new Player();
		//console.log(player.side);
		var damier = new Damier(player.side);

		damier.updatePossibleMooves.call(damier,damier.getState());

		var $context = $(this);

		/*$('.pionBlanc,.pionGris').hover(function () {
			var text = "";
			var inE = this.dataset;
			for(p in inE) {
				text+= p+' => '+inE[p]+'</br>';
			}
			$('.messageBox #mouseover').html(text);
		});*/

		$('.pionBlanc,.pionGris').click(function(e) { /*#5F9EA0*/
			var pionId 			= e.currentTarget.getAttributeNode('id').value;
			var pionTargeted 	= damier.getPionById.call(damier,pionId);
			var targeted 		= pionId == pionTargeted;

			var ids = '';
			pionTargeted.getPossibleMooves().forEach(
				function(mooves) {
					var text = [];
					mooves.getMooves().forEach(
						function(moove) {
							text.push('x'+moove.x+'y'+moove.y);
							}
					)
					return ids = text;
			});

			$('.case1').css('background-color','#C1B4D6');

			ids.forEach(function(id){
				$('#'+id).css('background-color','#FF4500');
			});
			
		});

		/*$('.pionBlanc,.pionGris').draggable({
			containment : '.damier',
			grid : [50 , 50],
			revert : 'valid'
			//revert : true,
			//snap : '.case1,.case0'
		});

		$('.case0').droppable({
			accept : '.pionBlanc,.pionGris',

		});*/
 
		/*$(document).ready(function() {
		    var i, $this, $log = $('#log');
		 
		    $('.pionBlanc,.pionGris').on({
		        // on commence le drag
		        dragstart: function(e) {
		            $this = $(this);
		            i = $(this).index();
		            $(this).css('opacity', '0.5');
		 
		            // on garde le texte en mémoire (A, B, C ou D)
		            e.dataTransfer.setData('text/html', $(this).text());
		        },
		        // on passe sur un élément draggable
		        dragenter: function(e) {
		            // on augmente la taille pour montrer le draggable
		            $(this).animate({
		                width: '90px'
		            }, 'fast');
		 
		            e.preventDefault();
		        },
		        // on quitte un élément draggable
		        dragleave: function() {
		            // on remet la taille par défaut
		            $(this).animate({
		                width: '75px'
		            }, 'fast');
		        },
		        // déclenché tant qu on a pas lâché l élément
		        dragover: function(e) {
		            e.preventDefault();
		        },
		        // on lâche l élément
		        drop: function(e) {
		            // si l élément sur lequel on drop n'est pas l'élément de départ
		            if (i !== $(this).index()) {
		                // on récupère le texte initial
		                var data = e.dataTransfer.getData('text/html');
		 
		                // on log
		                //$log.html(data + ' > ' + $(this).text()).fadeIn('slow').delay(1000).fadeOut();
		 
		                // on met le nouveau texte à la place de l ancien et inversement
		                $this.text($(this).text());
		                $(this).text(data);
		            }
		 
		            // on remet la taille par défaut
		            $(this).animate({
		                width: '75px'
		            }, 'fast');
		        },
		        // fin du drag (même sans drop)
		        dragend: function() {
		            $(this).css('opacity', '1');
		        },
		        // au clic sur un élément
		        click: function() {
		            alert($(this).text());
		        }
		    });
		});*/
	});
});