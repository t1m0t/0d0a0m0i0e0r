//définition de la classe Damier
var Damier = function (playerSide) {
	if (arguments[0] < 0 || arguments[0] > 1) throw new Error('Bad argument, expected 1 or 0, had '+playerSide);
	this.state = new Array(); //position des pions sur le damier
	this.playerSide = playerSide == '1' ? 'a' : 'b';
	this.adverseSide = playerSide == '1' ? 'b' : 'a';
	this._initCases.apply(this);
	this._initPions.apply(this);
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
		for(var y=0;y<=9;y++){
			for (var x=0;x<=9;x++){
				if((x%2==0 || y%2==0) && (x%2==1 || y%2==1)) { //si une case est xy pair ou impair
					this.state[x] = new Array();
					if(y>=6 ) {
						this.state[x][y] = new Pion(x,y,this.playerSide,0); 
					}
					if(y<=3) {
						this.state[x][y] = new Pion(x,y,this.adverseSide,0);
					}
				}
			}
		}
	},
	/* Cette fonction va scaner toutes les cases où il y a des poins et déterminer pour chacun les mouvements possibles */
	updatePossibleMooves: function() { //avec un apply(damier) dans le main
		for(var y=0;y<=9;y++){
			for (var x=0;x<=9;x++){
				//console.log('x:'+x+' y:'+y);
				if(!this.state[x][y]) continue;
				//console.log(this.state.toString());
				//console.log(this.playerSide);
				this.state[x][y].possibleMooves(this.state,x,y,this.playerSide);
			}
		}
	},
	getState: function() {
		return this.state; //faire un apply avec l'objet damier si nécessaire, pour appeler la fonction
	},
}