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
							        description: 'Retired',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        popupEvent: popupEvent.createTwoChoiceEvent('Your father will retire and gain\n'+
							        	(game.activeButtonLeft[0].data.values.cycleCount/100)*(game.activeButtonLeft[0].data.values.gain*.25)+
							        	' cash per cycle.\nIt will never receive or generate buff \nor debuffs and it will run permamently',{
								        	text: 'Yes',
								        	event: function(){
								        		let buttonData = game.activeButtonLeft[0].data.values;
								        		buttonData.gain = (buttonData.cycleCount/100)*(buttonData.gain*.25);
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
								        		console.log(buttonData);
								        	}
								        },{
								        	text: 'No',
								        	event: function(){
								        	}
								        }),
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:false, callback: game.expGain,
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
							        description: 'Retired',
							        event: game.gainMoney.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        popupEvent: popupEvent.createTwoChoiceEvent('Your mother will retire and gain\n'+
							        	(game.activeButtonRight[0].data.values.cycleCount/100)*(game.activeButtonRight[0].data.values.gain*.25)+
							        	' cash per cycle.\nIt will never receive or generate buff or debuffs and it will run permamently',{
								        	text: 'Yes',
								        	event: function(){
								        		let buttonData = game.activeButtonRight[0].data.values;
								        		buttonData.gain = (buttonData.cycleCount/100)*(buttonData.gain*.25);
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
							            delay:1000, loop:false, callback: game.expGain,
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
							        gain: 1000,
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
							        requiredExpToUnlock: 20,
							        requiredMoneyToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 50',
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
							        requiredExpToUnlock: 55,
							        requiredMoneyToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 250',
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
							        requiredExpToUnlock: 80,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 550',
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
							        requiredExpToUnlock: 120,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 800\nCRAWL: 1',
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
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nSTAND: 2',
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
							            delay:15000, loop:true, callback: game.expGain,
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
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:8000, loop:true, callback: game.expGain,
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
							            delay:9000, loop:true, callback: game.expGain,
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
							        itemEquipIndex: 9,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
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
							        itemEquipIndex: 7,
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
							            delay:10000, loop:false, callback: game.expGain,
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
							        itemEquipIndex: 7,
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
							        itemEquipIndex: 9,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
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
							        itemEquipIndex: 7,
							        ignoreSingleButtonOnly: true,
							        popupEvent: popupEvent.createCategoriesEvent('1',
							        	{text:"Cheap School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Normal School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Public School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Private School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Top-Class School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"World-Class School" , cost: 1, gain: 1, button: buttonNo},
						            ),
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:false, callback: game.expGain,
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
							        itemEquipIndex: 7,
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
							buff[0] = new buff[0](game,{x:48, y: 209});
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
							        itemEquipIndex: 7,
							        timeEvent: game.time.addEvent({
							            delay:15000, loop:true, callback: game.expGain,
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
							        ignoreSingleButtonOnly: true,
							        popupEvent: popupEvent.createCategoriesEvent('1',
							        	{text:"Cheap School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Normal School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Public School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Private School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"Top-Class School" , cost: 1, gain: 1, button: buttonNo},
						                {text:"World-Class School" , cost: 1, gain: 1, button: buttonNo},
						            ),
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:false, callback: game.expGain,
							            callbackScope: game, paused: true,
							        })
							    };
						case 5:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							let modifyPopupEvent = popupEvent.createCategoriesEvent('1',
					        	{text:"Cheap School" , cost: 1, gain: 1, button: buttonNo},
				                {text:"Public School" , cost: 1, gain: 1, button: buttonNo},
				                {text:"Private School" , cost: 1, gain: 1, button: buttonNo},
				                {text:"Top-Class School" , cost: 1, gain: 1, button: buttonNo},
				                {text:"World-Class School" , cost: 1, gain: 1, button: buttonNo},
				            );
				            modifyPopupEvent.nestedCategoriesEvent({
				            		event: function (degree, schoolFinished) {
				            			console.log('pass');
				            			game.degree = degree;
				            			game.schoolFinished = schoolFinished;
				            		}
				            	},
				            	{text: 'a', args: [
					            	{text:"Law School" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Education" , cost: 1, gain: 1, button: buttonNo},
					            ]},
				            	{text: 'a', args: [
					            	{text:"Education" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Medical" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Computer Science" , cost: 1, gain: 1, button: buttonNo},
					            ]},
				            	{text: 'a', args: [
					            	{text:"Engineering" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Law School" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Computer Science" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Medical School" , cost: 1, gain: 1, button: buttonNo},
					            ]},
				            	{text: 'a', args: [
					            	{text:"Computer Science" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Medical School" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Avionics" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Engineering" , cost: 1, gain: 1, button: buttonNo},
					            ]},
				            	{text: 'a', args: [
					            	{text:"Computer Science" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Medical School" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Avionics" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Engineering" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Law School" , cost: 1, gain: 1, button: buttonNo},
					            	{text:"Education" , cost: 1, gain: 1, button: buttonNo},
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
							        textDescription: '',
							        itemRequired: false,
							        itemEquipIndex: 7,
							        popupEvent: modifyPopupEvent,
							        timeEvent: game.time.addEvent({
							            delay:10000, loop:false, callback: game.expGain,
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
							buff[0] = new buff[0](game,{x:48, y: 209});
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
						default:
							return true;

					}
			}
	}

}