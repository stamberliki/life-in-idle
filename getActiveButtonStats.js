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
							        totalCycle: 0,
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
							        totalCycle: 0,
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
							        totalCycle: 0,
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
							        totalCycle: 0,
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
							        totalCycle: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					}
				case 6:
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
							        totalCycle: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
						case 2:
							buff.push(buffs(0));
							buff[0] = new buff[0](game,{x:0, y: 0});
							return {
									default: getDefault(),
							        description: 'RETIRED',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        popupEvent: popupEvent.createTwoChoiceEvent('Your father will retire and gain\n'+
							        	((game.activeButtonLeft[0].data.values.totalCycle/100)*(game.activeButtonLeft[0].data.values.gain*.1))
							        	+' cash per cycle.\nIt will never receive or generate buff \nor debuffs and it will run permamently',{
								        	text: 'Yes',
								        	event: function(){
								        		let buttonData = game.activeButtonLeft[0].data.values;
								        		buttonData.gain = (buttonData.totalCycle/100)*(buttonData.gain*.25);
								        		buttonData.timeEvent.args[0] = buttonData.gain;
								        		buttonData.timeEvent.paused = false;
								        		buttonData.default.pause = false;
								        		buttonData.default.pausedMidway = false;
								        		buttonData.buffImmune = true;
								        		buttonData.buff[0].chance = 0;
								        		buttonData.retired = true;
								        		game.activeButtonLeft[0].disableInteractive();
								        		game.activeButtonLeft[1].disableInteractive();
								        		game.activeButtonLeft[1].data.values.retired = true;
								        		game.activeButtonLeft[0].setFrame(3);
								        	}
								        },{
								        	text: 'No',
								        	event: function(){
								        	}
								        }),
							        timeEvent: game.time.addEvent({
							            delay:5000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
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
							        totalCycle: 0,
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
							        totalCycle: 0,
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
							        totalCycle: 0,
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
							        totalCycle: 0,
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
							        totalCycle: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
							}
				case 6:
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
							        totalCycle: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true,
							        }),
							        work: new game.workManager(game),
							    };
					    case 2:
							buff.push(buffs(0));
							buff[0] = new buff[0](game,{x:0, y: 0});
							return {
									default: getDefault(),
							        description: 'RETIRED',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        popupEvent: popupEvent.createTwoChoiceEvent('Your mother will retire and gain\n'+
							        	((game.activeButtonRight[0].data.values.totalCycle+game.activeButtonRight[0].data.values.cycleCount)/100)*(game.activeButtonRight[0].data.values.gain*.25)+
							        	' cash per cycle.\nIt will never receive or generate buff \nor debuffs and it will run permamently',{
								        	text: 'Yes',
								        	event: function(){
								        		let buttonData = game.activeButtonRight[0].data.values;
								        		buttonData.gain = (buttonData.totalCycle/100)*(buttonData.gain*.25);
								        		buttonData.timeEvent.args[0] = buttonData.gain;
								        		buttonData.timeEvent.paused = false;
								        		buttonData.default.pause = false;
								        		buttonData.default.pausedMidway = false;
								        		buttonData.buffImmune = true;
								        		buttonData.buff[0].chance = 0;
								        		buttonData.retired = true;
								        		game.activeButtonRight[0].disableInteractive();
								        		game.activeButtonRight[1].disableInteractive();
								        		game.activeButtonRight[1].data.values.retired = true;
								        		game.activeButtonRight[0].setFrame(3);
								        	}
								        },{
								        	text: 'No',
								        	event: function(){
								        	}
								        }),
							        timeEvent: game.time.addEvent({
							            delay:5000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
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
							        gain: 1,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        textDescription: '',
							        holdEvent: true,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
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
							        requiredExpToUnlock: 30,
							        requiredMoneyToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 30',
							        timeEvent: game.time.addEvent({
							            delay:2000, loop:true, callback: game.expGain,
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
							        requiredExpToUnlock: 30,
							        requiredMoneyToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 30',
							        timeEvent: game.time.addEvent({
							            delay:3000, loop:true, callback: game.expGain,
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
							        gain: 8,
							        requiredExpToUnlock: 130,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 10,
							        textDescription: 'REQUIRED:\nEXP: 130',
							        timeEvent: game.time.addEvent({
							            delay: 5000, loop:true, callback: game.expGain,
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
							        gain: 10,
							        requiredExpToUnlock: 175,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 5,
							        textDescription: 'REQUIRED:\nEXP: 175\nCRAWL: 10',
							        timeEvent: game.time.addEvent({
							            delay:6000, loop:true, callback: game.expGain,
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
							        gain: 14,
							        requiredExpToUnlock: 300,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 5,
							        textDescription: 'REQUIRED: 300\nSTAND: 5',
							        timeEvent: game.time.addEvent({
							            delay:8000, loop:true, callback: game.expGain,
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
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							        textDescription: 'NEED ITEM:\nTOYS\n\nGets more exp depends\non an item',
							        itemRequired: true,
							        itemEquipIndex: 10,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'WALK',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 17,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 5,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:10000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'RUN',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 20,
							        requiredExpToUnlock: 560,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 5,
							        textDescription: 'REQUIRED: \nEXP: 560\nWALK: 5',
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
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
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							        textDescription: 'NEED ITEM:\nTOYS\n\nGets more exp depends\non an item',
							        itemRequired: true,
							        itemEquipIndex: 10,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'DAYCARE',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: false,
							        itemEquipIndex: 7,
							        ignoreSingleButtonOnly: true,
							        popupEvent: popupEvent.createCategoriesEvent('1',
							        	{text:"Cheap Daycare" , cost: '350', gain: 500,button: buttonNo},
						                {text:"Normal Daycare" , cost: '615', gain: 625,button: buttonNo},
						                {text:"Public Daycare" , cost: '1075', gain: 780,button: buttonNo},
						                {text:"Private Daycare" , cost: '1875', gain: 975,button: buttonNo},
						                {text:"Top-Class Daycare" , cost: '3280', gain: 1220,button: buttonNo},
						                {text:"World-Class Daycare" , cost: '5745', gain: 1525,button: buttonNo},
						            ),
							        timeEvent: game.time.addEvent({
							            delay:300000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(8));
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							        textDescription: 'NEED ITEM:\nSCHOOL SUPPLIES\n\nIncrease school progression time\nbut get a very small exp\nDepends on an item',
							        itemRequired: true,
							        itemEquipIndex: 8,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
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
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							        textDescription: 'NEED ITEM:\nTOYS\n\nGets more exp depends\non an item',
							        itemRequired: true,
							        itemEquipIndex: 10,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							        itemEquipIndex: 7,
							        ignoreSingleButtonOnly: true,
							        popupEvent: popupEvent.createCategoriesEvent('1',
							        	{text:"Cheap School" , cost: 920, gain: 575, button: buttonNo},
						                {text:"Normal School" , cost: 1380, gain: 720, button: buttonNo},
						                {text:"Public School" , cost: 2065, gain: 900, button: buttonNo},
						                {text:"Private School" , cost: 3100, gain: 1125, button: buttonNo},
						                {text:"Top-Class School" , cost: 4650, gain: 1400, button: buttonNo},
						                {text:"World-Class School" , cost: 6975, gain: 1755, button: buttonNo},
						            ),
							        timeEvent: game.time.addEvent({
							            delay:300000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(8));
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							        textDescription: 'NEED ITEM:\nSCHOOL SUPPLIES\n\nIncrease school progression time\nbut get a very small exp\nDepends on an item',
							        itemRequired: true,
							        itemEquipIndex: 8,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						default:
							return true;
					}
				case 5:
					switch(buttonNo){
						case 1:
							buff.push(buffs(0));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'RECREATION',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cannotMidPause: true,
							        recreation: new game.recreationManager(game),
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							        textDescription: 'NEED ITEM:\nSCHOOL SUPPLIES\n\nIncrease school progression time\nbut get a very small exp\nDepends on an item',
							        itemRequired: true,
							        itemEquipIndex: 8,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 3:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							buff[0] = new buff[0](game,{x:130, y: 170});
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
							        ignoreSingleButtonOnly: true,
							        popupEvent: popupEvent.createCategoriesEvent('1',
							        	{text:"Cheap School" , cost: 2060, gain: 660, button: buttonNo},
						                {text:"Normal School" , cost: 3100, gain: 825, button: buttonNo},
						                {text:"Public School" , cost: 4650, gain: 1033, button: buttonNo},
						                {text:"Private School" , cost: 6975, gain: 1290, button: buttonNo},
						                {text:"Top-Class School" , cost: 10465, gain: 1615, button: buttonNo},
						                {text:"World-Class School" , cost: 1570, gain: 2020, button: buttonNo},
						            ),
							        timeEvent: game.time.addEvent({
							            delay:300000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 5:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:130, y: 170});
							let modifyPopupEvent = popupEvent.createCategoriesEvent('1',
					        	{text:"Normal School" , cost: 0, gain: 0, button: buttonNo},
				                {text:"Public School" , cost: 0, gain: 0, button: buttonNo},
				                {text:"Private School" , cost: 0, gain: 0, button: buttonNo},
				                {text:"Top-Class School" , cost: 0, gain: 0, button: buttonNo},
				                {text:"World-Class School" , cost: 0, gain: 0, button: buttonNo},
				            );
				            modifyPopupEvent.nestedCategoriesEvent({
				            	event: function (degree, schoolFinished) {
			            			game.degree = degree;
			            			game.schoolFinished = schoolFinished;
			            			game.activeButtonCharacter[2].data.values.work.getJobData();
    								game.statistics.updateDegree();
			            		}},
				            	{text: 'a', args: [
					            	{text:"College of Law" , cost: 4845, gain: 9500, button: buttonNo},
					            	{text:"Education" , cost: 4845, gain: 9500, button: buttonNo},
					            ]},
				            	{text: 'a', args: [
					            	{text:"Education" , cost: 6055, gain: 1185, button: buttonNo},
					            	{text:"Medical School" , cost: 6055, gain: 1185, button: buttonNo},
					            	{text:"Computer Science" , cost: 6055, gain: 1185, button: buttonNo},
					            ]},
				            	{text: 'a', args: [
					            	{text:"Engineering" , cost: 7570, gain: 1485, button: buttonNo},
					            	{text:"College of Law" , cost: 7570, gain: 1485, button: buttonNo},
					            	{text:"Computer Science" , cost: 7570, gain: 1485, button: buttonNo},
					            	{text:"Medical School" , cost: 7570, gain: 1485, button: buttonNo},
					            ]},
				            	{text: 'a', args: [
					            	{text:"Computer Science" , cost: 9460, gain: 1855, button: buttonNo},
					            	{text:"Medical School" , cost: 9460, gain: 1855, button: buttonNo},
					            	{text:"Engineering" , cost: 9460, gain: 1855, button: buttonNo},
					            ]},
				            	{text: 'a', args: [
					            	{text:"Computer Science" , cost: 11830, gain: 2320, button: buttonNo},
					            	{text:"Medical School" , cost: 11830, gain: 2320, button: buttonNo},
					            	{text:"Avionics" , cost: 11830, gain: 2320, button: buttonNo},
					            	{text:"Engineering" , cost: 11830, gain: 2320, button: buttonNo},
					            	{text:"College of Law" , cost: 11830, gain: 2320, button: buttonNo},
					            	{text:"Education" , cost: 11830, gain: 2320, button: buttonNo},
					            ]},
				            );
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
							        textDescription: 'Finish Secondary school',
							        itemRequired: false,
							        itemEquipIndex: 7,
							        popupEvent: modifyPopupEvent,
							        timeEvent: game.time.addEvent({
							            delay:300000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						default:
							return true;
					}
				case 6:
					switch(buttonNo){
						case 1:
							buff.push(buffs(0));
							buff[0] = new buff[0](game,{x:130, y: 170});
							return {
									default: getDefault(),
							        description: 'RECREATION',
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        runOneWithLoop: true,
							        cannotMidPause: true,
							        recreation: new game.recreationManager(game),
							        timeEvent: game.time.addEvent({
							            delay:90000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 2:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:130, y: 170});
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
						default:
							return true;

					}
			}
	}

}