define([], function () {

	//définition de la classe PossibleMooves
	var PossibleMoove = function (lastBranch) { // si il y a un parametre alors on recupere les anciens mooves et marked
		this.mooves = lastBranch === undefined ? [] : lastBranch.getMooves();
		this.marked = lastBranch === undefined ? [] : lastBranch.getMarked();
		//this._init.apply(this);
	}

	PossibleMoove.prototype = {
		constructor: PossibleMoove,
		/*_init: function () {
			
		},*/
		addMoove: function (x,y) {
			return this.mooves.push({'x':x,'y':y});
		},
		addMarked: function (x,y,id) {
			return this.marked.push({'x':x,'y':y, 'by': {'id':id}});
		},
		getMooves: function () {
			return this.mooves;
		},
		getMarked: function () {
			return this.marked;
		},
		isMarked: function (x,y,pId) {
			this.marked.forEach(function (v) {
				if(v.x !== undefined && v.y !== undefined) {
					console.log('Demande par '+pId+' si pion marqué case('+x+','+y+') ?');
					if(v.x == x && v.y == y && v.by.id == pId) {
						console.log('Oui, pion bien marqué par '+pId);
						return true;
					} 
					else {
						console.log('Non, pion non marqué par '+pId);
						return false;
					} 
				}
			});
		}
	}

	return PossibleMoove;

});