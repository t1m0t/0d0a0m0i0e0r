//création de classes

//définition de la classe Damier
var Damier = function () {
	this._initCases();
	this._initPions();
	this.state = []; //position des pions sur le damier
}

Damier.prototype = {
	constructor: Damier,
	_initCases: function() {

	},
	_initPions: function() {

	},
	updateState: function() {

	}
}

//définition de la classe Case
var Case = function(x,y,color) { //couleur de la forme #ffffff
	this.x = x; //coordonné abscisse
	this.y = y; //coordonné ordonnné (x,y)
	this.color = color;
	this._init(this.x,this.y,this.color);
}

Case.prototype = {
	constructor: Case,
	_init : function(x,y,color) {
		if(color) this.color = '#C1B4D6';
		else this.color = '#F3EFF8';
		if(arguments.lenght!=3) throw new Error('Le nombre d\'arguments ne correspond pas (3)');
		var case = '<div class="case" id="x'+x+'y'+y+'" style="color:'+this.color+';heigh:50px;width:50px"></div>';
		$(".damier").appendChild(case);
	},
	hasPion : function() {
		var coord = 'x'+this.x+'y'+this.y;
		return $('#'+coord).find(".pion") ? 0 : 1;
	}
}

//définition de la classe Pion
var Pion = function (x,y,side) {
	this.posX = x;
	this.posY = y;
	this.side = side;
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
}

//définition de la classe Player
var Player = function (id,side) {
	this.side = side;
	this.id = id;
	this.wonPions = 0;
}

Player.prototype = {

}