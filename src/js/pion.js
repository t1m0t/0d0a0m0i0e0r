//définition de la classe Pion
var Pion = function (x,y,side) {
	this.posX = x;
	this.posY = y;
	this.side = side;
	this._init();
}

Pion.prototype = {
	constructor: Pion,
	updatePos: function(x,y) {
		this.posX = x;
		this.posY = y;
	},
	supp: function() {

	}
	poosibleMooves: function(damierState) {
		var possibles = [];

	}
	_init: function () {
		
	}
}