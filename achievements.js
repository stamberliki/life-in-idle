export class achievements{

	constructor(game){
		this.game = game;
		this.achievementsList = [];
		this.textDescriptionName = ['Riches To Rags',
									'Rags To Riches',
									'Im Back!',
									'You Passed, But also failed',
									'You\'re a bad',
									'What now?',
									'Becoming a Service Crew',
									'Becoming a Cashier',
									'Becoming a Dishwasher',
									'Becoming a Legislator',
									'Becoming a Teacher',
									'Becoming a Delivery Driver',
									'Becoming a Nurse',
									'Becoming a Primary School Teacher',
									'Becoming a Customer Service',
									'Becoming a Data Analyst',
									'Becoming a Graphic Artist',
									'Becoming a Architect',
									'Becoming a Lawyer',
									'Becoming a Professional Doctor',
									'Becoming a Software Developer',
									'Becoming a Pharmacist',
									'Becoming a Pilot',
									'Becoming a Engineer'];
		this.textDescription = ['...\'s about to go down',
								'Started from the bottow now we\'re here',
								'Whaazzaaapp!',
								'Eh?',
								'Its either you don\'t know what you are doing\nor you are just bad',
								'We are in the endgame now',
								'Becoming a Service Crew',
								'Becoming a Cashier',
								'Becoming a Dishwasher',
								'Becoming a Legislator',
								'Becoming a Teacher',
								'Becoming a Delivery Driver',
								'Becoming a Nurse',
								'Becoming a Primary School Teacher',
								'Becoming a Customer Service',
								'Becoming a Data Analyst',
								'Becoming a Graphic Artist',
								'Becoming a Architect',
								'Becoming a Lawyer',
								'Becoming a Professional Doctor',
								'Becoming a Software Developer',
								'Becoming a Pharmacist',
								'Becoming a Pilot',
								'Becoming a Engineer'];

	    this.fakeBg = this.game.add.image(0, 0,'achievementsBg').setOrigin(0).setScale(2);
	    this.fakeBg.depth = 2;
	    this.fakeBg.alpha = 0.01;
	    this.fakeBg.setData('isPointed', false);
	    this.fakeBg.setInteractive();
	    this.fakeBg.on('pointerup',function(){
	    	this.fakeBg.data.values.isPointed = false;
	    },this);
	    this.fakeBg.on('pointerout',function(){
	    	this.fakeBg.data.values.isPointed = false;
	    },this);
	    this.fakeBg.on('pointerdown',function(){
	    	this.fakeBg.data.values.isPointed = true;
	    	this.fakeBg.data.values.pointerY = this.game.input.y;
	    	this.fakeBg.data.values.oldY = this.bg.y;
	    	for (let x = 0 ; x != this.achievementsList.length ; x++){
	    		this.achievementsList[x].data.values.oldY = this.achievementsList[x].y;
	    	}
	    },this);

		this.bg = this.game.add.nineslice(0,0,400,300,'achievementsBg',114).setOrigin(0).setScale(2);
		this.bg.depth = 2;

		this.button = this.game.add.sprite(640, 140,'achievementsButton',0).setOrigin(0).setScale(2);
		this.button.depth = 1;
	    this.button.setInteractive();
		this.button.on('pointerout', function(){
			this.button.setFrame(0);
		}, this);
		this.button.on('pointerover', function(){
			this.button.setFrame(1);
		}, this);
		this.button.on('pointerup', function(){
			this.show();
			this.game.disableButtonsEvent(this.game);
		}, this);

	    this.close = this.game.add.image(746,32,'closeButton',0).setOrigin(0).setScale(2);
	    this.close.depth = 2;
	    this.close.setInteractive();
	    this.close.on('pointerout',function() {
	        this.close.setFrame(0);
	    },this);
	    this.close.on('pointerover',function() {
	        this.close.setFrame(1);
	    },this);
	    this.close.on('pointerup',function(){
	        this.hide();
			this.game.enableButtonsEvent(this.game);
	    },this);
		this.createAchievementList();
		this.bg.resize(400,130+(48*(this.achievementsList.length/5)));

	    this.game.input.on('gameobjectmove', function(pointer,gameObject){
	    	if (gameObject === this.fakeBg){
		    	if (this.fakeBg.data.values.isPointed){
		    		this.bg.y = this.fakeBg.data.values.oldY - (this.fakeBg.data.values.pointerY - pointer.y);
		    		if (this.bg.y <= 0 && this.bg.y >= this.bg.height-518){
				    	for (let x = 0 ; x != this.achievementsList.length ; x++){
				    		this.achievementsList[x].y = this.achievementsList[x].data.values.oldY - (this.fakeBg.data.values.pointerY - pointer.y);
				    	}	
		    		}
		    		if (this.bg.y <= this.bg.height-518){
		    			this.bg.y = this.bg.height-518;
				    	for (let x = 0 ; x != this.achievementsList.length ; x++){
				    		this.achievementsList[x].y = (114+(96*(Math.trunc(x/5)+1)))+(this.bg.height-518);
				    	}	
		    		}
		    		if (this.bg.y >= 0){
		    			this.bg.y = 0;
				    	for (let x = 0 ; x != this.achievementsList.length ; x++){
				    		this.achievementsList[x].y = 114+(96*(Math.trunc(x/5)+1))
				    	}	
		    		}
		    	}
		    }
	    }, this);

		this.hide();
	}

	show(){
		this.bg.setVisible(true);
		this.close.setVisible(true);
		this.fakeBg.setVisible(true);
		for (let x = 0 ; x != this.achievementsList.length ; x++){
			this.achievementsList[x].setVisible(true);
		}
	}

	hide(){
		this.bg.setVisible(false);
		this.close.setVisible(false);
		this.fakeBg.setVisible(false);
		for (let x = 0 ; x != this.achievementsList.length ; x++){
			this.achievementsList[x].setVisible(false);
		}
	}

	unlock(index){
		if (!this.achievementsList[index].data.values.unlocked){
			this.achievementsList[index].data.values.unlocked = true;
			this.achievementsList[index].setTint(0xffffff);
			this.game.speedMultiplier += 0.1;
			this.achievementsList[index].data.values.descriptionPopup.popupText.text = this.textDescription[index];
	    	this.achievementsList[index].data.values.descriptionPopup.resize();
		}
	}

	createAchievementList(){
		for (let x = 0 ; x != 25 ; x++){
			this.achievementsList.push(this.game.add.image(130+(54*((x+1)-(Math.trunc((x)/5)*5)))+(54*(x-(Math.trunc((x)/5)*5))),
				114+(96*(Math.trunc(x/5)+1)),'achievementIcons',x).setOrigin(0.5).setScale(2).setVisible(false));
			this.achievementsList[x].depth = 2;
			this.achievementsList[x].setTint(0x696969);
			this.achievementsList[x].setData({
				unlocked: false,
			});
			this.createPopupDesc(x);
			this.achievementsList[x].setInteractive();
			this.achievementsList[x].on('pointerover', function(){
				this.achievementsList[x].data.values.descriptionPopup.show();
			}, this);
			this.achievementsList[x].on('pointerout', function(){
				this.achievementsList[x].data.values.descriptionPopup.hide();
			}, this);
			let buttonData = this.achievementsList[x].data.values;
			buttonData.descriptionPopup.resize();

		    this.game.input.on('gameobjectmove', function(pointer,gameObject){
		    	if (gameObject === this.achievementsList[x]){
			    	if (buttonData.descriptionPopup.isPointed){
			    		buttonData.descriptionPopup.popupBG.x = pointer.x+8;
			    		buttonData.descriptionPopup.popupBG.y = pointer.y+8;
			    		buttonData.descriptionPopup.popupText.x = pointer.x+16;
			    		buttonData.descriptionPopup.popupText.y = pointer.y+32;
			    		buttonData.descriptionPopup.popupTextName.x = pointer.x+16;
			    		buttonData.descriptionPopup.popupTextName.y = pointer.y+16;
			    		if (buttonData.descriptionPopup.popupBG.x+(buttonData.descriptionPopup.popupBG.width*2) > 800){
			    			buttonData.descriptionPopup.popupBG.x -= buttonData.descriptionPopup.popupBG.width*2;
			    		buttonData.descriptionPopup.popupTextName.x = buttonData.descriptionPopup.popupBG.x+8;
			    		buttonData.descriptionPopup.popupText.x = buttonData.descriptionPopup.popupBG.x+8;
			    		}
			    	}
			    }
		    }, this);
		}
	}

	createPopupDesc(index){
		let buttonData = this.achievementsList[index].data.values;
		let _this = this;
		buttonData.descriptionPopup = new function(){
	    	this.popupBG = _this.game.add.nineslice(0,0,16,16,'descriptionPopup',4);
	    	this.isPointed = false;
	    	this.popupText = _this.game.add.bitmapText(0,0,'mainFont2','????????');
	    	this.popupText.depth = 3;
	    	this.popupTextName = _this.game.add.bitmapText(0,0,'mainFont',_this.textDescriptionName[index]).setFontSize(8);
	    	this.popupTextName.depth = 3;
	    	this.popupBG.setScale(2);
	    	this.popupBG.depth = 3;
	    	
	    	this.show = function(){
	    		this.popupBG.setVisible(true);
	    		this.popupText.setVisible(true);
	    		this.popupTextName.setVisible(true);
	    		this.isPointed = true;
	    	}

	    	this.hide = function(){
	    		this.popupBG.setVisible(false);
	    		this.popupText.setVisible(false);
	    		this.popupTextName.setVisible(false);
	    		this.isPointed = false;
	    	}

	        this.resize = function(){
	    		this.popupBG.resize((Math.max(this.popupText.getTextBounds().local.width, this.popupTextName.getTextBounds().local.width)/2)+8,
	    			((this.popupTextName.getTextBounds().local.height+this.popupText.getTextBounds().local.height)/2)+12);
	        }

		}
		buttonData.descriptionPopup.hide();
	}

}