export class ascend{

	constructor(game){
		var _this = this;
		this.game = game;
		this.basePoint;
		this.totalPoints = 0;
		this.requiredPoints;
		this.buttonData;
		this.doubleAscend = false;
	}

	run(){
		this.totalPoints = 0;
		this.game.cutscene.show(true);
	}

	evaluate(){
        this.game.currentStage = 0;
        this.game.currentStageCounter = 0;
        this.game.clearBuffs(this.game.currentBuffCharacter);
        this.game.clearBuffs(this.game.currentBuffLeft);
        this.game.clearBuffs(this.game.currentBuffRight);
		for (let x = 0 ;  x != this.game.buyMenuCategories.length ; x++){
			let itemCategory = this.game.buyMenuCategories[x].data.values;
			itemCategory.itemSelect = '';
			for (let y = 0 ; y != itemCategory.itemList.length ; y++){
				let itemData = itemCategory.itemList[y].data.values;
				if (itemData.isBrought){
					this.totalPoints += itemData.point;
				}
				itemData.itemDefault(itemData);
				if (itemCategory.itemRender && x != 1){
					itemCategory.itemRender.setVisible(false);
					itemCategory.itemRender = '';
				}
				else if (x == 1){
					itemCategory.itemRender = '';
					itemData.buyButton.setFrame(2);
					itemData.isBrought = true;
					itemData.isUsed = true;
					itemData.canBeBrought = true;
					itemData.buyButtonText.setText('USED');
	        		itemData.descriptionPopup.popupText.setText(itemData.desc);
	        		itemData.descriptionPopup.popupBG.resize(
	        			(itemData.descriptionPopup.popupText.getTextBounds().local.width/2)+8,
	        			(itemData.descriptionPopup.popupText.getTextBounds().local.height/2)+8);
		            this.game.buyMenuCamera.scrollX = 416*0;
		            this.game.buyMenuCategorySelect.data.values.isSelected = false;
		            this.game.buyMenuCategorySelect.setFrame(0);
					this.game.buyMenuCategorySelect = this.game.buyMenuCategories[1];
			        this.game.buyMenuCategorySelect.data.values.itemSelect = this.game.buyMenuCategories[1].data.values.itemList[0];
			        this.game.renderBuyMenuItem(this.game);
			        this.game.buyMenuCategorySelect = this.game.buyMenuCategories[0];
		            this.game.buyMenuCategorySelect.setFrame(1);
		            this.game.buyMenuCategorySelect.data.values.isSelected = true;
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
		console.log(this.requiredPoints);

        this.game.buyMenuMoney.setText(parseInt(0));
        this.game.moneyAmount.setText(parseInt(0));
        this.game.expAmount.setText(parseInt(0));
        this.game.moneyAmount.data.values.amount = 0;
        this.game.expAmount.data.values.amount = 0;
        this.game.bg.data.values.tierCounter = 0;
        this.game.isCareSelected = false;
        this.game.player.x = 400;
        this.game.player.y = 290
        this.game.player.anims.play('baby_idle');
		this.game.clearAllButtons(this.game);
		this.game.loadFirstButtons(this.game);
		this.game.nextStageLocked = true;
        this.game.nextStage.setTexture('lockedButton',0);
        this.game.allButtonCharacterUnlock = false;
        this.game.nextStage.setTexture('lockedButton',0);
        this.game.nextStage.data.values.text.setText('Next Stage');
		this.buttonData = this.game.activeButtonLeft[1].data.values;

		//pass
		if (this.totalPoints*1.2 > this.requiredPoints) {
			if (this.game.tier < 5){
				this.game.tier = this.game.tier+1 || 0;
			}
			else{
				this.game.achievements.unlock(5);
			}
			if (this.totalPoints*2.2 > this.requiredPoints){
				if (this.game.tier < 5){
					this.game.tier = this.game.tier+1;
					this.doubleAscend = true;
				}
			}
			this.game.cutscene.setTextIndexQueue([2]);
		}

		//fail
		else if (this.totalPoints < this.requiredPoints){
			if (this.game.tier > 1){
				this.game.tier = this.game.tier-1 || 0;
			}
			else{
				this.game.achievements.unlock(4);
			}
			if (this.totalPoints/2 < this.requiredPoints){
				if (this.game.tier > 1){
					this.game.tier = this.game.tier-1;
					this.game.achievements.unlock(0);
				}
			}
			this.game.cutscene.setTextIndexQueue([1]);
		}

		//same
		else{
			this.game.cutscene.setTextIndexQueue([3]);
		}

		this.buttonData.work.generateJob(this.game);
		if (this.doubleAscend){
			this.buttonData.work.generateJobByTier(true);
			this.game.achievements.unlock(1);
		}
        this.buttonData.work.acceptJob();
        this.game.bg.setFrame(this.game.tier-1 + this.game.bg.data.values.tierCounter);
		this.buttonData = this.game.activeButtonRight[1].data.values;
		this.buttonData.work.generateJob(this.game);
        this.buttonData.work.acceptJob();
        this.game.applySpeedMultiplier(this.game);
        this.game.statistics.updateAll();
	}
}