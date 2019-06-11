export function buyMenuItems(game, list,data){

	function createItems(position, array, categoryNumber=0){
		let x = 6;
		let y = 16;
		x = (x+((array.length*138)-(Math.trunc(array.length/3)*416)))+(416*(position-1));
		y = y+(600+(Math.trunc(array.length/3)*192));
		
		let items = game.add.sprite(x,y,'buyMenuItems',0).setOrigin(0);
		items.setData(data(game,game.buyMenuItemsCount,x+32,y+14));
		items.setData('buyButton',game.add.sprite(x+16,y+118,'buyMenuButtons',0).setOrigin(0).setScale(2));
		let buttonData = items.data.values;
		buttonData.buyButtonText = game.add.bitmapText(x+64, y+134, 'mainFont', 'BUY').setOrigin(0.5);
		buttonData.buyButton.setInteractive();
		buttonData.position = position;
		buttonData.itemNumber = array.length;
		buttonData.array = list[categoryNumber];
		buttonData.descriptionPopup = new function(){
	    	this.popupBG = game.add.nineslice(0,0,16,16,'descriptionPopup',4,8);
	    	this.popupBG.setScale(2);
	    	this.popupBG.depth = 4;
	    	this.isPointed = false;
			this.popupText = game.add.bitmapText(0,0,'mainFont2','Cost: '+buttonData.costMoney+'\n'+buttonData.desc);
			this.popupText.depth = 4;
			this.popupBG.resize((this.popupText.getTextBounds().local.width/2)+8, (this.popupText.getTextBounds().local.height/2)+8);
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
    	buttonData.descriptionPopup.hide();

	    game.input.on('gameobjectmove',function(pointer,gameObject){
	    	if (gameObject === buttonData.buyButton){
		    	if (buttonData.descriptionPopup.isPointed){
		    		buttonData.descriptionPopup.popupBG.x = pointer.x+(416*(buttonData.position-1)-250);
		    		buttonData.descriptionPopup.popupBG.y = pointer.y+(600-154);
		    		buttonData.descriptionPopup.popupText.x = pointer.x+(416*(buttonData.position-1)-244);
		    		buttonData.descriptionPopup.popupText.y = pointer.y+(610-154);
		    		buttonData.descriptionPopup.popupBG.setOrigin(0);
		    		buttonData.descriptionPopup.popupText.setOrigin(0);
		    	}
		    }
	    });

		buttonData.buyButton.on('pointerover',function(){
			if (!buttonData.isUsed){
				buttonData.buyButton.setFrame(1);
			}
	        buttonData.descriptionPopup.show();
		});
		buttonData.buyButton.on('pointerout',function(){
			if (!buttonData.isUsed){
				buttonData.buyButton.setFrame(0);
			}
	        buttonData.descriptionPopup.hide();
		});
		buttonData.buyButton.on('pointerup',function(){
			if (buttonData.canBeBrought && !buttonData.isUsed){
				buttonData.buyButton.setFrame(2);
				buttonData.isBrought = true;
				buttonData.isUsed = true;
				buttonData.buyButtonText.setText('USED');
				if (game.buyMenuCategorySelect.data.values.itemSelect){
					let data = game.buyMenuCategorySelect.data.values.itemSelect;
					if (data.data.values.isUsed && data.data.values.position == buttonData.position){
						data.data.values.isUsed = false;
						data.data.values.buyButtonText.setText('USE');
						data.data.values.buyButton.setFrame(0);
						game.buyMenuCategorySelect.data.values.itemRender.destroy();
					}
				}
				game.buyMenuCategorySelect.data.values.itemSelect = items;
				game.checkItemEquip(game);
				game.renderBuyMenuItem(game);
			}
		});
		buttonData.buyButton.on('pointerdown',function(){
			if (game.moneyAmount.data.values.amount >= buttonData.costMoney && game.moneyAmount.data.values.amount >= 0 && !buttonData.isBrought){
				if (buttonData.array.data.values.needPrimaryItem){
					if (list[buttonData.array.data.values.primaryItemPointer].data.values.itemSelect){
						game.moneyAmount.data.values.amount -= buttonData.costMoney;
						game.moneyAmount.setText(game.moneyAmount.data.values.amount);
						game.buyMenuMoney.setText(game.moneyAmount.data.values.amount);
						buttonData.canBeBrought = true;
						buttonData.descriptionPopup.popupText.setText(buttonData.desc);
						buttonData.descriptionPopup.popupBG.resize((buttonData.descriptionPopup.popupText.getTextBounds().local.width/2)+8, (buttonData.descriptionPopup.popupText.getTextBounds().local.height/2)+8);
					}
				}
				else {
					game.moneyAmount.data.values.amount -= buttonData.costMoney;
					game.moneyAmount.setText(game.moneyAmount.data.values.amount);
					game.buyMenuMoney.setText(game.moneyAmount.data.values.amount);
					buttonData.canBeBrought = true;
					buttonData.descriptionPopup.popupText.setText(buttonData.desc);
					buttonData.descriptionPopup.popupBG.resize((buttonData.descriptionPopup.popupText.getTextBounds().local.width/2)+8, (buttonData.descriptionPopup.popupText.getTextBounds().local.height/2)+8);
				}
			}
			if (!buttonData.canBeBrought){
				buttonData.buyButton.setFrame(3);
			}
		});
		items.setScale(2);
		game.buyMenuItemsCount = game.buyMenuItemsCount + 1 || 0;
		return items;
	}

	function getItemlist(index){
		return list[index].data.values.itemList;
	}

	getItemlist(0).push(createItems(1,getItemlist(0)));

	getItemlist(1).push(createItems(2,getItemlist(1)));

	getItemlist(2).push(createItems(3,getItemlist(2),2));

	getItemlist(3).push(createItems(4,getItemlist(3),2));

	getItemlist(4).push(createItems(5,getItemlist(4)));
	getItemlist(4).push(createItems(5,getItemlist(4)));
	getItemlist(4).push(createItems(5,getItemlist(4)));
	getItemlist(4).push(createItems(5,getItemlist(4)));

	getItemlist(5).push(createItems(6,getItemlist(5),5));
	getItemlist(5).push(createItems(6,getItemlist(5),5));
	getItemlist(5).push(createItems(6,getItemlist(5),5));

	getItemlist(6).push(createItems(7,getItemlist(6),6));
	getItemlist(6).push(createItems(7,getItemlist(6),6));

	getItemlist(7).push(createItems(8,getItemlist(7),7));

}