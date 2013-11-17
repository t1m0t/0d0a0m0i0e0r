//définition de la classe Damier
var Damier = function (playerSide) {
	if (arguments[0] < 0 || arguments[0] > 1) throw new Error('Bad argument, expected 1 or 0, had '+playerSide);
	this.state = new Array(); //position des pions sur le damier
	this.playerSide = playerSide == '1' ? 'a' : 'b';
	this.adverseSide = playerSide == '1' ? 'b' : 'a';
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
						this.state[x][y] = new Pion(x,y,this.playerSide,0); 
					}
					if(y<=3) {
						this.state[x][y] = new Pion(x,y,this.adverseSide,0);
					}
				}
			}
		}
	},
	/* Cette fonction va scaner toutes les cases où il y a des poins et déterminer pour chacun les mouvements possibles */
	updatePossibleMooves: function() { //avec un apply(damier) dans le main
		for(var y=0;y<=9;y++){
			for (var x=0;x<=9;x++){
				//console.log('x:'+x+' y:'+y);
				if(!this.state[x][y]) continue;
				//console.log(this.state.toString());
				//console.log(this.playerSide);
				this.state[x][y].possibleMooves(this.state,x,y,this.playerSide);
			}
		}
	},
	getState: function() {
		return this.state; //faire un apply avec l'objet damier si nécessaire, pour appeler la fonction
	},
}
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
//définition de la classe Pion
var Pion = function (x,y,side,kind) {
	constructor: Pion,
	//console.log('----Entree creation de pion----');
	this.posX = x;
	this.posY = y;
	this.side = side; //a pour les blanc et b pour les noirs
	this.kind = kind; //0 signifie pion et 1 signifie dame
	this.pId = this._generateId();
	//console.log(this.pId);
	this._init.apply(this);
	//console.log('----Sortie creation de pion----');
	//this.possibleMoovesState = [] = [];
}

Pion.prototype = {
	constructor: Pion,
	_generateId: (function() { // Define and invoke
			var counter = 0; // Private state of function below
			return function() { return counter++; };
	}()),
	_init: function () { //le underscore signifie method à utilser en interne
		if(!(this.side =='a' || this.side =='b')) throw new Error('this.side doit etre a ou b, mais on a: '+this.side);
		if(!(this.kind =='0' || this.kind =='1')) throw new Error('this.kind doit etre 0 ou 1, mais on a: '+this.kind);
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
		//console.log(pos);
		return $(pos).append(pion);
	},
	changeKind: function () { //attention : il faudra surement faire changeKind.apply(objetPion) dans le main (confusion de context possible)
		this.kind == 0 ? this.kind = 1 : this.kind = 0; //on change le pion en dame ou vice versa
		$(this.pId).attr('class',this.side+this.kind); //on change le nom de la classe du pion
	},
	updatePos: function(x,y) {
		if(!(x<= 9 && x>=0 && y<= 9 && y>=0)) throw new Error('Must have 2 arguments >=0 && <=9, had '+x+' and '+y);
		this.posX = x;
		this.posY = y;
	},
	possibleMooves: function (damierState,x,y,playerSide) { //appeler avec un apply(damier.state[][]) pour l'utilisation des this
		if(!(arguments.lenght == 4)) throw new Error('Bad arguments, expected 4, had '+arguments.lenght);
		else {
			if(damierState.prototype != 'Damier') throw new Error('Bad argument, expected objet from Class \'Damier\'; had '+damierState.prototype);
			if(!(x<= 9 && x>=0 && y<= 9 && y>=0)) throw new Error('Must have x and y >=0 && <=9, had '+x+' and '+y);
			if(!(playerSide =='a' || playerSide =='b')) throw new Error('playerSide doit etre a ou b, mais on a: '+this.side);
		}
		//var x = this.x;
		//var y = this.y;
		var damierState = damierState;
		//var possibles   = [] = [];
		//var marked      = [] = []; //pour garder en mémoire les poins adversaires marqués si enchainement de sauts
		var mySide      = playerSide; // renvoi a ou b : a pour blanc et b pour gris
		var kind        = damierState[x][y].kind; //renvoi normalement O ou 1 : 0 pour pion et 1 pour dame
		
		/* 2 cas possible : soit c'est un pion ou une dame */
		// 1er cas pour le pion
		if(!kind) { // kind == 0 => not false = true
			checkPions(x,y);
		}
		// 2eme cas pour la dame
		else if(kind) { // kind == 1 => true
			checkDames (x,y);
		}

		function checkPions (x,y,initialCPCollection) { // création de la fonction pour la récursivité (plusieurs sauts possibles)
			//var possiblesIndex = initialCPCollection.lenght != 0 ? initialCPCollection.lenght-1 : 0; //on récupere l'index des coups possibles à cause de la récursivité
			var CPCollection = initialCPCollection != 'undefined' ? initialCPCollection : []; //on recupere un tableau si récursivité
			/*if(possiblesIndex == 0) { //si 1ere fois
				CPCollection[possiblesIndex] = new PossibleMoove();
			}*/

			var possiblesIndex = function () { // closure pour avoir un numéro de branche unique et indépendant
				var x = 0;
				return {
					incrBranch: function () {return x++},
					getBranchs: function () {return x}
				}
			} // il faudra appeler possibleIndex.incrBranch() ou possibleIndex.getBranchs()

			// cette double boucle va vérifier les 4 extremitées autour de la case de coord (x,y)
			for(var i=x-1; i<=1; i+=2) {
				for(var j=y-1; j<=1; j+=2) { // 2 x 2 = 4 loops
					if( (damierState[i][j].side != mySide) && !CPCollection[possiblesIndex.getBranchs()].isMarked(x,y)) { //si pion du camps adverse et non marqué
						/* ici 4 cas possibles : suivant la case où il y a le pion adverse (haut-gauche,haut-droite,bas gauche,bas-droite)
						   il faudra regarder si la case suivante dans l'alignement est vide (sinon le saut est impossible).
						   Si le saut est possible, on va marquer le pion qui sera sauté
						*/
						var countPossible = 0; // indice de branche, si 0 : c'est la même branche que l'initiale, sinon ce sont de nouvelle branches
						//var cornerCase = [];
						if(i == x-1 && j == y+1) { //coin haut-gauche
							if(damierState[i-2][j+2].side == 'undefined') { // si la case d'après est vide
								CPCollection[possiblesIndex.getBranchs()].addMoove(i-2,j+2).addMarked(i-1,j+1);
								//CPCollection[possiblesIndex.getBranchs()].addMarked(i-1,j+1);
								//possibleIndex.incrBranch();
								countPossible++; // on indique
								checkPions (i-2,j+2,CPCollection);
							}
						}
						if(i == x+1 && j == y+1) { //coin haut-droite
							if(damierState[i+2][j+2].side == 'undefined') { // si la case d'après est vide
								if (countPossible > 0) { // si > 0 alors nouvelle branche => nécessite new PossibleMoove avec un parametre
									possibleIndex.incrBranch();
									CPCollection[possiblesIndex.getBranchs()] = new PossibleMoove(CPCollection[possiblesIndex.getBranchs()-1]);
								}
								CPCollection[possiblesIndex.getBranchs()].addMoove(i+2,j+2).addMarked(i+1,j+1);
								//CPCollection[possiblesIndex.getBranchs()].addMarked(i+1,j+1);
								countPossible++;
								checkPions (i-2,j+2,CPCollection);
							}
						}
						if(i == x+1 && j == y-1) { //coin bas-droite
							if(damierState[i+2][j-2].side == 'undefined') { // si la case d'après est vide
								if (countPossible > 0) { // si > 0 alors nouvelle branche => nécessite new PossibleMoove avec un parametre
									possibleIndex.incrBranch();
									CPCollection[possiblesIndex.getBranchs()] = new PossibleMoove(CPCollection[possiblesIndex.getBranchs()-1]);
								}
								CPCollection[possiblesIndex.getBranchs()].addMoove(i+2,j+2).addMarked(i+1,j+1);
								//CPCollection[possiblesIndex.getBranchs()].addMarked(i+1,j+1);
								countPossible++;
								checkPions (i-2,j+2,CPCollection);
							}
						}
						if(i == x-1 && j == y-1) { //coin bas-gauche
							if(damierState[i-2][j-2].side == 'undefined') { // si la case d'après est vide
								if (countPossible > 0) { // si > 0 alors nouvelle branche => nécessite new PossibleMoove avec un parametre
									possibleIndex.incrBranch();
									CPCollection[possiblesIndex.getBranchs()] = new PossibleMoove(CPCollection[possiblesIndex.getBranchs()-1]);
								}
								CPCollection[possiblesIndex.getBranchs()].addMoove(i+2,j+2).addMarked(i+1,j+1);
								//CPCollection[possiblesIndex.getBranchs()].addMarked(i+1,j+1);
								countPossible++;
								checkPions (i-2,j+2,CPCollection);
							}
						}
					}
				}
			}
			return CPCollection; //revois tous les coups possibles (collection of objects)
		}
		function checkDames (x,y,indexCP,initialCPCollection) {

		}
	}
	/*,
	supp: function() {

	}*/
}

