export function activeButton(game,buttonArray,position,data){
	let size = buttonArray.length;
	let x;
	let y;
	if ( position == 'left' ){
	    x = -1;
	    y = 189+((size+1)*54);
	}
	else if( position == 'right'){
	    x = 673;
	    y = 189+((size+1)*54);
	}
	else if ( position == 'character'){
	    x = 332+(size*160);
	    y = 8;
	    if (size > 2){
	        x = 332+((size-3)*160);
	        y = 32+16+8;
	    }
	}
    let button = game.add.sprite(x,y,'activeButton',1).setOrigin(0);
    button.setScale(2);
    button.setInteractive();
    button.setData(data);
    let buttonData = button.data.values;
    buttonData.buttonNumber = size;
    buttonData.position = position;
    buttonData.description = game.add.bitmapText(x+64,y+12,'mainFont', data.description).setOrigin(0.5);
    buttonData.descriptionPopup = new function(){
    	this.popupBG = game.add.sprite(x+72,y+58,'buttonDescription',0);
    	this.isPointed = false;
    	this.popupText = game.add.bitmapText(x+18,y+44,'mainFont2',buttonData.textDescription);
    	this.popupBG.setScale(2);
    	
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
        if(!buttonData.pause || (buttonData.timeEvent.paused && buttonData.unlocked) &&
        	((!game.buttonLeftSelected && position == 'left') ||
        	(!game.buttonRightSelected && position == 'right') || 
        	(!game.buttonCharacterSelected && position == 'character'))){
            button.setFrame(1);
        	buttonData.descriptionPopup.hide();
        }
        else{
        	buttonData.descriptionPopup.hide();
        }
    });
    button.on('pointerover',function(){
        if(!buttonData.pause || (buttonData.timeEvent.paused && buttonData.unlocked) &&
        	((!game.buttonLeftSelected && position == 'left') ||
        	(!game.buttonRightSelected && position == 'right') || 
        	(!game.buttonCharacterSelected && position == 'character'))){
            button.setFrame(0);
        }
        else if (!buttonData.unlocked){
        	buttonData.descriptionPopup.show();
        }
    });
    button.on('pointerup',function(){
    	game.checkItemEquip(game);
    	if (buttonData.unlocked){
    		if (buttonData.isCare){
    			game.isCareSelected = true;
    		}

    		let itemEquipPass = true;

    		if (buttonData.itemEquipIndex){
    			let data = game.buyMenuCategories[buttonData.itemEquipIndex-1].data.values.itemSelect;
    			if (!data){
    				itemEquipPass = false;
    			}
    		}

            if (buttonData.timeEvent.paused && 
        	(!game.buttonLeftSelected && position == 'left') ||
        	(!game.buttonRightSelected && position == 'right') || 
        	(!game.buttonCharacterSelected && position == 'character') && 
        	(game.isCareSelected) &&
        	(itemEquipPass)){
                buttonData.timeEvent.paused = false;
                buttonData.pause = false;
                buttonData.pausedMidway = false;
                if (position == 'left'){
                	game.buttonLeftSelected = true;
                }
                else if (position == 'right'){
                	game.buttonRightSelected = true;
                }
                else if (position == 'character'){
                	game.buttonCharacterSelected = true;
                }

            }
            else if (!buttonData.timeEvent.paused){
                buttonData.pause = true;
                button.anims.play('activeButtonStop',true);
                if (buttonData.timeEvent.getProgress()*buttonData.timeEvent.delay+3000 < buttonData.timeEvent.delay){
	                game.time.addEvent({
			            delay:3000, callback: function(){
			            	button.setFrame(1);
			            	buttonData.timeEvent.paused = true;
			            	button.anims.remove('activeButtonStop');
			                if (position == 'left'){
			                	game.buttonLeftSelected = false;
			                }
			                else if (position == 'right'){
			                	game.buttonRightSelected = false;
			                }
			                else if (position == 'character'){
			                	game.buttonCharacterSelected = false;
			                }
			            },
	                });
	                buttonData.pausedMidway = true;
                }
                if (!game.buttonCharacterSelected && (position == 'left' || position == 'right') && game.isCareSelected && buttonData.isCare){
                	game.isCareSelected = false;
				}
            }
        }
    });
    buttonArray.push(button);
	
}