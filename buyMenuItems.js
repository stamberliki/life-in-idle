export function buyMenuItems(game, list,data){

	function createItems(position, array){
		let x = 6;
		let y = 16;
		x = (x+((array.length*138)-(Math.trunc(array.length/3)*416)))+(416*(position-1));
		y = y+(600+(Math.trunc(array.length/3)*192));
		
		let items = game.add.sprite(x,y,'buyMenuItems',0).setOrigin(0);
		items.setData('buyButton',game.add.sprite(x+16,y+118,'buyMenuButtons',0).setOrigin(0).setScale(2));
		items.setData({
			icon:game.add.image(x+30,y+14,'buyMenuIcons',game.buyMenuItemsCount).setOrigin(0).setScale(2),
			desc: 'desc',
			costMoney: 1,
			costExp: 1,
			});
		let buttonData = items.data.values;
		buttonData.buyButton.setInteractive();
		buttonData.buyButton.isSold = false;
		buttonData.buyButton.on('pointerover',function(){
			if (!buttonData.buyButton.isSold){
				buttonData.buyButton.setFrame(1);
			}
		});
		buttonData.buyButton.on('pointerout',function(){
			if (!buttonData.buyButton.isSold){
				buttonData.buyButton.setFrame(0);
			}
		});
		buttonData.buyButton.on('pointerup',function(){
			buttonData.buyButton.setFrame(2);
			buttonData.buyButton.isSold = true;
		});
		items.setScale(2);
		game.buyMenuItemsCount = game.buyMenuItemsCount + 1 || 0;
		return items;
	}

	list.toy.push(createItems(1,list.toy));
	list.toy.push(createItems(1,list.toy));
	list.toy.push(createItems(1,list.toy));
	list.toy.push(createItems(1,list.toy));
	list.toy.push(createItems(1,list.toy));
	list.toy.push(createItems(1,list.toy));
	list.b.push(createItems(2,list.b));
	list.b.push(createItems(2,list.b));
	list.b.push(createItems(2,list.b));
	list.b.push(createItems(2,list.b));
	list.b.push(createItems(2,list.b));
	list.c.push(createItems(3,list.c));
	list.c.push(createItems(3,list.c));
	list.c.push(createItems(3,list.c));
	list.c.push(createItems(3,list.c));
	list.c.push(createItems(3,list.c));
	list.c.push(createItems(3,list.c));
	list.d.push(createItems(4,list.d));

}