export function buyMenuItemsData(game,itemNumber,x,y){

	function getObject(desc,costMoney,gainMoney,gainExp,timeMultiplier,point,itemNumber){
		return {
				icon:game.add.image(x,y,'buyMenuIcons',itemNumber).setOrigin(0).setScale(2),
				desc: desc,
				costMoney: costMoney,
				gainMoney: gainMoney,
				gainExp: gainExp,
				timeMultiplier: timeMultiplier,
				iconItemNumber: itemNumber,
				isBrought: false,
				canBeBrought: false,
				isUsed: false,
				point: point,
				};
	}

	switch(itemNumber){
		case 0:
			return getObject('0000000000\n000000000000',100,0,2,1,1,itemNumber);
		case 1:
			return getObject('0000000000\n000000000000',0,0,2,1,1,itemNumber);
		case 2:
			return getObject('0000000000\n000000000000',120,0,2,1,1,itemNumber);
		case 3:
			return getObject('0000000000\n000000000000',110,0,3,1,1,itemNumber);
		case 4:
			return getObject('0000000000\n000000000000',50,0,3,1,1,itemNumber);
		case 5:
			return getObject('0000000000\n000000000000',85,0,3,1,1,itemNumber);
		case 6:
			return getObject('0000000000\n000000000000',120,0,3,1,1,itemNumber);
		case 7:
			return getObject('0000000000\n000000000000',180,0,3,1,1,itemNumber);
		case 8:
			return getObject('0000000000\n000000000000',25,0,3,1,1,itemNumber);
		case 9:
			return getObject('0000000000\n000000000000',27,0,3,1,1,itemNumber);
		case 10:
			return getObject('0000000000\n000000000000',32,0,3,1,1,itemNumber);
		case 11:
			return getObject('0000000000\n000000000000',200,0,3,1,1,itemNumber);
		case 12:
			return getObject('0000000000\n000000000000',500,0,3,1,1,itemNumber);
		case 13:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 14:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 15:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 16:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 17:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 18:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 19:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 20:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 21:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 22:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 23:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 24:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 25:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 26:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 27:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 28:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 29:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 30:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 31:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
		case 32:
			return getObject('0000000000\n000000000000',250,0,3,1,1,itemNumber);
	}

}