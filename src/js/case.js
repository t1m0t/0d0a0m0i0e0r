//définition de la classe Case
var Case = function(x,y,color) { //couleur de la forme #ffffff
	this.x = x; //coordonné abscisse
	this.y = y; //coordonné ordonnné (x,y)
	this.color = color;
	this._init.apply(this,arguments);
}

Case.prototype = {
	constructor: Case,
	_init : function(color) {
		if(arguments.lenght!=1 && isNaN(argmuments[0]) throw new Error('L\'argument est incorrect');
		if(color) this.color = '#C1B4D6';
		var case = '<div class="case" id="x'+x+'y'+y+'" style="color:'+this.color+';heigh:50px;width:50px"></div>';
		$(".damier").appendChild(case);
	},
	hasPion : function() {
		var coord = 'x'+this.x+'y'+this.y;
		return $('#'+coord).find(".pion") ? 0 : 1;
	}
}