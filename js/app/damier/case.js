define([], function () {

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
		}
	}

	return Case;

});