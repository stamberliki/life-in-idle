export function buffList(buffNumber){

	function popupManager(a,game,positions){
		a.descriptionPopup = new function(){
	    	this.popupBG = game.add.nineslice(0,0,16,16,'descriptionPopup',4).setOrigin(0);
	    	this.popupBG.setScale(2);
	    	this.popupBG.depth = 1;
	    	this.popupTextName = game.add.bitmapText(0,0,'mainFont',a.name).setFontSize(8);
	    	this.popupText = game.add.bitmapText(0,0,'mainFont2',a.buffTextDescription);
    		this.popupBG.resize((Math.max(this.popupText.getTextBounds().local.width, this.popupTextName.getTextBounds().local.width)/2)+8,
    			((this.popupTextName.getTextBounds().local.height+this.popupText.getTextBounds().local.height)/2)+12);
	    	this.popupText.depth = 1;
	    	this.popupTextName.depth = 1;
	    	this.isPointed = false;

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

	    };
	    a.descriptionPopup.hide();
	    a.icon.on('pointerout',function(){
	    	a.descriptionPopup.hide();
	    },a);
	    a.icon.on('pointerover',function(){
	    	a.descriptionPopup.show();
	    },a);
	    game.input.on('gameobjectmove',function(pointer,gameObject){
	    	if (gameObject === a.icon){
		    	if (a.descriptionPopup.isPointed){
		    		a.descriptionPopup.popupBG.x = pointer.x+8;
		    		a.descriptionPopup.popupBG.y = pointer.y+8;
		    		a.descriptionPopup.popupText.x = pointer.x+16;
		    		a.descriptionPopup.popupText.y = pointer.y+32;
		    		a.descriptionPopup.popupTextName.x = pointer.x+16;
		    		a.descriptionPopup.popupTextName.y = pointer.y+16;
		    	}
		    }
	    });
	}

	switch(buffNumber){
		case 1:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Disgust';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 0).setOrigin(0);
					this.buffTextDescription = 'Guess they see something...\nwet';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 100;
					this.numberOfTurns = 0;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.buffType = 'debuff';
					this.button;
					this.buffDuration;
					popupManager(this,game,positions);
				}

				setButton(button){
					this.button = button;
				}

				active(){
					this.icon.visible = true;
					this.numberOfTurns = 1;
					this.isActive = true;
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale -= 0.5;
					}
				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale += 0.5;
					}
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}

			}
		case 2:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Irritated';
					this.description = 'desc';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 1).setOrigin(0);
					this.buffTextDescription = 'They can\'t take the noise';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 100;
					this.numberOfTurns = 0;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.buffType = 'debuff';
					this.button;
					this.buffDuration;
					popupManager(this,game,positions);

				}

				setButton(button){
					this.button = button;
				}

				active(){
					this.icon.visible = true;
					this.numberOfTurns = 1;
					this.isActive = true;
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale -= 0.5;
					}
				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale += 0.5;
					}
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}

			}
		case 3:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Cautious';
					this.description = 'desc';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 2).setOrigin(0);
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 100;
					this.numberOfTurns = -1;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.buffType = 'debuff';
					this.button;
					this.buffDuration;
					popupManager(this,game,positions);

				}

				setButton(button){
					this.button = button;
				}

				active(){
					this.icon.visible = true;
					this.isActive = true;
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale -= 0.2;
					}
					this.buffDuration = this.game.time.addEvent({
			            delay:10000, callback: this.deactivate, callbackScope: this,
					});
				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					this.buffDuration.destroy();
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale += 0.2;
					}
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}

			}
		case 4:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Happy';
					this.description = 'desc';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 3).setOrigin(0);
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 100;
					this.numberOfTurns = -1;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.buffType = 'buff';
					this.button;
					this.buffDuration;
					popupManager(this,game,positions);

				}

				setButton(button){
					this.button = button;
				}

				active(){
						for (var x = 0 ; x < this.game.currentBuffCharacter.length ; x++){
							if (this.game.currentBuffCharacter[x].isActive && !this.game.currentBuffCharacter[x].immune && this.game.currentBuffCharacter[x].buffType == 'debuff'){
								this.game.currentBuffCharacter[x].deactivate();
								x--;
							}
						}
						for (var x = 0 ; x < this.game.currentBuffLeft.length ; x++){
							if (this.game.currentBuffLeft[x].isActive && !this.game.currentBuffLeft[x].immune && this.game.currentBuffLeft[x].buffType == 'debuff'){
								this.game.currentBuffLeft[x].deactivate();
								x--;
							}
						}
						for (var x = 0 ; x < this.game.currentBuffRight.length ; x++){
							if (this.game.currentBuffRight[x].isActive && !this.game.currentBuffRight[x].immune && this.game.currentBuffRight[x].buffType == 'debuff'){
								this.game.currentBuffRight[x].deactivate();
								x--;
							}
						}
					this.buffDuration = this.game.time.addEvent({
			            delay:1000, callback: this.deactivate, callbackScope: this,
					});
					this.icon.visible = true;
					this.isActive = true;
				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}

			}
		case 5:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Stress';
					this.description = 'desc';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 4).setOrigin(0);
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 100;
					this.numberOfTurns = -1;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.buffType = 'debuff';
					this.button;
					this.buffDuration;
					popupManager(this,game,positions);

				}

				setButton(button){
					this.button = button;
				}

				active(){
					this.icon.visible = true;
					this.isActive = true;
					this.button.data.values.timeEvent.timeScale -= 0.3;

				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					this.button.data.values.timeEvent.timeScale += 0.3;
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}

			}
		case 6:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Tired';
					this.description = 'desc';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 5).setOrigin(0);
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 100;
					this.numberOfTurns = -1;
					this.isActive = false;
					this.buffType = 'debuff';
					this.buffNumber = buffNumber;
					this.button;
					this.buffDuration;
					popupManager(this,game,positions);

				}

				setButton(button){
					this.button = button;
				}

				active(){
					this.icon.visible = true;
					this.isActive = true;
					if (this.button.data.values.position == 'left'){
						for ( var x = 0 ; x != this.game.activeButtonLeft.length ; x++ ){
							this.game.activeButtonLeft[x].data.values.timeEvent.timeScale -= 0.3;
						}
					}
					else if (this.button.data.values.position == 'right'){
						for ( var x = 0 ; x != this.game.activeButtonRight.length ; x++ ){
							this.game.activeButtonRight[x].data.values.timeEvent.timeScale -= 0.3;
						}
					}
					this.buffDuration = this.game.time.addEvent({
			            delay:300000, callback: this.deactivate, callbackScope: this,
					});

				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					if (this.button.data.values.position == 'left'){
						for ( var x = 0 ; x != this.game.activeButtonLeft.length ; x++ ){
							this.game.activeButtonLeft[x].data.values.timeEvent.timeScale += 0.3;
						}
					}
					else if (this.button.data.values.position == 'right'){
						for ( var x = 0 ; x != this.game.activeButtonRight.length ; x++ ){
							this.game.activeButtonRight[x].data.values.timeEvent.timeScale += 0.3;
						}
					}
					this.buffDuration.destroy();
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}

			}
		case 7:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Toy Broke';
					this.description = 'desc';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 6).setOrigin(0);
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 10;
					this.numberOfTurns = -1;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.buffType = 'debuff';
					this.button;
					this.buffDuration;
					this.immune = true;
					popupManager(this,game,positions);

				}

				setButton(button){
					this.button = button;
				}

				active(){
					this.icon.visible = true;
					this.isActive = true;
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale -= 0.2;
					}
					this.buffDuration = this.game.time.addEvent({
			            delay:5000, callback: this.deactivate, callbackScope: this,
					});
				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					this.buffDuration.destroy();
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale += 0.2;
					}
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}

			}
		case 8:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Idea';
					this.description = 'desc';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 7).setOrigin(0);
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 30;
					this.numberOfTurns = -1;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.buffType = 'buff';
					this.button;
					this.buffDuration;
					this.immune = true;
					popupManager(this,game,positions);

				}

				setButton(button){
					this.button = button;
				}

				active(){
					this.icon.visible = true;
					this.isActive = true;
					this.game.activeButtonCharacter[1].data.values.timeEvent.timeScale += 
						this.game.buyMenuCategories[this.button.data.values.itemEquipIndex-1]
							.data.values.itemSelect.data.values.timeMultiplier / 100;
					this.buffDuration = this.game.time.addEvent({
			            delay:5000, callback: this.deactivate, callbackScope: this,
					});
				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					this.buffDuration.destroy();
					this.game.activeButtonCharacter[1].data.values.timeEvent.timeScale -= 
						this.game.buyMenuCategories[this.button.data.values.itemEquipIndex-1]
							.data.values.itemSelect.data.values.timeMultiplier / 100;
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}

			}
		case 9:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Back from the Beach';
					this.description = 'desc';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 8).setOrigin(0);
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 100;
					this.numberOfTurns = -1;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.button;
					this.buffDuration;
					popupManager(this,game,positions);

				}

				setButton(button){
					this.button = button;
				}

				active(){
					for (var x = 0 ; x < this.game.currentBuffCharacter.length ; x++){
						if (this.game.currentBuffCharacter[x].isActive && !this.game.currentBuffCharacter[x].immune){
							this.game.currentBuffCharacter[x].deactivate();
						}
					}
					for (var x = 0 ; x < this.game.currentBuffLeft.length ; x++){
						if (this.game.currentBuffLeft[x].isActive && !this.game.currentBuffLeft[x].immune){
							this.game.currentBuffLeft[x].deactivate();
						}
					}
					for (var x = 0 ; x < this.game.currentBuffRight.length ; x++){
						if (this.game.currentBuffRight[x].isActive && !this.game.currentBuffRight[x].immune){
							this.game.currentBuffRight[x].deactivate();
						}
					}
					this.game.speedMultiplier += .1;
					if (this.game.currentStage == 4){
						for (let x = 0 ; x != this.game.activeButtonCharacter.length ; x++){
							this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale = this.game.speedMultiplier;
						}
					}
					else if (this.game.currentStage == 5){
						this.game.activeButtonCharacter[1].data.values.timeEvent.timeScale = this.game.speedMultiplier;
					}

					this.buffDuration = this.game.time.addEvent({
			            delay:10000, callback: this.deactivate, callbackScope: this,
					});

					this.icon.visible = true;
					this.isActive = true;
				}

				deactivate(){
					this.game.speedMultiplier -= .1;
					if (this.game.currentStage == 4){
						for (let x = 0 ; x != this.game.activeButtonCharacter.length ; x++){
							this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale = this.game.speedMultiplier;
						}
					}
					else if (this.game.currentStage == 5){
						this.game.activeButtonCharacter[1].data.values.timeEvent.timeScale = this.game.speedMultiplier;
					}

					this.icon.visible = false;
					this.isActive = false;
					this.icon.x = this.x;
					this.icon.y = this.y;
					this.game.repositionBuffs(this.game);
				}
			}
		default:
			return class {
				constructor(game, positions){
					this.game = game;
					this.x;
					this.y;
					this.name;
					this.description;
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 0).setOrigin(0);
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.buffTextDescription;
					this.chance = 0;
					this.numberOfTurns = 0;
					this.isActive = false;
					this.buffNumber = buffNumber;
					this.buffType;
					this.button;
					this.buffDuration;
					this.immune;
					popupManager(this,game);
				}

				setButton(button){
					this.button = button;
				}

				active(){
				}

				deactivate(){
				}

				hide(){
					if (this.icon){
						this.icon.visible = false;
					this.icon.x = this.x;
					this.icon.y = this.y;
					}
					if (this.buffDuration){
						this.buffDuration.destroy();
					}
					this.isActive = false;
				}

				config(config){
					this.chance = config.chance;
					this.button = config.button;
				}

			}
	}
}