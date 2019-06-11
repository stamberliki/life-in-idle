export class popupEvent{

	constructor(game){
		this.game = game;
		this.popup;
		this.approveButton;
		this.disapproveButton;
		this.buttons = [];
		this.finished = false;
		this.text;
		this.type;
		this.requiredDelay;
		this.selectedButtonText;
		this.closeButton = this.game.add.image(746,32,'closeButton',0).setOrigin(0);
		this.closeButton.setScale(2);
	    this.closeButton.depth = 3;
	    this.closeButton.setVisible(false);
	    this.closeButton.setInteractive();
	    this.closeButton.on('pointerout',function() {
	        this.closeButton.setFrame(0);
	    },this);
	    this.closeButton.on('pointerover',function() {
	        this.closeButton.setFrame(1);
	    },this);
	    this.closeButton.on('pointerup',function(){
	    	this.hide();
	    },this);
	}

	createAcknowledgeEvent(text,approveButtonEvent = ''){
		this.type = 'createAcknowledgeEvent';
		this.game.disableButtonsEvent(this.game);
		this.closeButton.setVisible(true);
		this.popup = this.game.add.nineslice(400, 300, 400, 300, 'popupEvent', [143, 193, 158, 193]).setOrigin(0.5).setScale(2);
		this.popup.depth = 2;
		this.text = this.game.add.bitmapText(400,280,'mainFont2',text).setFontSize(16).setOrigin(0.5).setCenterAlign();
		this.text.depth = 2;
		this.approveButton = this.game.add.sprite(400,332,'button32',0).setScale(2);
		this.approveButton.depth = 2;
		this.approveButton.setInteractive();
		this.approveButton.setData('text', this.game.add.bitmapText(400,332,'mainFont','OK').setFontSize(8).setOrigin(0.5));
		this.approveButton.data.values.text.depth = 2;
		this.popup.resize((this.text.getTextBounds().local.width/2)+400, (this.text.getTextBounds().local.height/2)+316);
		this.popup.setOrigin(0.5);

		this.approveButton.on('pointerout',function(){
			this.approveButton.setFrame(0);
		},this);
		this.approveButton.on('pointerover',function(){
			this.approveButton.setFrame(1);
		},this);
		if (approveButtonEvent){
			this.approveButton.on('pointerup',approveButtonEvent, this);
		}
		else{
			this.approveButton.on('pointerup',function(){
				this.hide();
			},this);	
		}
		return this;
	}

	createTwoChoiceEvent(text, approveButton, disapproveButton){
		this.type = 'twoChoiceEvent';
		this.closeButton.setVisible(true);
		this.popup = this.game.add.nineslice(400, 300, 400, 300, 'popupEvent', [143, 193, 158, 193]).setOrigin(0.5).setScale(2);
		this.popup.depth = 2;
		this.text = this.game.add.bitmapText(400, 275,'mainFont2',text).setFontSize(16).setOrigin(0.5).setCenterAlign();
		this.popup.resize(Math.max((this.text.getTextBounds().local.width/2)+400,496),(this.text.getTextBounds().local.height/2)+322);
        this.popup.setOrigin(0.5).setScale(2);
		this.text.depth = 2;

		this.approveButton = this.game.add.sprite(344,342,'button32',0).setScale(2);
		this.approveButton.depth = 2;
		this.approveButton.setData('text',this.game.add.bitmapText(344,342,'mainFont',approveButton.text).setFontSize(8).setOrigin(0.5));
		this.approveButton.data.values.text.depth = 2;
		this.approveButton.setInteractive();

		this.disapproveButton = this.game.add.sprite(456,342,'button32',0).setScale(2);
		this.disapproveButton.depth = 2;
		this.disapproveButton.setData('text',this.game.add.bitmapText(456,342,'mainFont',disapproveButton.text).setFontSize(8).setOrigin(0.5));
		this.disapproveButton.data.values.text.depth = 2;
		this.disapproveButton.setInteractive();
		this.hide();

		this.approveButton.on('pointerout',function(){
			this.approveButton.setFrame(0);
		},this);
		this.approveButton.on('pointerover',function(){
			this.approveButton.setFrame(1);
		},this);
		this.approveButton.on('pointerup', function(){
			approveButton.event();
			this.hide();
		}, this);

		this.disapproveButton.on('pointerout',function(){
			this.disapproveButton.setFrame(0);
		},this);
		this.disapproveButton.on('pointerover',function(){
			this.disapproveButton.setFrame(1);
		},this);
		this.disapproveButton.on('pointerup', function(){
			disapproveButton.event();
			this.hide();
		}, this);
		this.closeButton.on('pointerup',function(){
			disapproveButton.event();
			this.hide();
		}, this);
		return this;
	}

	createCategoriesEvent(text,...args){
		this.type = 'categoriesEvent';
		this.closeButton.setVisible(true);
		this.popup = this.game.add.nineslice(400, 300, 400, 300, 'popupEvent', [143, 193, 158, 193]).setOrigin(0.5).setScale(2);
		this.popup.depth = 2;
		for (let x = 0 ; x != args.length ; x++){
			let button = this.game.add.sprite(400,220+(32*(x+1)),'button',0).setInteractive().setScale(2);
			button.depth = 2;
			button.setData('text', this.game.add.bitmapText(400,220+(32*(x+1)),'mainFont',args[x].text).setFontSize(8).setOrigin(0.5));
			button.data.values.text.depth = 2;
			let buttonData = button.data.values;
			buttonData.cost = args[x].cost;
			this.popupManager(button, args[x].cost, this);

			button.on('pointerout',function(){
				button.setFrame(0);
				buttonData.descriptionPopup.hide();
			});
			button.on('pointerover',function(){
				button.setFrame(1);
				buttonData.descriptionPopup.show();
			});
			button.on('pointerup',function(){
				this.game.moneyAmount.data.values.amount -= button.data.values.cost;
				this.game.moneyAmount.setText(this.game.moneyAmount.data.values.amount);
				this.game.activeButtonCharacter[args[x].button-1].data.values.gain = args[x].gain;
				this.game.activeButtonCharacter[args[x].button-1].data.values.timeEvent.args[0] = args[x].gain;
				this.finish(buttonData);
			},this);
			this.buttons.push(button);
		}
		this.popup.resize(496, ((this.buttons.length*32)/2)+316);
		this.popup.setOrigin(0.5);
		for (let x = 0 ; x != this.buttons.length ; x++){
			if (x == 0){
				this.buttons[x].y = (316-((32*this.buttons.length)/2));
				this.buttons[x].data.values.text.y = this.buttons[x].y;
			}
			else{
				this.buttons[x].y = this.buttons[x-1].y+36;
				this.buttons[x].data.values.text.y = this.buttons[x].y;
			}
		}
		this.text = this.game.add.bitmapText(400,this.buttons[0].y-26,'mainFont2',text).setFontSize(16).setOrigin(0.5);
		this.text.depth = 2;

		this.hide();
		return this;
	}

	nestedCategoriesEvent(event,...args ){
		for (let x = 0 ; x != this.buttons.length ; x++){
			this.buttons[x].off('pointerup');
			this.buttons[x].data.values.secondButtons = new popupEvent(this.game).createCategoriesEvent(args[x].text, args[x].args[0]);
			this.buttons[x].on('pointerup', function(){
				this.selectedButtonText = this.buttons[x].data.values.text.text;
				this.buttons[x].data.values.secondButtons.selectedButtonText = this.selectedButtonText;
				this.buttons[x].data.values.secondButtons.show();
				this.hide();
			},this);

			this.buttons[x].data.values.secondButtons.buttons[0].on('pointerup', function(){
				if (event){
					event.event(args[x].args[0].text, this.selectedButtonText);
				}
			},this);
			for ( let y = 1; y != args[x].args.length ; y++){
				this.buttons[x].data.values.secondButtons.addButton(event, args[x].args[y]);
			}
		}
	}

	popupManager(button, text, args){
		let data = button.data.values;
		data.descriptionPopup =  new function(){
			this.popupBG = args.game.add.nineslice(0,0,36,19,'descriptionPopup',4);
			this.popupBG.depth = 3;
	    	this.popupBG.setScale(2);
	    	this.popupText = args.game.add.bitmapText(0,0,'mainFont2',text+' Cash');
	    	this.popupText.depth = 3;
			this.popupBG.resize(this.popupText.getTextBounds().local.width,this.popupText.getTextBounds().local.height+4);
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

	        this.destroy = function(){
	            this.popupBG.destroy();
	            this.popupText.destroy();
			}
		};
		data.descriptionPopup.hide();
	    args.game.input.on('gameobjectmove',function(pointer,gameObject){
	    	if (gameObject === button){
		    	if (data.descriptionPopup.isPointed){
		    		data.descriptionPopup.popupBG.x = pointer.x+8;
		    		data.descriptionPopup.popupBG.y = pointer.y+8;
		    		data.descriptionPopup.popupText.x = pointer.x+16;
		    		data.descriptionPopup.popupText.y = pointer.y+16;
		    		data.descriptionPopup.popupBG.setOrigin(0);
		    		data.descriptionPopup.popupText.setOrigin(0);

		    	}
		    }
	    });
	}

	addButton(event,buttons){
		let button = this.game.add.sprite(400,220+(32*(this.buttons.length)),'button',0).setInteractive().setScale(2);
		button.depth = 2;
		button.setData('text', this.game.add.bitmapText(400,220+(32*(this.buttons.length)),'mainFont',buttons.text).setFontSize(8).setOrigin(0.5));
		button.data.values.text.depth = 2;
		let buttonData = button.data.values;
		buttonData.cost = buttons.cost;
		this.popupManager(button, buttons.cost, this);

		button.on('pointerout',function(){
			button.setFrame(0);
			buttonData.descriptionPopup.hide();
		});
		button.on('pointerover',function(){
			button.setFrame(1);
			buttonData.descriptionPopup.show();
		});
		button.on('pointerup',function(){
			if(event){
				event.event(buttons.text, this.selectedButtonText);
			}
			this.game.moneyAmount.data.values.amount -= button.data.values.cost;
			this.game.moneyAmount.setText(this.game.moneyAmount.data.values.amount);
			this.game.activeButtonCharacter[buttons.button-1].data.values.gain = buttons.gain;
			this.game.activeButtonCharacter[buttons.button-1].data.values.timeEvent.args[0] = buttons.gain;
			this.finish(buttonData);
		},this);
		this.buttons.push(button);

		this.resize();
		this.hide();
	}

	resize(){
		this.popup.resize(496, ((this.buttons.length*32)/2)+316);
		this.popup.setOrigin(0.5);
		for (let x = 0 ; x != this.buttons.length ; x++){
			if (x == 0){
				this.buttons[x].y = (316-((32*this.buttons.length)/2));
				this.buttons[x].data.values.text.y = this.buttons[x].y;
			}
			else{
				this.buttons[x].y = this.buttons[x-1].y+36;
				this.buttons[x].data.values.text.y = this.buttons[x].y;
			}
		}
		this.text.y = this.buttons[0].y-26;
	}

	show (){
		this.game.disableButtonsEvent(this.game);
		this.closeButton.setVisible(true);
		this.popup.setVisible(true);
		this.text.setVisible(true);
		if (this.approveButton){
			this.approveButton.data.values.text.setVisible(true);
			this.approveButton.setVisible(true);
		}
		if (this.disapproveButton){
			this.disapproveButton.data.values.text.setVisible(true);
			this.disapproveButton.setVisible(true);
		}
		for (let x = 0 ; x != this.buttons.length ; x++){
			this.buttons[x].data.values.text.setVisible(true);
			this.buttons[x].setVisible(true);
		}
	}

	hide(){
		this.game.enableButtonsEvent(this.game);
		this.popup.setVisible(false);
		this.text.setVisible(false);
		this.closeButton.setVisible(false);
		if (this.approveButton){
			this.approveButton.data.values.text.setVisible(false);
			this.approveButton.setVisible(false);
		}
		if (this.disapproveButton){
			this.disapproveButton.data.values.text.setVisible(false);
			this.disapproveButton.setVisible(false);
		}
		for (let x = 0 ; x != this.buttons.length ; x++){
			this.buttons[x].data.values.text.setVisible(false);
			this.buttons[x].setVisible(false);
		}
	}

	destroy(){
		this.game.enableButtonsEvent(this.game);
		this.game = '';
		this.popup.destroy();
		this.text.destroy();
		this.closeButton.setVisible(false);
		if (this.approveButton){
			this.approveButton.data.values.text.destroy();
			this.approveButton.destroy();
		}
		if (this.disapproveButton){
			this.disapproveButton.data.values.text.destroy();
			this.disapproveButton.destroy();
		}
		for (let x = 0 ; x != this.buttons.length ; x++){
			this.buttons[x].data.values.text.destroy();
			this.buttons[x].destroy();
		}
		if (this.buttons.length != 0){
			this.buttons.length = 0;
		}
	}

	finish(buttonData){
		this.destroy();
		if (buttonData.descriptionPopup){
			buttonData.descriptionPopup.destroy();
		}
		this.finished = true;
	}

	setRequiredDelay(arg){
		this.requiredDelay = arg;
		return this;
	}

}