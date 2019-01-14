export function buffList(buffNumber){

	function popupManager(a,game,positions){
		a.descriptionPopup = new function(){
	    	this.popupBG = game.add.sprite(positions.x+5,positions.y+28,'buffDescription',0).setOrigin(0);
	    	this.popupBG.setScale(2);
	    	this.popupBG.depth = 1;
			this.description = 'description';
	    	this.popupText = game.add.bitmapText(positions.x+14,positions.y+36,'mainFont2',game.expAmount.data.values.amount);
	    	this.popupText.depth = 1;
	    	this.isPointed = false;
	    	this.show = function(){
	    		this.popupBG.setVisible(true);
	    		this.popupText.setVisible(true);
	    		this.isPointed = true;
	    	}

	    	this.hide = function(){
	    		this.popupBG.setVisible(false);
	    		this.popupText.setVisible(false);
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
		    		a.descriptionPopup.popupText.y = pointer.y+16;
		    		a.descriptionPopup.popupBG.setOrigin(0);
		    		a.descriptionPopup.popupText.setOrigin(0);

		    	}
		    }
	    });

	}

	switch(buffNumber){
		case 1:
			return class {
				constructor(game, positions){
					this.game = game;
					this.name = 'Disgust';
					this.icon = game.add.image(positions.x, positions.y, 'buffIcons', 0).setOrigin(0);
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 80;
					this.numberOfTurns = 0;
					this.isActive = false;
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

				}

			}
		case 2:
			return class {
				constructor(game, positions){
					this.game = game;
					this.name = 'Irritated';
					this.description = 'desc';
					this.icon = game.add.image(positions.x, positions.y, 'buffIcons', 1).setOrigin(0);
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 25;
					this.numberOfTurns = 0;
					this.isActive = false;
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
				}

			}
		case 3:
			return class {
				constructor(game, positions){
					this.game = game;
					this.name = 'Cautious';
					this.description = 'desc';
					this.icon = game.add.image(positions.x, positions.y, 'buffIcons', 2).setOrigin(0);
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 20;
					this.numberOfTurns = -1;
					this.isActive = false;
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
			            delay:90000, callback: this.deactivate, callbackScope: this,
					});
				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
					this.buffDuration.destroy();
					for ( var x = 0 ; x != this.game.activeButtonCharacter.length ; x++ ){
						this.game.activeButtonCharacter[x].data.values.timeEvent.timeScale += 0.2;
					}
				}

			}
		case 4:
			return class {
				constructor(game, positions){
					this.game = game;
					this.name = 'Happy';
					this.description = 'desc';
					this.icon = game.add.image(positions.x, positions.y, 'buffIcons', 3).setOrigin(0);
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 70;
					this.numberOfTurns = -1;
					this.isActive = false;
					this.buffType = 'buff';
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
					if (this.game.currentBuffCharacter){
						if (this.game.currentBuffCharacter.isActive){
							this.game.currentBuffCharacter.deactivate();
						}
					}
					if (this.game.currentBuffLeft){
						if (this.game.currentBuffLeft.isActive){
							this.game.currentBuffLeft.deactivate();
						}
					}
					if (this.game.currentBuffRight){
						if (this.game.currentBuffRight.isActive){
							this.game.currentBuffRight.deactivate();
						}
					}
					this.buffDuration = this.game.time.addEvent({
			            delay:1000, callback: this.deactivate, callbackScope: this,
					});

				}

				deactivate(){
					this.icon.visible = false;
					this.isActive = false;
				}

			}
		case 5:
			return class {
				constructor(game, positions){
					this.game = game;
					this.name = 'Stress';
					this.description = 'desc';
					this.icon = game.add.image(positions.x, positions.y, 'buffIcons', 4).setOrigin(0);
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 80;
					this.numberOfTurns = -1;
					this.isActive = false;
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
				}

			}
	}
}