export class ascend{

	constructor(game){
		var _this = this;
		this.game = game;
		this.basePoint;
		this.totalPoints = 0;
		this.requiredPoints;
	}

	run(){
		this.evaluate();
		console.log(this.totalPoints);
		this.game.cutscene.show();
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
		this.requiredPoints = ((30*(this.game.tier-1)*.75)/2)+(this.game.tier*30);
		if (this.totalPoints*1.2 > this.requiredPoints) {
			if (this.totalPoints*2.2 >= this.requiredPoints){

			}
		}
		else if (this.totalPoints < this.requiredPoints){
			if (this.totalPoints/2 >= this.requiredPoints){

			}
		}
		else {

		}
	}

	ascend(){
		this.tier = this.tier+1 || 0;
		this.bg.data.values.tierCounter = 0;
		this.clearAllButton();
        activeButton(game,activeButtonLeft,
            'left',getActiveButtonStats(game,'left',1,1,buffList));

        activeButton(game,activeButtonRight,
            'right',getActiveButtonStats(game,'right',1,1,buffList));

        activeButton(game,activeButtonLeft,
            'left',getActiveButtonStats(game,'left',1,2,buffList));

        activeButton(game,activeButtonRight,
            'right',getActiveButtonStats(game,'right',1,2,buffList));

        activeButton(game,activeButtonCharacter,
            'character',getActiveButtonStats(game,'character',1,1,buffList));

	}

	descend(){
		this.tier = this.tier-1 || 0;
		this.bg.data.values.tierCounter = 0;
		this.clearAllButton();
        activeButton(game,activeButtonLeft,
            'left',getActiveButtonStats(game,'left',1,1,buffList));

        activeButton(game,activeButtonRight,
            'right',getActiveButtonStats(game,'right',1,1,buffList));

        activeButton(game,activeButtonLeft,
            'left',getActiveButtonStats(game,'left',1,2,buffList));

        activeButton(game,activeButtonRight,
            'right',getActiveButtonStats(game,'right',1,2,buffList));

        activeButton(game,activeButtonCharacter,
            'character',getActiveButtonStats(game,'character',1,1,buffList));

	}

}