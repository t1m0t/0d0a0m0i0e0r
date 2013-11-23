define([], function () {

	//définition de la classe PossibleMooves
	var PossibleMoove = function () { // si il y a un parametre alors on recupere les anciens mooves et marked
		//this.mooves = lastBranch === undefined ? [] : lastBranch.getMooves();
		//this.marked = lastBranch === undefined ? [] : lastBranch.getMarked();
		this.mooves = new Array();
		this.marked = new Array();
		//this._init.apply(this);
	}

	PossibleMoove.prototype = {
		constructor: PossibleMoove,
		/*_init: function () {
			
		},*/
		addMoove: function (x,y) {
			console.log('Mouvement ajouté case('+x+','+y+'), ce qui donne '+(this.mooves.length+1)+' mouvements.');
			return this.mooves.push({'x':x,'y':y});
		},
		addMarked: function (x,y) {
			console.log('Pion marqué ajouté case('+x+','+y+'), ce qui donne '+(this.marked.length+1)+' pions marqués.');
			return this.marked.push({'x':x,'y':y});
		},
		getMooves: function () {
			return this.mooves;
		},
		getMarked: function () {
			return this.marked;
		},
		isMarked: function (x,y) {
			console.log('Entrée dans isMarked avec x:'+x+' y:'+y);
			this.marked.forEach(function (v) {
				if(v.x !== undefined && v.y !== undefined) {
					console.log('Demande si pion marqué case('+x+','+y+') ?');
					if(v.x == x && v.y == y ) {
						console.log('Oui, pion marqué');
						return true;
					} 
					else {
						console.log('Non, pion non marqué');
						return false;
					} 
				}
			});
		}/*,
		isVisited: function (x,y) {
			this.mooves.forEach(function (v) {
				if(v.x !== undefined && v.y !== undefined) {
					console.log('Demande si case('+x+','+y+') visitée ?');
					if(v.x == x && v.y == y ) {
						console.log('Oui, case visitée');
						return true;
					} 
					else {
						console.log('Non, case non visitée');
						return false;
					} 
				}
				else return false;
			});
		}*/
	}

	return PossibleMoove;

});