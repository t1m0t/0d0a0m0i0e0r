//définition de la classe Case
var Case = function(x,y,color) { //couleur de la forme #ffffff
	this.x = x; //coordonné abscisse
	this.y = y; //coordonné ordonnné (x,y)
	this.color = color;
	this._init.apply(this,arguments);
	this.state = { element:"",side:0 };
}

Case.prototype = {
	constructor: Case,
	_init: function(color) {
		if(arguments.lenght!=1 && isNaN(argmuments[0]) throw new Error('Bad arguments, expected 1, had '+arguments.lenght);
		if(color) this.color = '#C1B4D6';
		var case = '<div class="case" id="x'+x+'y'+y+'" style="color:'+this.color+';heigh:50px;width:50px"></div>';
		return $(".damier").appendChild(case);
	},
	hasElement: function() {
		var coord = 'x'+this.x+'y'+this.y;
		return $('#'+coord).find(".pion") || $('#'+coord).find(".dame") ? 0 : 1;
	}
	updateState: function(element,side) {
		if(argmuments.lenght != 2) throw new Error('Bad number of arguments, expected 2, had '+arguments.lenght);
		return {
			this.state.element = element;
			this.state.side = side;
		}
	}
}