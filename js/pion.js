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