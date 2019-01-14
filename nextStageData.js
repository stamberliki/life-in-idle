export function nextStageData(game, stage){
	switch(stage){
		case 1:
			return game.expAmount.data.values.amount >= 1500;
		case 2:
			return game.expAmount.data.values.amount >= 2000;
	}
}