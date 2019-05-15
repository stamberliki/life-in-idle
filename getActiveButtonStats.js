export function getActiveButtonStats(game,location,stageNo,buttonNo,buffs){
	var buff = [];
	var popupEvent = new game.popupEvent(game);

	function getDefault(){
		return {
			stage: stageNo,
			number: buttonNo,
	        pause: true,
	        pausedMidway: true,
	        itemEquipPass: true,
	        optionsPass: true,
		};
	}

	switch (location){
		case 'left':
			switch (stageNo){
				case 1:
					switch(buttonNo){
						case 1:
							buff.push(buffs(6));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'CARE',
							        unlocked: true,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 0,
							        isCare: true,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:30000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 2:
					switch(buttonNo){
						case 1:
							buff.push(buffs(6));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'CARE',
							        unlocked: true,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 0,
							        isCare: true,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:30000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 3:
					switch(buttonNo){
						case 1:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 4:
					switch(buttonNo){
						case 1:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 5:
					switch(buttonNo){
						case 1:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
			}

		case 'right':
			switch (stageNo){
				case 1:
					switch(buttonNo){
						case 1:
							buff.push(buffs(6));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									default: getDefault(),
							        description: 'CARE',
							        unlocked: true,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 0,
							        isCare: true,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:30000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 2:
					switch(buttonNo){
						case 1:
							buff.push(buffs(6));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									default: getDefault(),
							        description: 'CARE',
							        unlocked: true,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 0,
							        isCare: true,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:30000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 3:
					switch(buttonNo){
						case 1:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 4:
					switch(buttonNo){
						case 1:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 5:
					switch(buttonNo){
						case 1:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
			}

		case 'character':
			switch (stageNo){
				case 1:
					switch(buttonNo){
						case 1:
							buff.push(buffs(2));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'CRY',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 10000,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        textDescription: '',
							        holdEvent: true,
							        timeEvent: game.time.addEvent({
							            delay:2000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(1));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'POOP',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 3,
							        requiredExpToUnlock: 50,
							        requiredMoneyToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 50',
							        timeEvent: game.time.addEvent({
							            delay:5000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(4));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'SMILE',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 0,
							        requiredExpToUnlock: 250,
							        requiredMoneyToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 250',
							        timeEvent: game.time.addEvent({
							            delay:5000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 4:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'CRAWL',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 5,
							        requiredExpToUnlock: 550,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 550',
							        timeEvent: game.time.addEvent({
							            delay: 7000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 5:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'STAND',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 11,
							        requiredExpToUnlock: 800,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 800\nCRAWL: 1',
							        timeEvent: game.time.addEvent({
							            delay:13000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 6:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'WALK',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 18,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nSTAND: 2',
							        timeEvent: game.time.addEvent({
							            delay:20000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						default:
							return true;
					}
				case 2:
					switch(buttonNo){
						case 1:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'PLAY',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 4,
							        timeEvent: game.time.addEvent({
							            delay:60000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'WALK',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 37,
							        requiredExpToUnlock: 2000,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:35000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'RUN',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 55,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:50000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						default:
							return true;
					}
				case 3:
					switch(buttonNo){
						case 1:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'PLAY',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 4,
							        timeEvent: game.time.addEvent({
							            delay:60000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'DAYCARE',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 500,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: false,
							        itemEquipIndex: 5,
							        ignoreSingleButtonOnly: true,
							        popupEvent: popupEvent.createCategoriesEvent('1',
							        	{text:"Cheap Daycare" , cost: '1', gain: 1,button: buttonNo},
						                {text:"Normal Daycare" , cost: '2', gain: 1,button: buttonNo},
						                {text:"Public Daycare" , cost: '3', gain: 1,button: buttonNo},
						                {text:"Private Daycare" , cost: '4', gain: 1,button: buttonNo},
						                {text:"Top-Class Daycare" , cost: '5', gain: 1,button: buttonNo},
						                {text:"World-Class Daycare" , cost: '6', gain: 1,button: buttonNo},
						            ),
							        timeEvent: game.time.addEvent({
							            delay:300000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(8));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'STUDY',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 500,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 5,
							        timeEvent: game.time.addEvent({
							            delay:60000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						default:
							return true;
					}
				case 4:
					switch(buttonNo){
						case 1:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'PLAY',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 4,
							        timeEvent: game.time.addEvent({
							            delay:60000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'PRIMARY SCHOOL',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 500,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: false,
							        itemEquipIndex: 5,
							        ignoreSingleButtonOnly: true,
							        popupEvent: popupEvent.createCategoriesEvent('1',
							        	{text:"Cheap School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Normal School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Public School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Private School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Top-Class School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"World-Class School" , cost: 1, gain: 1, button: buttonNo},
						            ),
						            // randomEvent: {25:'false',50:'false',75:'false',100:'false',},
							        timeEvent: game.time.addEvent({
							            delay:600000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(8));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'STUDY',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 500,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 5,
							        timeEvent: game.time.addEvent({
							            delay:60000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						default:
							return true;
					}
				case 5:
					switch(buttonNo){
						case 1:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'PLAY',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 4,
							        timeEvent: game.time.addEvent({
							            delay:90000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'STUDY',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 4,
							        timeEvent: game.time.addEvent({
							            delay:90000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'WORK',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
						case 4:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'SECONDARY SHOOL',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 1,
							        textDescription: '',
							        itemRequired: false,
							        itemEquipIndex: 4,
							        timeEvent: game.time.addEvent({
							            delay:90000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 5:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									default: getDefault(),
							        description: 'COLLEGE',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 0,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: false,
							        itemEquipIndex: 4,
							        timeEvent: game.time.addEvent({
							            delay:90000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						default:
							return true;
					}
			}
	}

}