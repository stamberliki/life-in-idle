export function activeButton(game,buttonArray,position,data){
	let size = buttonArray.length;
	let x;
	let y;
	if ( position == 'left' ){
	    x = 64;
	    y = 213+((size+1)*54);
	}
	else if( position == 'right'){
	    x = 736;
	    y = 213+((size+1)*54);
	}
	else if ( position == 'character'){
	    x = 388+(size*160);
	    y = 26;
	    if (size > 2){
	        x = 388+((size-3)*160);
	        y = 74;
	    }
	}
    let button = game.add.sprite(x,y,'activeButton',1).setOrigin(0.5);
    button.setScale(2);
    button.setInteractive();
    button.setData(data);
    let buttonData = button.data.values;
    if(buttonData.work){
        buttonData.work.setButton(button);
        buttonData.holdEvent = game.add.sprite(x,y).setOrigin(0.5).setScale(2);
    }
    if(buttonData.recreation){
        buttonData.recreation.setButton(button);
        buttonData.popupEvent = buttonData.recreation.popupEvent;
    }
    buttonData.buttonNumber = size;
    buttonData.position = position;
    buttonData.description = game.add.bitmapText(x,y-6,'mainFont', data.description).setOrigin(0.5);
    buttonData.descriptionPopup = new function(){
    	this.popupBG = game.add.nineslice(0,0,16,16,'descriptionPopup',4);
    	this.isPointed = false;
    	this.popupText = game.add.bitmapText(x+18,y+44,'mainFont2','0000000000\n000000000000');
    	this.popupBG.setScale(2);
        this.popupBG.resize((this.popupText.getTextBounds().local.width/2)+8,(this.popupText.getTextBounds().local.height/2)+8);
    	
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

        this.destroy = function(){
            this.popupBG.destroy();
            this.popupText.destroy();
        }
    };
    buttonData.descriptionPopup.hide();
    buttonData.timeEvent.args = [button.data.values.gain, button];

    for (var a = 0 ; a != buttonData.buff.length ; a++){
        buttonData.buff[a].setButton(button);
    }

    if (!buttonData.unlocked){
    	button.setFrame(3);
    }
    game.input.on('gameobjectmove',function(pointer,gameObject){
    	if (gameObject === button){
	    	if (buttonData.descriptionPopup.isPointed){
	    		buttonData.descriptionPopup.popupBG.x = pointer.x+8;
	    		buttonData.descriptionPopup.popupBG.y = pointer.y+8;
	    		buttonData.descriptionPopup.popupText.x = pointer.x+16;
	    		buttonData.descriptionPopup.popupText.y = pointer.y+16;
	    		buttonData.descriptionPopup.popupBG.setOrigin(0);
	    		buttonData.descriptionPopup.popupText.setOrigin(0);
	    	}
	    	if (buttonData.unlocked){
        		buttonData.descriptionPopup.hide();
	    	}
	    }
    });
    button.on('pointerout',function(){
        if(button.frame.name == 0){
            button.setFrame(1);
        	buttonData.descriptionPopup.hide();
        }
        else{
        	buttonData.descriptionPopup.hide();
        }
        if (buttonData.work){
            buttonData.work.hideHoldAnim();
        }
    });
    button.on('pointerover',function(){
        if (buttonData.itemRequired){
            if (buttonData.itemEquipIndex){
                let data = game.buyMenuCategories[buttonData.itemEquipIndex-1].data.values.itemSelect;
                if (!data){
                    buttonData.default.itemEquipPass = false;
                }
                else{
                    buttonData.default.itemEquipPass = true;
                }
            }
        }

        if(buttonData.default.itemEquipPass && buttonData.unlocked && !(buttonData.cannotMidPause && !buttonData.default.pause) &&
            !(!buttonData.timeEvent.loop && buttonData.timeEvent.hasDispatched && !buttonData.runOneWithLoop) && (
            (!buttonData.default.pause || !game.buttonLeftSelected && position == 'left' && !(buttonData.isCare && game.isCareSelected)) ||
            (!buttonData.default.pause || !game.buttonRightSelected && position == 'right' && !(buttonData.isCare && game.isCareSelected)) || 
            (!buttonData.default.pause || !game.buttonCharacterSelected && position == 'character' && game.isCareSelected) || buttonData.ignoreSingleButtonOnly)
            ){
            button.setFrame(0);
        }
        else if (!buttonData.unlocked){
        	buttonData.descriptionPopup.show();
        }
    });
    button.on('pointerup',function(){
    	game.checkItemEquip(game);
        if (buttonData.work){
            if (!buttonData.work.holdEvent.finished){
                return;
            }
            else if (!buttonData.work.holdTimeEvent.paused){
                buttonData.work.hideHoldAnim();
                return;
            }
        }
    	if (buttonData.unlocked && !(!buttonData.timeEvent.loop && buttonData.timeEvent.hasDispatched && !buttonData.runOneWithLoop)){

            if (buttonData.popupEvent){
                if (!buttonData.popupEvent.finished && !buttonData.popupEvent.requiredDelay){
                    buttonData.popupEvent.show();
                    buttonData.default.optionsPass = false;
                }
                else{
                    buttonData.default.optionsPass = true;
                }
            }

            if (buttonData.timeEvent.paused && buttonData.default.optionsPass && buttonData.default.itemEquipPass && !buttonData.cannotMidpause &&
            ((!game.buttonLeftSelected && position == 'left' && !(buttonData.isCare && game.isCareSelected)) ||
            (!game.buttonRightSelected && position == 'right' && !(buttonData.isCare && game.isCareSelected)) || 
            (!game.buttonCharacterSelected && position == 'character' && game.isCareSelected) || buttonData.ignoreSingleButtonOnly)){
                if (buttonData.isCare){
                    game.isCareSelected = true;
                }
                buttonData.timeEvent.paused = false;
                buttonData.default.pause = false;
                buttonData.default.pausedMidway = false;
                if (!buttonData.ignoreSingleButtonOnly){
                    if (position == 'left'){
                        game.buttonLeftSelected = true;
                    }
                    else if (position == 'right'){
                        game.buttonRightSelected = true;
                    }
                    else if (position == 'character'){
                        game.buttonCharacterSelected = button;
                    }
                }
            }
            else if (!buttonData.timeEvent.paused && !buttonData.default.pause){
                buttonData.default.pause = true;
                button.anims.play('activeButtonStop',true);
                if (buttonData.timeEvent.getProgress()*buttonData.timeEvent.delay+3000 < buttonData.timeEvent.delay){
	                game.time.addEvent({
			            delay:3000, callback: function(){
			            	button.setFrame(1);
			            	buttonData.timeEvent.paused = true;
			            	button.anims.remove('activeButtonStop');
                            if (!buttonData.ignoreSingleButtonOnly){
                                if (position == 'left'){
                                    game.buttonLeftSelected = false;
                                }
                                else if (position == 'right'){
                                    game.buttonRightSelected = false;
                                }
                                else if (position == 'character'){
                                    game.buttonCharacterSelected = false;
                                }
                            }
			            },
	                });
	                buttonData.default.pausedMidway = true;
                }
                if (game.buttonCharacterSelected && buttonData.isCare){
                    game.buttonCharacterSelected.data.values.timeEvent.paused = true;
                    game.buttonCharacterSelected.data.values.default.pausedMidway = true;
                    game.buttonCharacterSelected.data.values.default.pause = true;
                    game.buttonCharacterSelected.anims.remove('activeButtonStop');
                    game.buttonCharacterSelected.setFrame(1);
                }
                if ((position == 'left' || position == 'right') && game.isCareSelected && buttonData.isCare){
                	game.isCareSelected = false;
                    game.buttonCharacterSelected = false;
				}
            }
            if (buttonData.work){
                if (!buttonData.work.holdTimeEventDelay.paused){
                    buttonData.work.hideHoldAnim();
                    return;
            }
            }
        }
    });
    buttonArray.push(button);
	
}