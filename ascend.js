export class ascend{

	constructor(game){
		var _this = this;
		this.game = game;
		this.basePoint;
		this.totalPoints = 0;

	}

	run(){
		this.evaluate();
		console.log(this.totalPoints);
	}

	evaluate(){
		for (let x = 0 ;  x != this.game.buyMenuCategories.length ; x++){
			for (let y = 0 ; y != this.game.buyMenuCategories[x].data.values.itemList.length ; y++){
				if (this.game.buyMenuCategories[x].data.values.itemList[y].data.values.isBrought){
					this.totalPoints += this.game.buyMenuCategories[x].data.values.itemList[y].data.values.point;
				}
			}
		}
		console.log(this.totalPoints);
		this.totalPoints += this.game.activeButtonCharacter[1].data.values.work.points;
		console.log(this.totalPoints);
		if(this.game.schoolFinished == 'Cheep School'){
			this.totalPoints += 1;
		}
		else if(this.game.schoolFinished == 'Nomal School'){
			this.totalPoints += 2;
		}
		else if(this.game.schoolFinished == 'Public School'){
			this.totalPoints += 4;
		}
		else if(this.game.schoolFinished == 'Private School'){
			this.totalPoints += 8;
		}
		else if(this.game.schoolFinished == 'Top-Class School'){
			this.totalPoints += 16;
		}
		else if(this.game.schoolFinished == 'World-Class School'){
			this.totalPoints += 32;
		}
		console.log(this.totalPoints);
		this.totalPoints += this.game.expAmount.data.values.amount / 100;
		console.log(this.totalPoints);
	}

	ascend(){

	}

	descend(){

	}


}