//définition de la classe player
var Player = function () {
	this.id    = $('#playerId').val();
	this.token = $('#playerToken').val();
	this.side  = $('#playerSide').val();
	//console.log(this.side);
	this.turn  = this.side == 1 ? 1 : 0;
	this._init.apply(this);
}

Player.prototype = {
	constructor: Player,
	_init: function () {
		var side = this.side == 0 ? 'Vous êtes les Gris' : 'Vous êtes les Blancs';
		$('.playerStats').append('<p class="playerSide">'+side+'</p>');
		if(this.turn) $('.playerTurn').text('C\'est votre tour');
		else $('.playerTurn').text('C\'est à l\'adversaire de jouer');
	},
	updateToken: function () { //requete ajax pour demander un autre token, celui-ci se mettra a jour à chaque tour

	},
	updateTurn: function () { //requete ajax pour demander au server à qui est le tour

	}
}

//définition de la classe PossibleMooves
var PossibleMoove = function (lastBranch) { // si il y a un parametre alors on recupere les anciens mooves et marked
	this.mooves = lastBranch == 'undefined' ? [] : lastBranch.getMooves;
	this.marked = lastBranch == 'undefined' ? [] : lastBranch.getMarked;
	//this._init.apply(this);
}

PossibleMoove.prototype = {
	constructor: PossibleMoove,
	/*_init: function () {
		
	},*/
	addMoove: function (x,y) {
		this.mooves.push({'x':x,'y':y});
	},
	addMarked: function (x,y) {
		this.marked.push({'x':x,'y':y});
	},
	getMooves: function () {
		return this.mooves;
	},
	getMarked: function () {
		return this.marked;
	},
	isMarked: function (x,y) {
		this.marked.forach(function (v) {
			if(v.x != 'undefined' && v.y != 'undefined') {
				if(v.x == x && v.y == y) return true;
				else return false;
			}
		})
	}
}