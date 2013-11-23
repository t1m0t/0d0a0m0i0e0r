//partie require.js pour l'import des dépendances
define([
	"pion",
	"dcase"
	], 
	function (Pion, Case) {
		//définition de la classe Damier
		var Damier = function (playerSide) {
			if (arguments[0] < 0 || arguments[0] > 1) throw new Error('Bad argument, expected 1 or 0, had '+playerSide);
			//this.state = new Array(); //position des pions sur le damier
			this.playerSide = playerSide == '1' ? 'a' : 'b';
			this.adverseSide = playerSide == '1' ? 'b' : 'a';
			this._initCases.apply(this);
			this.state = new Array(10);
			for(var i = 0; i < this.state.length; i++) this.state[i] = new Array(10);
			this._initPions.apply(this);
			//var that = this;
		}

		Damier.prototype = {
			constructor: Damier,
			_initCases: function() {
				for(var y=0;y<=9;y++){
					for (var x=0;x<=9;x++){
						if( (x%2==0 && y%2==0) || (x%2==1 && y%2==1) ) {
							new Case(x,y,0); //case blanche
						}
						else {
							new Case(x,y,1); //case couleur
						}
					}
				}
			},
			_initPions: function() {
				//var init_state = new Array(10);
				//for(var i = 0; i < init_state.length; i++) init_state[i] = new Array(10);

				for(var y = 0; y <= this.state.length-1; y++){
					for (var x = 0; x <= this.state[y].length-1; x++){
						if(( x%2 == 0 || y%2 == 0) && ( x%2 == 1 || y%2 == 1)) { //si une case est xy pair ou impair
							if(y<=3) {
								//this.state[x][y] = new Pion(x,y,this.adverseSide,0);
							}
							if(y>=6 ) {
								//this.state[x][y] = new Pion(x,y,this.playerSide,0);
							}
						}
					}
				}

				// pour test mouvement possibles
				
				this.state[4][5] = new Pion(4,5,this.adverseSide,0);
				this.state[6][3] = new Pion(6,3,this.adverseSide,0);
				this.state[3][8] = new Pion(3,8,this.adverseSide,0);

				this.state[3][6] = new Pion(3,6,this.playerSide,0);
				this.state[5][6] = new Pion(5,6,this.playerSide,0);
				this.state[2][7] = new Pion(2,7,this.playerSide,0);
			},
			/* Cette fonction va scaner toutes les cases où il y a des poins et déterminer pour chacun les mouvements possibles */
			updatePossibleMooves: function(state) { //avec un apply(damier) dans le main
				var playerSide = this.playerSide;
				for(var y=0;y<=9;y++){
					for (var x=0;x<=9;x++){
						if(state[x][y] !== undefined) {
							//console.log('--- Lancement de possibleMooves pour case('+x+','+y+')');
							state[x][y].possibleMooves(state,x,y,playerSide);
						}
					}
				}
			},
			getState: function() {
				return this.state; //faire un apply avec l'objet damier si nécessaire, pour appeler la fonction
			},
			getPionById: function(id) {
				for(var y=0;y<=9;y++){
					for (var x=0;x<=9;x++){
						if(this.state[x][y] !== undefined) {
							//console.log(this.state[x][y].pId == id);
							if(this.state[x][y].pId == id) return this.state[x][y];
						}
					}
				}
			}
		}

		return Damier;

});

7