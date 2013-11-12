//définition de la classe Pion
var Pion = function (x,y,side,kind) {
	//console.log('----Entree creation de pion----');
	this.posX = x;
	this.posY = y;
	this.side = side; //a pour les blanc et b pour les noirs
	this.kind = kind; //0 signifie pion et 1 signifie dame
	this.pId = this._generateId();
	console.log(this.pId);
	this._init.apply(this);
	//console.log('----Sortie creation de pion----');
}

Pion.prototype = {
	constructor: Pion,
	updatePos: function(x,y) {
		this.posX = x;
		this.posY = y;
	},/*
	possibleMooves: function(damierState) {
		var possibles[] = [];
		//calculer les choix possible, voir algorithme
	},*/
	_generateId: (function() { // Define and invoke
			var counter = 0; // Private state of function below
			return function() { return counter++; };
	}()),
	_init: function () { //le underscore signifie method à utilser en interne
		if(!(this.side !='a' || this.side !='b')) throw new Error('this.side doit etre a ou b, mais on a: '+this.side);
		if(!(this.kind !='0' || this.kind !='1')) throw new Error('this.kind doit etre 0 ou 1, mais on a: '+this.kind);
		var element = this.side+this.kind;
		var className = '';
		switch(element) {
			case 'a0' : className = 'pionBlanc';break;
			case 'a1' : className = 'dameBlanc';break;
			case 'b0' : className = 'pionGris';break;
			case 'b1' : className = 'dameGris';break;
			default : throw new Error('Cas de classe non trouve, '+element);break;
		}
		var pion = '<div class="'+className+'" id="'+this.pId+'"><img src="http://127.0.0.1/damierProject/img/'+className+'.png"/></div>';
		var pos = '#'+'x'+this.posX+'y'+this.posY;
		console.log(pos);
		return $(pos).append(pion);
	},
	changeKind: function () { //attention : il faudra surement faire changeKind.apply(objetPion) dans le main (confusion de context possible)
		this.kind == 0 ? this.kind = 1 : this.kind = 0; //on change le pion en dame ou vice versa
		$(this.pId).attr('class',this.side+this.kind); //on change le nom de la classe du pion
	}/*,
	supp: function() {

	}*/
}