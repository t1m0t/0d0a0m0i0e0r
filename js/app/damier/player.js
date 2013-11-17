define([], 
	function () {

		//définition de la classe player
		var Player = function () {
			this.id    = $('#playerId').val();
			this.token = $('#playerToken').val();
			this.side  = $('#playerSide').val();
			//console.log(this.side);
			this.turn  = this.side == 1 ? 1 : 0;
			this._init.apply(this);
		}

		Player.prototype = {
			constructor: Player,
			_init: function () {
				var side = this.side == 0 ? 'Vous êtes les Gris' : 'Vous êtes les Blancs';
				$('.playerStats').append('<p class="playerSide">'+side+'</p>');
				if(this.turn) $('.playerTurn').text('C\'est votre tour');
				else $('.playerTurn').text('C\'est à l\'adversaire de jouer');
			},
			updateToken: function () { //requete ajax pour demander un autre token, celui-ci se mettra a jour à chaque tour

			},
			updateTurn: function () { //requete ajax pour demander au server à qui est le tour

			}
		}

		return Player;

});