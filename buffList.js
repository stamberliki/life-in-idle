export function buffList(buffNumber){

	function popupManager(a,game,positions){
		a.descriptionPopup = new function(){
	    	this.popupBG = game.add.sprite(positions.x+5,positions.y+28,'buffDescription',0).setOrigin(0);
	    	this.popupBG.setScale(2);
	    	this.popupBG.depth = 1;
	    	this.popupText = game.add.bitmapText(positions.x+14,positions.y+36,'mainFont2',a.buffTextDescription);
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
					this.x = positions.x;
					this.y = positions.y;
					this.name = 'Disgust';
					this.icon = game.add.image(this.x, this.y, 'buffIcons', 0).setOrigin(0);
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 80;
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
					this.buffTextDescription = '';
					this.icon.visible = false;
					this.icon.setScale(2);
					this.icon.setInteractive();
					this.chance = 25;
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
					this.chance = 20;
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
						for (var x = 0 ; x != this.game.currentBuffCharacter.length ; x++){
							if (this.game.currentBuffCharacter[x].isActive && !this.game.currentBuffCharacter[x].immune){
								this.game.currentBuffCharacter[x].deactivate();
							}
						}
						for (var x = 0 ; x != this.game.currentBuffLeft.length ; x++){
							if (this.game.currentBuffLeft[x].isActive && !this.game.currentBuffLeft[x].immune){
								this.game.currentBuffLeft[x].deactivate();
							}
						}
						for (var x = 0 ; x != this.game.currentBuffRight.length ; x++){
							if (this.game.currentBuffRight[x].isActive && !this.game.currentBuffRight[x].immune){
								this.game.currentBuffRight[x].deactivate();
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
					this.chance = 80;
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
					this.chance = 100;
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
	}
}