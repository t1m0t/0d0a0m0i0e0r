//définition de la classe Case
var Case = function(x,y,color) { //couleur de la forme #ffffff
	this.x     = x; //coordonné abscisse
	this.y     = y; //coordonné ordonnné (x,y)
	this.color = color;
	//this.state = { element: "empty", side: "none" }; //détermine si un pion est dessus et de quel coté il est
	this._init.call(this);
}

Case.prototype = {
	constructor: Case,
	_init: function(){
		if(!this.color && !(this.color==1 || this.color==0)) throw new Error('Bad argument, expected 1 or 0');
		//if(this.color) this.color = '#C1B4D6';
		var HTMLcase              = '<div class="case'+this.color+'" id="x'+this.x+'y'+this.y+'"></div>';
		return $(".damier").append(HTMLcase);
	}/*,
	hasElement: function() { //pour déterminer si un élément est positionné sur la case (faire un apply this si necessaire)
		var coord = 'x'+this.x+'y'+this.y;
		return $('#'+coord).find(".pion") || $('#'+coord).find(".dame") ? false : true; //ternaire  qui renvoi un booléen
	},
	updateState: function(element,side) {
		if(argmuments.length != 2) throw new Error('Bad number of arguments, expected 2, had '+arguments.lenght);
		if(element != ('empty' || 'pion' || 'dame') ) throw new Error('Expected empty or pion or dame, had '+element);
		if(side != ('blanc' || 'noir' || 'none' ) ) throw new Error('Expected blanc or noir or none, had '+side);
		this.state.element = element; //pion, dame ou empty
		this.state.side = side; //blanc ou noir ou none
	},
	getState : function () { //attention : il faudra surement faire un apply()
		return this.state.element+':'+this.state.side;
	}*/
}