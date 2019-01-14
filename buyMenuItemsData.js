export function buyMenuItemsData(game,itemNumber,x,y){
	switch(itemNumber){
		case 0:
			return {
					icon:game.add.image(x,y,'buyMenuIcons',itemNumber).setOrigin(0).setScale(2),
					desc: 'desc',
					costMoney: 1,
					costExp: 1,
					};
		case 1:
			return {
					icon:game.add.image(x,y,'buyMenuIcons',itemNumber).setOrigin(0).setScale(2),
					desc: 'desc',
					costMoney: 1,
					costExp: 1,
					};
		case 2:
			return {
					icon:game.add.image(x,y,'buyMenuIcons',itemNumber).setOrigin(0).setScale(2),
					desc: 'desc',
					costMoney: 1,
					costExp: 1,
					};
	}
}