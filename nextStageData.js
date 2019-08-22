export function nextStageData(game, stage){
	switch(stage){
		case 1:
			return game.expAmount.data.values.amount >= 200+((200*.25)*(game.tier-1)) && game.buyMenuCategories[8].data.values.itemSelect;
		case 2:
			return game.expAmount.data.values.amount >= 500+((500*.25)*(game.tier-1)) && game.buyMenuCategories[8].data.values.itemSelect && game.buyMenuCategories[0].data.values;
		case 3:
			return game.expAmount.data.values.amount >= 800+((800*.25)*(game.tier-1));
		case 4:
			return game.expAmount.data.values.amount >= 1250+((1250*.25)*(game.tier-1)) && game.buyMenuCategories[8].data.values.itemSelect;
		case 5:
			return game.expAmount.data.values.amount >= 1750+((1750*.25)*(game.tier-1)) && game.buyMenuCategories[8].data.values.itemSelect;
		default:
			return true;
	}
}