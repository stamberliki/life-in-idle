export function buyMenuItems(game, list,data){

	function createItems(position, array, itemID, categoryNumber=0){
		let x = 6;
		let y = 16;
		x = (x+((array.length*138)-(Math.trunc(array.length/3)*416)))+(416*(position-1));
		y = 600+(Math.trunc(array.length/3)*192);
		
		let items = game.add.sprite(x,y,'buyMenuItems',0).setOrigin(0);
		items.setData(data(game,game.buyMenuItemsCount,x+32,y+14));
		items.setData('buyButton',game.add.sprite(x+16,y+118,'buyMenuButtons',0).setOrigin(0).setScale(2));
		let buttonData = items.data.values;
		buttonData.buyButtonText = game.add.bitmapText(x+64, y+134, 'mainFont', 'BUY').setOrigin(0.5);
		buttonData.buyButton.setInteractive();
		buttonData.position = position;
		buttonData.itemNumber = array.length;
		buttonData.array = list[categoryNumber];
		buttonData.itemDefault = itemDefault;
		buttonData.id = itemID;
		buttonData.descriptionPopup = new function(){
	    	this.popupBG = game.add.nineslice(0,0,16,16,'descriptionPopup',4,8);
	    	this.popupBG.setScale(2);
	    	this.popupBG.depth = 4;
	    	this.isPointed = false;
			this.popupText = game.add.bitmapText(0,0,'mainFont2',buttonData.name+'\n'+'Cost: '+buttonData.costMoney+' money');
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
		    		buttonData.descriptionPopup.popupBG.y = pointer.y+(600-154)+(game.buyMenuCamera.scrollY-600);
		    		buttonData.descriptionPopup.popupText.x = pointer.x+(416*(buttonData.position-1)-244);
		    		buttonData.descriptionPopup.popupText.y = pointer.y+(610-154)+(game.buyMenuCamera.scrollY-600);
		    		if (buttonData.descriptionPopup.popupBG.x+(buttonData.descriptionPopup.popupBG.width*2) > 416*(buttonData.position)){
		    			buttonData.descriptionPopup.popupBG.x -= buttonData.descriptionPopup.popupBG.width*2;
		    			buttonData.descriptionPopup.popupText.x = buttonData.descriptionPopup.popupBG.x+8;
		    		}
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
					let data = game.buyMenuCategorySelect.data.values.itemSelect.data.values;
					if (data.isUsed && data.position == buttonData.position){
						data.isUsed = false;
						data.buyButtonText.setText('USE');
						data.buyButton.setFrame(0);
						game.buyMenuCategorySelect.data.values.prevItem = game.buyMenuCategorySelect.data.values.itemSelect;
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

	function itemDefault(item){
		item.buyButton.setFrame(0);
		item.isBrought = false;
		item.canBeBrought = false;
		item.isUsed = false;
		item.buyButtonText.setText('BUY');
    	item.descriptionPopup.isPointed = false;
		item.descriptionPopup.popupText.setText(item.costMoney+'\n'+item.desc);
		item.descriptionPopup.popupBG.resize((item.descriptionPopup.popupText.getTextBounds().local.width/2)+8,
			(item.descriptionPopup.popupText.getTextBounds().local.height/2)+8);

	}

	function getItemlist(index){
		return list[index].data.values.itemList;
	}
    //BST
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst1'));
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst2'));
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst3'));
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst4'));
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst5'));
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst6'));
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst7'));
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst8'));
	getItemlist(0).push(createItems(1, getItemlist(0), 'bst9'));

	//CMP
	getItemlist(1).push(createItems(2, getItemlist(1), 'cmp1', 1));
	getItemlist(1).push(createItems(2, getItemlist(1), 'cmp2', 1));
	getItemlist(1).push(createItems(2, getItemlist(1), 'cmp3', 1));

	//CRB
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb1'));
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb2'));
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb3'));
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb4'));
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb5'));
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb6'));
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb7'));
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb8'));
	getItemlist(2).push(createItems(3, getItemlist(2), 'crb9'));

	//DSK
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk1'));
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk2'));
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk3'));
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk4'));
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk5'));
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk6'));
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk7'));
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk8'));
	getItemlist(3).push(createItems(4, getItemlist(3), 'dsk9'));

	//GTS
	getItemlist(4).push(createItems(5, getItemlist(4), 'gts1', 4));
	getItemlist(4).push(createItems(5, getItemlist(4), 'gts2', 4));
	getItemlist(4).push(createItems(5, getItemlist(4), 'gts3', 4));
	getItemlist(4).push(createItems(5, getItemlist(4), 'gts4', 4));
	getItemlist(4).push(createItems(5, getItemlist(4), 'gts5', 4));
	getItemlist(4).push(createItems(5, getItemlist(4), 'gts6', 4));

	//MB
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb1'));
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb2'));
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb3'));
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb4'));
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb5'));
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb6'));
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb7'));
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb8'));
	getItemlist(5).push(createItems(6, getItemlist(5), 'mb9'));

	//QSB
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb1'));
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb2'));
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb3'));
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb4'));
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb5'));
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb6'));
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb7'));
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb8'));
	getItemlist(6).push(createItems(7, getItemlist(6), 'qsb9'));

	//ScSu
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu1', 7));
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu2', 7));
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu3', 7));
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu4', 7));
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu5', 7));
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu6', 7));
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu7', 7));
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu8', 7));
	getItemlist(7).push(createItems(8, getItemlist(7), 'scsu9', 7));

	//sBed
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed1'));
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed2'));
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed3'));
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed4'));
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed5'));
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed6'));
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed7'));
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed8'));
	getItemlist(8).push(createItems(9, getItemlist(8), 'sbed9'));

	//toys
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys1'));
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys2'));
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys3'));
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys4'));
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys5'));
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys6'));
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys7'));
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys8'));
	getItemlist(9).push(createItems(10, getItemlist(9), 'toys9'));
}