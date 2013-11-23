//partie require.js pour l'import des dépendances
define([
	"possibleMoove"
	],
	function (PossibleMoove) {
	
		var Pion = function (x,y,side,kind) {
			constructor: Pion,
			this.posX = x;
			this.posY = y;
			this.side = side; //a pour les blanc et b pour les noirs
			this.kind = kind; //0 signifie pion et 1 signifie dame
			this.pId = this._generateId();
			this._init.apply(this);
			this.possibleMoovesState = 0;
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
				//console.log('- Entree dans possibleMooves avec case('+x+','+y+') et player side '+playerSide);
				
				/* Test des parametres */
				if(damierState[x][y] === undefined) throw new Error('Param damierState is undefined');
				if(!(x<= 9 && x>=0 && y<= 9 && y>=0)) throw new Error('Must have x and y >=0 && <=9, had '+x+' and '+y);
				if(!(playerSide =='a' || playerSide =='b')) throw new Error('playerSide doit etre a ou b, mais on a: '+this.side);
				
				var kind        = damierState[x][y].kind; //renvoi normalement O ou 1 : 0 pour pion et 1 pour dame
				
				var params 					= new Object();
				params.x 					= x;
				params.y 					= y;
				params.damierState			= damierState;
				params.initialCPCollection 	= undefined;
				params.playerSide			= playerSide;
				params.pionId				= damierState[x][y].pId;
				params.firstMoove			= true;

				/* 2 cas possibles : soit c'est un pion ou soit une dame */
				// 1er cas pour le pion
				if(!kind && damierState[x][y].side == playerSide) { // kind == 0 => not false = true
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


				var possiblesIndex = (function _possiblesIndex () {
					var x = 0;
					return {
						incrBranch: function ()  {return x++;},
						getBranchs: function ()  {return x;},
						reset: 		function ()  {return x = 0;},
						setBranch: 	function (n) {return x = n;}
					};
				})();

				//extraction des parametres dans params
				var x 				= params.x;
				var y 				= params.y;
				var damierState 	= params.damierState;
				var CPCollection 	= params.initialCPCollection !== undefined ? params.initialCPCollection : [0]; //on recupere un tableau si récursivité
				var mySide 			= params.playerSide;
				var pionId			= params.pionId;
				var firstMoove 		= params.firstMoove == true ? true : false;
				var indexRecur		= params.indexRecur;

				//si récupération d'un CPCollection non vide
				if(CPCollection.length > 1) {
					possiblesIndex.setBranch(CPCollection.length-1);
					//console.log(possiblesIndex.getBranchs());
				}

				if(possiblesIndex.getBranchs() > 20 || CPCollection[possiblesIndex.getBranchs()].length > 20 || indexRecur > 10) return;

				CPCollection[possiblesIndex.getBranchs()] = new PossibleMoove();

				var countPossible  	= 0; // indice de branche, si 0 : c'est la même branche que l'initiale, sinon ce sont de nouvelle branches

				
				console.log('- - Entrée dans _checkPions avec case('+x+','+y+')');

				// cette double boucle va vérifier les 4 extremitées autour de la case de coord (x,y)
				for(var j=y-1; j<=y+1; j+=2) { 
					for(var i=x-1; i<=x+1; i+=2) { // 2 x 2 = 4 loops
						
						var isInsideDamer = (i >= 0 && i <= 9 && j >= 0 && j <= 9);
						
						if(isInsideDamer) {

							//console.log('- - - Entree dans le check corner Avec origine case('+x+','+y+') Case checké ('+i+','+j+')');

							//définition des variables
							var corners 			= new Array(); // les 4 coins
							corners[0] = {'side' : function(i,j) { return (i == x-1 && j == y+1)}, 'nI' : function(i) {return (i-1)} , 'nJ' : function() {return (j+1)} } ;
							corners[1] = {'side' : function(i,j) { return (i == x+1 && j == y+1)}, 'nI' : function(i) {return (i+1)} , 'nJ' : function() {return (j+1)} } ;
							corners[2] = {'side' : function(i,j) { return (i == x+1 && j == y-1)}, 'nI' : function(i) {return (i+1)} , 'nJ' : function() {return (j-1)} } ;
							corners[3] = {'side' : function(i,j) { return (i == x-1 && j == y-1)}, 'nI' : function(i) {return (i-1)} , 'nJ' : function() {return (j-1)} } ;

							
							
							/* ici 4 cas possibles : suivant la case où il y a le pion adverse (haut-gauche,haut-droite,bas gauche,bas-droite)
							   il faudra regarder si la case suivante dans l'alignement est vide (sinon le saut est impossible).
							   Si le saut est possible, on va marquer le pion qui sera sauté */

							for(var a = 0; a < corners.length; a++) {
								if(corners[a].side(i,j)) {
									console.log('- - - - Entree dans corner case('+i+','+j+'), avec branche: '+possiblesIndex.getBranchs());

									var isCaseEmpty			= damierState[i][j] === undefined || damierState[i][j].side === undefined;
									//var firstMoove 			= CPCollection[possiblesIndex.getBranchs()].mooves && CPCollection[possiblesIndex.getBranchs()].mooves.length > 1 ? false : true;
									console.log('- - - - firstMoove is: '+firstMoove);

									if(!isCaseEmpty) {
										var isNextNotMySide		= damierState[i][j].side != mySide; 
										var isNextNextCaseEmpty = corners[a].nI(i) >= 0 && corners[a].nI(i) <= 9 && corners[a].nJ(j) >= 0 && corners[a].nJ(j) <= 9 && damierState[corners[a].nI(i)][corners[a].nJ(j)] === undefined;
										var isNextNotMarked		= !CPCollection[possiblesIndex.getBranchs()].isMarked(i,j,pionId);
										console.log('- - - - - isNextNotMySide '+isNextNotMySide);
										console.log('- - - - - isNextNextCaseEmpty '+isNextNextCaseEmpty+' case('+corners[a].nI(i)+','+corners[a].nJ(j)+')');
										console.log('- - - - - isNextNotMarked '+isNextNotMarked);

									}
									else {
										console.log('- - - - - isCaseEmpty '+isCaseEmpty);
									}

									if(isNextNotMySide && isNextNextCaseEmpty && isNextNotMarked && !isCaseEmpty) { // si la case d'après est vide et si le pion sauté n'est pas déjà marqué
										console.log('- - - - - - Cas case avec pion adverse et case vide après');
										if (countPossible > 0) { // si > 0 alors nouvelle branche => nécessite new PossibleMoove et en parametre l'ancienne branche
											console.log('- - - - - - - Création nouvelle branche');
											possiblesIndex.incrBranch();
											CPCollection[possiblesIndex.getBranchs()] = CPCollection[possiblesIndex.getBranchs()-1];
											//CPCollection[possiblesIndex.getBranchs()] = new PossibleMoove(CPCollection[possiblesIndex.getBranchs()-1]);

										}
										else {
											console.log('- - - - - - - Branche initiale');
											//CPCollection[possiblesIndex.getBranchs()] = new PossibleMoove();
										}

										//on ajoute le mouvement (le saut) et le pion marqué (pion sauté)
										console.log(corners[a].nI(i)+' '+ corners[a].nJ(j));
										CPCollection[possiblesIndex.getBranchs()].addMoove(corners[a].nI(i),corners[a].nJ(j));
										CPCollection[possiblesIndex.getBranchs()].addMarked(i,j,pionId);
										countPossible++;

										var newParams 					= new Object();
										newParams.x 					= corners[a].nI(i);
										newParams.y 					= corners[a].nJ(j);
										newParams.damierState			= damierState;
										newParams.initialCPCollection 	= CPCollection;
										newParams.playerSide			= mySide;
										newParams.pionId				= pionId;
										newParams.firstMoove			= false;
										newParams.indexRecur			= indexRecur+1;

										console.log('Recursivité avec newParams : x:'+newParams.x+' y:'+newParams.y);
										this._checkPions(newParams);
									}
									else if (isCaseEmpty && j == y-1 && firstMoove) { //ici on ne peut que aller de l'avant
										console.log('- - - - - - Cas case vide');
										if (countPossible > 0) { // si > 0 alors nouvelle branche => nécessite new PossibleMoove et en parametre l'ancienne branche
											console.log('- - - - - - - Création nouvelle branche');
											possiblesIndex.incrBranch();
											console.log(possiblesIndex.getBranchs());
											CPCollection[possiblesIndex.getBranchs()] = CPCollection[possiblesIndex.getBranchs()-1];
										}
										else {
											console.log('- - - - - - - Branche initiale');
											//CPCollection[possiblesIndex.getBranchs()] = new PossibleMoove();
										}

										CPCollection[possiblesIndex.getBranchs()].addMoove(i,j);
										countPossible++;
									}
									else {
										//console.log('- - - - - - Cas case avec pion de mon coté');
									}
									//console.log('- - - - Sortie du check du corner avec countPossible = '+countPossible+' et CP = '+CPCollection[possiblesIndex.getBranchs()].mooves.length);
								}
							}
						}
						//else //console.log('- - - Corner hors du damier - Exit');
					}
				}
				possiblesIndex.reset();

				return this.possibleMoovesState = CPCollection; //revois tous les coups possibles (collection of objects)
			},
			_checkDames: function (x,y,initialCPCollection) {

			},
			getPossibleMooves: function() {
				return this.possibleMoovesState;
			}/*,
			showPossibleMooves: function() {

			}*/
		}

		return Pion;
	
});