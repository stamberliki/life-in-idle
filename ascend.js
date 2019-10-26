export class ascend{

	constructor(game){
		var _this = this;
		this.game = game;
		this.basePoint;
		this.totalPoints = 0;
		this.requiredPoints;
		this.buttonData;
		this.doubleAscend = false;
		this.degreeList = ['Law School', 'Education', 'Medical School', 'Computer Science', 'Engineering', 'Avionics',];
	}

	run(){
		this.totalPoints = 0;
        this.game.cutscene.textList = this.game.cutscene.textListTrial;
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
				if (itemData.isUsed){
					this.totalPoints += itemData.point;
				}
				itemData.itemDefault(itemData);
				if (itemCategory.itemRender && x != 2){
					itemCategory.itemRender.setVisible(false);
					itemCategory.itemRender = '';
				}
				else if (x == 2 && y == 0){
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
		            this.game.buyMenuCamera.scrollX = 416*2;
		            this.game.buyMenuCategorySelect.data.values.isSelected = false;
		            this.game.buyMenuCategorySelect.setFrame(0);
					this.game.buyMenuCategorySelect = this.game.buyMenuCategories[2];
			        this.game.buyMenuCategorySelect.data.values.itemSelect = this.game.buyMenuCategories[2].data.values.itemList[0];
			        this.game.renderBuyMenuItem(this.game);
		            this.game.buyMenuCategorySelect.setFrame(1);
		            this.game.buyMenuCategorySelect.data.values.isSelected = true;
				}
			}
		}

		console.log(this.totalPoints);
		this.totalPoints += this.game.activeButtonCharacter[1].data.values.work.points;
		console.log(this.totalPoints);

		if(this.game.schoolFinished == 'Nomal School'){
			this.totalPoints += 4;
		}
		else if(this.game.schoolFinished == 'Public School'){
			this.totalPoints += 8;
		}
		else if(this.game.schoolFinished == 'Private School'){
			this.totalPoints += 16;
		}
		else if(this.game.schoolFinished == 'Top-Class School'){
			this.totalPoints += 32;
		}
		else if(this.game.schoolFinished == 'World-Class School'){
			this.totalPoints += 64;
		}
		console.log(this.totalPoints);

		let workData = this.game.activeButtonCharacter[1].data.values.work;
		if (workData.acceptedWorkName){
			this.game.achievements.unlock(workData.workList.indexOf(workData.acceptedWorkName)+6);
		}

		this.totalPoints += this.game.expAmount.data.values.amount / 125;
		this.requiredPoints = (this.game.tier*60)-(60*(this.game.tier-1)*.45);
		console.log(this.totalPoints+'|'+this.requiredPoints);
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
        this.game.nextStage.data.values.text.setText('Next Stage');
        this.game.nextStage.data.values.text.y = 600-(19*2);
        this.game.nextStage.data.values.descriptionPopup.reinitialize();
        this.game.allButtonCharacterUnlock = false;
        this.game.saveGame.setItem('motherHairFrame', Phaser.Math.Between(0,2));
        this.game.saveGame.setItem('fatherHairFrame', Phaser.Math.Between(0,4));
        this.game.fatherPortrait.hair.setFrame(this.game.saveGame.getItem('fatherHairFrame'));
        this.game.motherPortrait.hair.setFrame(this.game.saveGame.getItem('motherHairFrame'));

		//pass
		if (this.totalPoints >= this.requiredPoints*1.2) {
			if (this.game.tier < 5){
				this.game.tier = this.game.tier+1 || 0;
				this.game.cutscene.setTextIndexQueue([0,1,2,3,4,8,10,16,16+this.game.tier,22]);
			}
			else{
				this.game.achievements.unlock(5);
			}
			if (this.totalPoints >= this.requiredPoints*1.5){
				if (this.game.tier < 5){
					this.game.tier = this.game.tier+1;
					this.game.achievements.unlock(1);
					this.game.cutscene.setTextIndexQueue([0,1,2,3,4,5,9,10,16,16+this.game.tier,22]);
				}
			}
		}

		//fail
		else if (this.totalPoints <= this.requiredPoints*.95){
			if (this.game.tier > 1){
				this.game.tier = this.game.tier-1 || 0;
				this.game.cutscene.setTextIndexQueue([0,1,2,3,11,15,10,16,16+this.game.tier,22]);
			}
			else{
				this.game.achievements.unlock(4);
			}
			if (this.totalPoints <= this.requiredPoints*.75){
				if (this.game.tier > 1){
					this.game.tier = this.game.tier-1;
					this.game.achievements.unlock(0);
					this.game.cutscene.setTextIndexQueue([0,1,2,3,11,12,15,16,16+this.game.tier,22]);
				}
			}
		}

		//same
		else{
			this.game.cutscene.setTextIndexQueue([0,1,2,3,4,6,7,14,16,16+this.game.tier,22]);
		}

		this.buttonData = this.game.activeButtonLeft[1].data.values;
		if (Phaser.Math.Between(1,100) < 50){
			this.buttonData.work.generateRandomJobData();
			this.buttonData.work.generateJob(this.game);
		}
		else {
			this.buttonData.work.generateJob(this.game);
		}
		// this.buttonData.work.generateJobByTier(true);
        this.buttonData.work.acceptJob();

		this.buttonData = this.game.activeButtonRight[1].data.values;
		if (Phaser.Math.Between(1,100) < 50){
			this.buttonData.work.generateRandomJobData();
		}
		this.buttonData.work.generateJob(this.game);
        this.buttonData.work.acceptJob();

        this.game.bg.setFrame(this.game.tier-1 + this.game.bg.data.values.tierCounter);
        this.game.applySpeedMultiplier(this.game);
        this.game.degree = 'None'
        this.game.statistics.updateAll();
	}
}