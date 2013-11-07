//définition de la classe Player
var Player = function (id,side) {
	this.side = side;
	this.id = id;
	this.wonPions = 0;
	this._init();
}

Player.prototype = {
	constructor: Player,
	_init: function () {

	}
}