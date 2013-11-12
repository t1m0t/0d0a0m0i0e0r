//définition de la classe Player
var Player = function (id,side) {
	this.side = side;
	this.wonPions = 0;
	this.id = 0;
	self = this;
	(function (self) {
		var id;
		if(id == 'null') id = 0;
		return {
			self.id = 'id'+id+'s'+self.side;
			id++;
		}
	})(self); //fonction anonyme avec closure et en parametre le this
	this._init().apply(this);
}

Player.prototype = {
	constructor: Player,
	_init: function () {
		
	}
}