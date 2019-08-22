export class statistics{

	constructor(game){
		this.game = game;
		this.stageText = this.game.add.bitmapText(8, 8, 'mainFont3', 'Stage: ').setOrigin(0).setFontSize(8);
		this.workText = this.game.add.bitmapText(8, 20, 'mainFont3', 'Work: None').setOrigin(0).setFontSize(8);
		this.degreeText = this.game.add.bitmapText(8, 32, 'mainFont3', 'Degree: None').setOrigin(0).setFontSize(8);
		this.speedMultiplierText = this.game.add.bitmapText(8, 44, 'mainFont3', 'Speed Multiplier: ').setOrigin(0).setFontSize(8);
		// this.moneyMultiplierText = this.game.add.bitmapText(8, 56, 'mainFont3', 'Money Multiplier: ').setOrigin(0).setFontSize(8);
		// this.expMultiplierText = this.game.add.bitmapText(8, 68, 'mainFont3', 'Experience Multiplier: ').setOrigin(0).setFontSize(8);
		this.fatherWorkText = this.game.add.bitmapText(62, 196, 'mainFont3', 'Occupation:\n').setOrigin(0.5).setFontSize(8).setCenterAlign();
		this.motherWorkText = this.game.add.bitmapText(742, 196, 'mainFont3', 'Occupation:\n').setOrigin(0.5).setFontSize(8).setCenterAlign();

		this.stageText.depth = 1;
		this.workText.depth = 1;
		this.degreeText.depth = 1;
		this.speedMultiplierText.depth = 1;
		// this.moneyMultiplierText.depth = 1;
		// this.expMultiplierText.depth = 1;
		this.fatherWorkText.depth = 1;
		this.motherWorkText.depth = 1;
	}

	updateAll(){
		if (this.game.currentStage == 0){
			this.stageText.text = 'Stage: Baby';
			this.updateCharacterWork();
			this.updateFatherWork();
			this.updateMotherWork();
		}
		else if (this.game.currentStage == 1){
			this.stageText.text = 'Stage: Toddler';
			this.updateCharacterWork();
			this.updateFatherWork();
			this.updateMotherWork();
		}
		else if (this.game.currentStage == 2){
			this.stageText.text = 'Stage: Early Childhood';
			this.updateCharacterWork();
			this.updateFatherWork();
			this.updateMotherWork();
		}
		else if (this.game.currentStage == 3){
			this.stageText.text = 'Stage: Childhood';
			this.updateCharacterWork();
			this.updateFatherWork();
			this.updateMotherWork();
		}
		else if (this.game.currentStage == 4){
			this.stageText.text = 'Stage: Teenager';
			this.updateCharacterWork();
			this.updateFatherWork();
			this.updateMotherWork();
		}
		else if (this.game.currentStage == 5){
			this.stageText.text = 'Stage: Adult';
			this.updateCharacterWork();
			this.updateFatherWork();
			this.updateMotherWork();
		}
		this.updateMultipliers();
		this.updateDegree();
	}

	updateFatherWork(){
		if (this.game.currentStage <= 1){
			if (this.game.activeButtonLeft[1].data.values.work.acceptedWorkName){
				this.fatherWorkText.text = 'Occupation:\n'+this.game.activeButtonLeft[1].data.values.work.acceptedWorkName;
			}
			else {
				this.fatherWorkText.text = 'Occupation:\nNone';
			}
		}
		else if (this.game.currentStage >= 2){
			if (this.game.activeButtonLeft[0].data.values.work.acceptedWorkName){
				this.fatherWorkText.text = 'Occupation:\n'+this.game.activeButtonLeft[0].data.values.work.acceptedWorkName;
				if (this.game.activeButtonLeft[0].data.values.retired){
					this.fatherWorkText.text = 'Occupation:\nRetired\n'+this.game.activeButtonLeft[0].data.values.work.acceptedWorkName;
				}
			}
			else {
				this.fatherWorkText.text = 'Occupation:\nNone';
			}
		}
	}

	updateMotherWork(){
		if (this.game.currentStage <= 1){
			if (this.game.activeButtonRight[1].data.values.work.acceptedWorkName){
				this.motherWorkText.text = 'Occupation:\n'+this.game.activeButtonRight[1].data.values.work.acceptedWorkName;
			}
			else {
				this.motherWorkText.text = 'Occupation:\nNone';
			}
		}
		else if (this.game.currentStage >= 2){
			if (this.game.activeButtonRight[0].data.values.work.acceptedWorkName){
				this.motherWorkText.text = 'Occupation:\n'+this.game.activeButtonRight[0].data.values.work.acceptedWorkName;
				if (this.game.activeButtonRight[0].data.values.retired){
					this.motherWorkText.text = 'Occupation:\nRetired\n'+this.game.activeButtonRight[0].data.values.work.acceptedWorkName;
				}
			}
			else {
				this.motherWorkText.text = 'Occupation:\nNone';
			}
		}
	}

	updateCharacterWork(){
		if (this.game.currentStage == 4 && this.game.activeButtonCharacter[2]){
			if (this.game.activeButtonCharacter[2].data.values.work.acceptedWorkName){
				this.workText.text = 'Work: '+this.game.activeButtonCharacter[2].data.values.work.acceptedWorkName;
			}
			else {
				this.workText.text = 'Work: None';
			}
		}
		else if (this.game.currentStage == 5 && this.game.activeButtonCharacter[1]){
			if (this.game.activeButtonCharacter[1].data.values.work.acceptedWorkName){
				this.workText.text = 'Work: '+this.game.activeButtonCharacter[1].data.values.work.acceptedWorkName;
			}
			else {
				this.workText.text = 'Work: None';
			}
		}
		else {
			this.workText.text = 'Work: None';
		}
	}

	updateDegree(){
		if (this.game.degree){
			this.degreeText.text = 'Degree: '+this.game.degree;
		}
	}

	updateWork(){
		this.updateFatherWork();
		this.updateMotherWork();
		this.updateCharacterWork();	
	}

	updateMultipliers(){
		this.speedMultiplierText.text = 'Speed Multiplier: '+this.game.speedMultiplier;
		// this.moneyMultiplierText.text = 'Money Multiplier: '+this.game.moneyMultiplier;
		// this.expMultiplierText.text = 'Experience Multiplier: '+this.game.expMultiplier;
	}


}