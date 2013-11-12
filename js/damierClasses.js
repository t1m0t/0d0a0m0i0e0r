//définition de la classe Damier
var Damier = function () {
	this.state = new Array(); //position des pions sur le damier
	this._initCases.apply(this);
	this._initPions.apply(this);
}

Damier.prototype = {
	constructor: Damier,
	_initCases: function() {
		for(var y=0;y<=9;y++){
			for (var x=0;x<=9;x++){
				if( (x%2==0 && y%2==0) || (x%2==1 && y%2==1) ) {
					new Case(x,y,0); //case blanche
				}
				else {
					new Case(x,y,1); //case couleur
				}
			}
		}
	},
	_initPions: function() {
		for(var y=0;y<=9;y++){
			for (var x=0;x<=9;x++){
				if((x%2==0 || y%2==0) && (x%2==1 || y%2==1)) { //si une case est xy pair ou impair
					this.state[x] = new Array();
					if(y>=6 ) {
						this.state[x][y] = 'b0'; //pionBlanc
						new Pion(x,y,'a',0);
						//console.log(this.state[x][y]+': '+x+y);
					}
					if(y<=3) {
						this.state[x][y] = 'a0'; //pionNoir
						new Pion(x,y,'b',0);
						//console.log(this.state[x][y]+': '+x+y);
					}
				}
			}
		}
	},
	updateState: function(posCase,element) { 
		var type = ['a0','a1','b0','b1'];
		if(!(
			posCase.x >= 0 && posCase.x <= 9 &&
			posCase.y >= 0 && posCase.y <= 9 &&
			element in type
			)) throw new Error('Bad arguments');
		else return this.state[posCase.x][posCase.y] = element;
	},
	getState: function() {
		return this.state; //faire un apply avec l'objet damier si nécessaire, pour appeler la fonction
	}
}
//définition de la classe Case
var Case = function(x,y,color) { //couleur de la forme #ffffff
	this.x     = x; //coordonné abscisse
	this.y     = y; //coordonné ordonnné (x,y)
	this.color = color;
	this.state = { element: "empty", side: "none" }; //détermine si un pion est dessus et de quel coté il est
	this._init.call(this);
}

Case.prototype = {
	constructor: Case,
	_init: function(){
		if(!this.color && !(this.color==1 || this.color==0)) throw new Error('Bad argument, expected 1 or 0');
		//if(this.color) this.color = '#C1B4D6';
		var HTMLcase              = '<div class="case'+this.color+'" id="x'+this.x+'y'+this.y+'"></div>';
		return $(".damier").append(HTMLcase);
	},
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
	}
}
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