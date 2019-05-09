export function buyMenuItemsData(game,itemNumber,x,y){

	function getObject(desc,costMoney,costExp,gainMoney,gainExp,timeMultiplier,itemNumber){
		return {
				icon:game.add.image(x,y,'buyMenuIcons',itemNumber).setOrigin(0).setScale(2),
				desc: desc,
				costMoney: costMoney,
				costExp: costExp,
				gainMoney: gainMoney,
				gainExp: gainExp,
				timeMultiplier: 1000,
				iconItemNumber: itemNumber,
				isBrought: false,
				canBeBrought: false,
				isUsed: false,
				};
	}

	switch(itemNumber){
		case 0:
			return getObject('0000000000\n000000000000',0,0,1,2,1,itemNumber);
		case 1:
			return getObject('0000000000\n000000000000',0,0,1,2,1,itemNumber);
		case 2:
			return getObject('0000000000\n000000000000',0,0,1,2,1,itemNumber);
		case 3:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
		case 4:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
		case 5:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
		case 6:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
		case 7:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
		case 8:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
		case 9:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
		case 10:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
		case 11:
			return getObject('0000000000\n000000000000',0,0,1,3,1,itemNumber);
	}

}