//partie require.js pour l'import des dépendances
define([
	"possibleMoove"
	],
	function (PossibleMoove) {
	
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
				//console.log(element);
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
				console.log('--- Entree dans possibleMooves avec case('+x+','+y+')');
				
				/* Test des parametres */
				if(damierState[x][y] === undefined) throw new Error('Param damierState is undefined');
				if(!(x<= 9 && x>=0 && y<= 9 && y>=0)) throw new Error('Must have x and y >=0 && <=9, had '+x+' and '+y);
				if(!(playerSide =='a' || playerSide =='b')) throw new Error('playerSide doit etre a ou b, mais on a: '+this.side);
				
				var kind        = damierState[x][y].kind; //renvoi normalement O ou 1 : 0 pour pion et 1 pour dame
				var params = { 'x':x, 'y':y, 'initialCPCollection': undefined, 'damierState': damierState, 'playerSide':playerSide }
				
				/* 2 cas possibles : soit c'est un pion ou soit une dame */
				// 1er cas pour le pion
				if(!kind) { // kind == 0 => not false = true
					var result = this._checkPions(params);
					/*console.log(result.length);
					for(p in result) console.log(result[p]);*/
				}
				// 2eme cas pour la dame
				else if(kind) { // kind == 1 => true
					var result = this._checkDames (x,y);
				}
				
			},
			_checkPions: function (params) { // création de la fonction pour la récursivité (plusieurs sauts possibles)

				//extraction des parametres dans params
				var x 				= params.x;
				var y 				= params.y;
				var damierState 	= params.damierState;
				var CPCollection 	= params.initialCPCollection !== undefined ? params.initialCPCollection : []; //on recupere un tableau si récursivité
				var mySide 			= params.playerSide;
				
				console.log('--- Entrée dans _checkPions avec case('+x+','+y+')');
				// closure pour avoir un numéro de branche unique et indépendant
				var possiblesIndex = function () {
					var x = 0;
					return {
						incrBranch: function () {return x++},
						getBranchs: function () {return x}
					}
				} // il faudra appeler possibleIndex.incrBranch() ou possibleIndex.getBranchs()
				
				// cette double boucle va vérifier les 4 extremitées autour de la case de coord (x,y)
				for(var j=y-1; j<=1; j+=2) { 
					for(var i=x-1; i<=1; i+=2) { // 2 x 2 = 4 loops
						var isInsideDamer = (i >= 0 && i <= 9 && j >= 0 && j <= 9) 
						//console.log(isInsideDamer);
						if(isInsideDamer) {

							if(possiblesIndex().getBranchs() == 0) { //si 1ere fois
                                CPCollection[possiblesIndex().getBranchs()] = new PossibleMoove();
                            }
							//définition des variables
							var corners 			= new Array(); // les 4 coins
							corners[0] = {'side' : function(i,j) { return (i == x-1 && j == y+1)}, 'i' : function(i) {return (i-1)} , 'j' : function(j) {return (j+1)} , 'nI' : function(i) {return} (i-2), 'nJ' : function() {return (j+2)} } ;
							corners[1] = {'side' : function(i,j) { return (i == x+1 && j == y+1)}, 'i' : function(i) {return (i+1)} , 'j' : function(j) {return (j+1)} , 'nI' : function(i) {return} (i+2), 'nJ' : function() {return (j+2)} } ;
							corners[2] = {'side' : function(i,j) { return (i == x+1 && j == y-1)}, 'i' : function(i) {return (i+1)} , 'j' : function(j) {return (j-1)} , 'nI' : function(i) {return} (i+2), 'nJ' : function() {return (j-2)} } ;
							corners[3] = {'side' : function(i,j) { return (i == x-1 && j == y-1)}, 'i' : function(i) {return (i-1)} , 'j' : function(j) {return (j-1)} , 'nI' : function(i) {return} (i-2), 'nJ' : function() {return (j-2)} } ;

							var isPionNotMarked		= CPCollection[possiblesIndex().getBranchs()] === undefined ? true : !CPCollection[possiblesIndex().getBranchs()].isMarked(x,y);
							
							var countPossible  		= 0; // indice de branche, si 0 : c'est la même branche que l'initiale, sinon ce sont de nouvelle branches
							//var currentBranch 		= CPCollection[possiblesIndex.getBranchs()] === undefined ? CPCollection[possiblesIndex.getBranchs()] = new PossibleMoove(); : CPCollection[possiblesIndex.getBranchs()];
							//var previousBranch		= CPCollection[possiblesIndex.getBranchs()-1] === undefined ? 0 : CPCollection[possiblesIndex.getBranchs()-1];
							
							//console.log('Side of the pion '+damierState[i][j].side+', my side '+mySide);
							
							/* ici 4 cas possibles : suivant la case où il y a le pion adverse (haut-gauche,haut-droite,bas gauche,bas-droite)
							   il faudra regarder si la case suivante dans l'alignement est vide (sinon le saut est impossible).
							   Si le saut est possible, on va marquer le pion qui sera sauté
							*/
							console.log(corners.length);

							for(var a = 0; a < corners.length; a++) {
								console.log('--- Entree dans le check des contours ---\nAvec origine case('+x+','+y+')\nCase checké ('+i+','+j+')');
								//console.log(corners[a].i);

								if(corners[a].side(i,j)) {
									console.log(corners[a].i(i));
									
									var isNextNotMySide		= (damierState[corners[a].i(i)][corners[a].j(j)].side != damierState[x][y].side) && (damierState[corners[a].i(i)][corners[a].j(j)].side != mySide);
									var isNextNextCaseEmpty = damierState[corners[a].nI(i)] && damierState[corners[a].nI(i)][corners[a].nJ(j)] && damierState[corners[a].nI(i)][corners[a].nJ(j)].side === undefined;
									var isCaseEmpty			= damierState[corners[a].i(i)][corners[a].j(j)] === undefined;

									console.log('Check de la case('+corners[a].i+','+corners[a].j+')');
									console.log('isNextNotMySide '+isNextNotMySide);
									console.log('isNextNextCaseEmpty '+isNextNextCaseEmpty);
									console.log('isCaseEmpty '+isCaseEmpty);

									if(isNextNextCaseEmpty && isNextNotMySide) { // si la case d'après est vide
										if (countPossible > 0) { // si > 0 alors nouvelle branche => nécessite new PossibleMoove en parametre l'ancienne branche
											possibleIndex().incrBranch();
											CPCollection[possiblesIndex().getBranchs()] = new PossibleMoove(CPCollection[possiblesIndex().getBranchs()-1]);
										}
										//console.log('Check coin haut-droite, coordonnés ('+i+','+j+')');
										CPCollection[possiblesIndex().getBranchs()].addMoove(corners[a].nI(i),corners[a].nJ(j)).addMarked(corners[a].i(i),corners[a].j(j));
										countPossible++;
										checkPions(corners[a].nI(i),corners[a].nJ(j),CPCollection);
									}
									else if (isCaseEmpty) {
										CPCollection[possiblesIndex().getBranchs()].addMoove(corners[a].nI(i),corners[a].nJ(j)).addMarked(corners[a].i(i),corners[a].j(j));
									}
								}
								console.log('--- Sortie du check des contours ---');
							}
							
						}
					}
				}

				return CPCollection; //revois tous les coups possibles (collection of objects)
			},
			_checkDames: function (x,y,initialCPCollection) {

			}/*,
			supp: function() {

			}*/
		}

		return Pion;
	
});