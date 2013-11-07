//définition de la classe Damier
var Damier = function () {
	this._initCases.apply(this);
	this._initPions.apply(this);
	this.state = sCase[][]; //position des pions sur le damier
}

Damier.prototype = {
	constructor: Damier,
	_initCases: function() {
		for (var x=0;x<=9;x++){
			for(var y=0,var i=x;i>=0;y++,i--){
				if(i%2==0){
					new Case(i,y,1); //case couleur
				}
				else {
					new Case(i,y,0); //case blanche
				}
			}
		}
	}

	},
	_initPions: function() {
		for (x=0;x<=9;x+=2){
			for(y=2,i=x;y>=0;y--,i++){
				new Pion(i,y,1);
			}
			for(y=7,j=9-x;y<=9;y++,i--){
				new Pion(i,y,0);
			}
		}
	},
	updateState: function(prev,new) { //cette fonction sera appelée dans le main au cours d'un événement (mouvement d'un pion)
		if(!(arguments.length == 2 && isArray(arguments[0]) && isArray(arguments[1]) ) ) throw new Error('Bad arguments, expected 2 arrays, had '+arguments.length+' : 'typeof arguments[0]+' and '+typeof arguments[1]);
	},
	getState: function() {

	}
}