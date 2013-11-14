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