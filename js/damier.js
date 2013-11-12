//définition de la classe Damier
var Damier = function () {
	this.state = new Array(); //position des pions sur le damier
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
						this.state[x][y] = 'b0'; //pionBlanc
						new Pion(x,y,'a',0);
						//console.log(this.state[x][y]+': '+x+y);
					}
					if(y<=3) {
						this.state[x][y] = 'a0'; //pionNoir
						new Pion(x,y,'b',0);
						//console.log(this.state[x][y]+': '+x+y);
					}
				}
			}
		}
	},
	updateState: function(posCase,element) { 
		var type = ['a0','a1','b0','b1'];
		if(!(
			posCase.x >= 0 && posCase.x <= 9 &&
			posCase.y >= 0 && posCase.y <= 9 &&
			element in type
			)) throw new Error('Bad arguments');
		else return this.state[posCase.x][posCase.y] = element;
	},
	getState: function() {
		return this.state; //faire un apply avec l'objet damier si nécessaire, pour appeler la fonction
	}
}