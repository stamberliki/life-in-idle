export function buyMenuItemsData(game,itemNumber,x,y){

	function getObject(name, desc,costMoney,gainMoney,gainExp,point,multiplier,itemNumber){
		return {
				icon:game.add.image(x,y,'buyMenuIcons',itemNumber).setOrigin(0).setScale(2),
				desc: desc,
				name: name,
				costMoney: costMoney,
				gainMoney: gainMoney,
				gainExp: gainExp,
				timeMultiplier: multiplier,
				iconItemNumber: itemNumber,
				isBrought: false,
				canBeBrought: false,
				isUsed: false,
				point: point,
				};
	}

	switch(itemNumber){
		case 0:
			return getObject('Wooden Bedside Table','Requires 4 wood planks',245,0,2,1,1,itemNumber);//BST
		case 1:
			return getObject('Regular Bedside Table','Upgraded version of\nthe wooden one',615,0,2,2,2,itemNumber);
		case 2:
			return getObject('Traditional Bedside Table','Victorian Era bedside table',990,0,2,3,3,itemNumber);
		case 3:
			return getObject('Steel Bedside Table','Rustproof',2475,0,3,4,5,itemNumber);
		case 4:
			return getObject('Round Bedside Table','This is clearly the \nviolation of the cube law',3960,0,3,5,9,itemNumber);
		case 5:
			return getObject('Open Bedside Table','Dont put your expensive\nthings here',9900,0,3,6,16,itemNumber);
		case 6:
			return getObject('Glass Bedside Table','Dont stand on it',15840,0,3,7,29,itemNumber);
		case 7:
			return getObject('Metal Bedside Table','Note of death not included',39600,0,3,8,50,itemNumber);
		case 8:
			return getObject('Modern Bedside Table','Just put black and \bwhite on it and boom,\bmodern design',63360,0,3,9,88,itemNumber);
		case 9:
			return getObject('Low-end Computer','CRT Monitor and a\n5kg casing',3150,0,3,3,8,itemNumber);//cmp
		case 10:
			return getObject('Average Computer','You can run minecraft\nwith this',12600,0,3,6,40,itemNumber);
		case 11:
			return getObject('High-end Computer','But will it run crysis?',184320,0,3,9,200,itemNumber);
		case 12:
			return getObject('Wooden Crib','This suppose to\nbe expensive',0,0,3,1,1,itemNumber);//crb
		case 13:
			return getObject('Regular Crib','Upgraded version of\nthw wooden vrib',400,0,3,2,2,itemNumber);
		case 14:
			return getObject('Spring Crib','Boing!',630,0,3,3,3,itemNumber);
		case 15:
			return getObject('Foldable Crib','Dont put the baby when folding',1575,0,3,4,5,itemNumber);
		case 16:
			return getObject('Round Crib','This is clearly the \nviolation of the cube law',2520,0,3,5,9,itemNumber);
		case 17:
			return getObject('Cozy Crib','How cozy it is?',6300,0,3,6,16,itemNumber);
		case 18:
			return getObject('Net Crib','No, its not for the fish',10080,0,3,7,29,itemNumber);
		case 19:
			return getObject('Rocking Crib','Dont roll on it',25200,0,3,8,50,itemNumber);
		case 20:
			return getObject('Modern Crib','Just put black and \bwhite on it and boom,\bmodern design',40320,0,3,9,88,itemNumber);
		case 21:
			return getObject('Wooden Desk','Just a scrap wood\nput together',250,0,3,1,1,itemNumber);//dsk
		case 22:
			return getObject('Regular Desk','Improve version of\nthe wooden desk',620,0,3,2,2,itemNumber);
		case 23:
			return getObject('Traditional Desk','A duplicate of the\npresidental desk',990,0,3,3,3,itemNumber);
		case 24:
			return getObject('Office Desk','They stole this from someone\'s office',2475,0,3,4,5,itemNumber);
		case 25:
			return getObject('Round Desk','This is clearly the \nviolation of the cube law',3960,0,3,5,9,itemNumber);
		case 26:
			return getObject('Steel Desk','Rustproof',9900,0,3,6,16,itemNumber);
		case 27:
			return getObject('Glass Desk','Dont make it a gaming desk',15840,0,3,7,29,itemNumber);
		case 28:
			return getObject('Metal Desk','Comes with more drawers',39600,0,3,8,50,itemNumber);
		case 29:
			return getObject('Moden Desk','Just put black and \bwhite on it and boom,\bmodern design',63360,0,3,9,88,itemNumber);
		case 30:
			return getObject('Low-end Console','Its not what you thinking',900,0,3,3,7,itemNumber);//gts
		case 31:
			return getObject('Low-end Cellphone','7777\n33\n66\n3 66\n88\n333\n7777',720,0,3,3,3,itemNumber);
		case 32:
			return getObject('Average Console','I\'ve brick this since I was a kid,\nits my first official console,\nand it never fixed,\nand it lasted a month(?)\n \n-Dev',3600,0,3,6,34,itemNumber);
		case 33:
			return getObject('Average Cellphone','The phone of tomorrow',2880,0,3,6,15,itemNumber);
		case 34:
			return getObject('High-end Console','If only we have more\nportable consoles',23040,0,3,9,107,itemNumber);
		case 35:
			return getObject('High-end Cellphone','They remove my jack!',18435,0,3,9,77,itemNumber);
		case 36:
			return getObject('Regular Bed','Get the foam, frame later',475,0,3,2,2,itemNumber);//MB
		case 37:
			return getObject('Cozy Regular Bed','Requires 3 wool\nand 3 wood planks',1235,0,3,3,4,itemNumber);
		case 38:
			return getObject('Regular Post Bed','Dont even think about it',1890,0,3,4,6,itemNumber);
		case 39:
			return getObject('Regular Storage Bed','Save drawer space,\n300 IQ right here',4950,0,3,5,11,itemNumber);
		case 40:
			return getObject('Regular Iron Frame Bed','This must be\nthe cheapest',7560,0,3,6,19,itemNumber);
		case 41:
			return getObject('Regular Brass Bed','I never see this kind of bed\n-Dev',19800,0,3,7,33,itemNumber);
		case 42:
			return getObject('Regular Ornament Bed','Feel like royalty',30240,0,3,8,57,itemNumber);
		case 43:
			return getObject('Regular Sleigh Bed','Reindeer not included',79200,0,3,9,81,itemNumber);
		case 44:
			return getObject('Regular Modern Bed','Just put black and \bwhite on it and boom,\bmodern design',120960,0,3,10,100,itemNumber);
		case 45:
			return getObject('Queen Size Bed','Get the foam, frame later',735,0,3,3,3,itemNumber);//QSB
		case 46:
			return getObject('Cozy Queen Size Bed','Requires 3 wool\nand 3 wood planks',1935,0,3,4,5,itemNumber);
		case 47:
			return getObject('Queen Size Post Bed','Dont even think about it',2935,0,3,5,9,itemNumber);
		case 48:
			return getObject('Queen Size Storage Bed','Save drawer space,\n300 IQ right here',7335,0,3,6,16,itemNumber);
		case 49:
			return getObject('Queen Size Iron Frame Bed','This must be\nthe cheapest',11740,0,3,7,28,itemNumber);
		case 50:
			return getObject('Queen Size Brass Bed','I never see this kind of bed\n-Dev',29340,0,3,8,49,itemNumber);
		case 51:
			return getObject('Queen Size Ornament Bed','Feel like royalty',46945,0,3,9,86,itemNumber);
		case 52:
			return getObject('Queen Size Sleigh Bed','Reindeer not included',117360,0,3,10,91,itemNumber);
		case 53:
			return getObject('Queen Size Modern Bed','Just put black and \bwhite on it and boom,\bmodern design',18775,0,3,1,150,itemNumber);
		case 54:
			return getObject('Paper And Penicl','Pen is mightier than the sword\nExcept is a pencil',155,0,10,1,1,itemNumber);//ScSu
		case 55:
			return getObject('Drawing Materials','Appreciate kid\'s drawings',400,0,12,2,2,itemNumber);
		case 56:
			return getObject('Alphabet Book','A-B-C-D-E-F-G-H-I-J-K\nGJFGKCDTNOP!',630,0,16,3,3,itemNumber);
		case 57:
			return getObject('Dictionary','Checking on how to spell a four letter word,\nJous tu bi shur',1575,0,20,4,5,itemNumber);
		case 58:
			return getObject('Encyclopedia','Book of facts,\nuntil it revised',2520,0,25,5,9,itemNumber);
		case 59:
			return getObject('Basic Math','2+2 is 4',6300,0,31,6,16,itemNumber);
		case 60:
			return getObject('Grammar 101','Your need too check\nyoure grammar',10080,0,38,7,29,itemNumber);
		case 61:
			return getObject('Computer Literacy Book','People need this tbh',25200,0,48,8,50,itemNumber);
		case 62:
			return getObject('Digital Encyclopedia','The future is now',40320,0,60,9,88,itemNumber);
		case 63:
			return getObject('Small Bed','Get the foam, frame later',290,0,3,1,1,itemNumber);//sBed
		case 64:
			return getObject('Cozy Small Bed','Requires 3 wool\nand 3 wood planks',730,0,3,2,2,itemNumber);
		case 65:
			return getObject('Small Post Bed','Dont even think about it',1170,0,3,3,3,itemNumber);
		case 66:
			return getObject('Small Storage Bed','Save drawer space,\n300 IQ right here',2925,0,3,4,5,itemNumber);
		case 67:
			return getObject('Small Iron Frame Bed','This must be\nthe cheapest',4680,0,3,5,9,itemNumber);
		case 68:
			return getObject('Small Brass Bed','I never see this kind of bed\n-Dev',11700,0,3,6,16,itemNumber);
		case 69:
			return getObject('Small Ornament Bed','Feel like royalty',18720,0,3,7,29,itemNumber);
		case 70:
			return getObject('Small Sleigh Bed','Reindeer not included',46800,0,3,8,50,itemNumber);
		case 71:
			return getObject('Small Modern Bed','Just put black and \bwhite on it and boom,\bmodern design',74880,0,3,9,88,itemNumber);
		case 72:
			return getObject('Building Blocks','Play this with your kid,\nIt will be a engineer someday',225,0,25,1,1,itemNumber);//toys
		case 73:
			return getObject('Jigsaw Puzzle','Do you wanna play a game?',560,0,29,2,2,itemNumber);
		case 74:
			return getObject('Teddy Bear','Fluffy',900,0,33,3,3,itemNumber);
		case 75:
			return getObject('Puzzle Block','If it fits, it sits',2250,0,38,4,5,itemNumber);
		case 76:
			return getObject('Toy Train','CHOO! CHOO!',3600,0,44,5,9,itemNumber);
		case 77:
			return getObject('Small Toy Cars','It will last a day',9000,0,50,6,16,itemNumber);
		case 78:
			return getObject('Toy Truck','It will last 2 days',14400,0,58,7,29,itemNumber);
		case 79:
			return getObject('Remote Control Toy Car','Battery last a week',36000,0,67,8,50,itemNumber);
		case 80:
			return getObject('Toy Drone','Weapon not included',57600,0,77,9,88,itemNumber);
	}

}