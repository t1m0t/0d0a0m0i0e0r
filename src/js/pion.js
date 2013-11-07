//définition de la classe Pion
var Pion = function (x,y,side,kind) {
	this.posX = x;
	this.posY = y;
	this.side = side; //a pour les blanc et b pour les noirs
	this.kind = kind; : //0 signifie pion et 1 signifie dame
	this.id = 0;
	self = this;
	(function (self) {
		var id;
		if(id == 'null') id = 0;
		return {
			self.id = 'id'+id+'s'+self.side;
			id++;
		}
	})(self); //fonction anonyme avec closure et parametre le this
	this._init.apply(this);
}

Pion.prototype = {
	constructor: Pion,
	updatePos: function(x,y) {
		this.posX = x;
		this.posY = y;
	},
	possibleMooves: function(damierState) {
		var possibles[] = [];
		//calculer les choix possible, voir algorithme
	}
	_init: function () { //le underscore signifie private method
		var element = this.side+this.kind;
		var className = switch(element) {
			case 'a0' : return 'pionBlanc';
			case 'a1' : return 'dameBlanc';
			case 'b0' : return 'pionNoir';
			case 'b1' : return 'dameNoir';
			default : throw new Error('cas de classe non trouvé, '+element);
		}
		var pion = '<div class="'+className+'" id="'+this.id+'"></div>';
		return $(".damier").append(case);
	}
	changeKind: function () { //attention : il faudra surement faire changeKind.apply(objetPion) dans le main (confusion de context possible)
		this.kind == 0 ? this.kind = 1 : this.kind = 0; //on change le pion en dame ou vice versa
		$(this.id).attr('class',this.side+this.kind); //on change le nom de la classe du pion
	},
	supp: function() {

	}
}