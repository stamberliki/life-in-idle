export function nextStageData(game, stage){
	switch(stage){
		case 1:
			return game.expAmount.data.values.amount >= 400+((400*.25)*(game.tier-1)) && game.buyMenuCategories[8].data.values.itemSelect;
		case 2:
			return game.expAmount.data.values.amount >= 750+((750*.25)*(game.tier-1)) && game.buyMenuCategories[3].data.values.itemSelect && game.buyMenuCategories[0].data.values.itemSelect;
		case 3:
			return game.expAmount.data.values.amount >= 1500+((1500*.25)*(game.tier-1));
		case 4:
			return game.expAmount.data.values.amount >= 2750+((2750*.25)*(game.tier-1)) && game.buyMenuCategories[5].data.values.itemSelect;
		case 5:
			return game.expAmount.data.values.amount >= 4500+((4500*.25)*(game.tier-1)) && game.buyMenuCategories[6].data.values.itemSelect;
		default:
			return true;
	}
}