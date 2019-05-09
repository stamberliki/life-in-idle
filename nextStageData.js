export function nextStageData(game, stage){
	switch(stage){
		case 1:
			return game.expAmount.data.values.amount >= 1500 && game.buyMenuCategories[0].data.values.itemSelect;
		case 2:
			return game.expAmount.data.values.amount >= 2000;
		case 3:
			return game.expAmount.data.values.amount >= 2000;
		case 4:
			return game.expAmount.data.values.amount >= 2000;
	}
}