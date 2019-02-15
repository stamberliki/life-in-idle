export function getActiveButtonStats(game,location,stageNo,buttonNo,buffs,startAt=0){
	var buff = [];

	switch (location){
		case 'left':
			switch (stageNo){
				case 1:
					switch(buttonNo){
						case 1:
							buff.push(buffs(6));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CARE',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 0,
							        isCare: true,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 2,
							        textDescription: '',
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
					}
				case 2:
					switch(buttonNo){
						case 1:
							buff.push(buffs(6));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CARE',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 0,
							        isCare: true,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 2,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
					}
				case 3:
					switch(buttonNo){
						case 1:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 2,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
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
									stage: stageNo,
									number: buttonNo,
							        description: 'CARE',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 0,
							        isCare: true,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 2,
							        textDescription: '',
							        cycleCount: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
					}
				case 2:
					switch(buttonNo){
						case 1:
							buff.push(buffs(6));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CARE',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 0,
							        isCare: true,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 2,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
					}
				case 3:
					switch(buttonNo){
						case 1:
							buff.push(buffs(5));
							buff[0] = new buff[0](game,{x:721, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: buff,
							        gain: 2,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
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
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CRY',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 2000,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff.push(buffs(1));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'POOP',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 6,
							        requiredExpToUnlock: 50,
							        requiredMoneyToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 50',
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 3:
							buff.push(buffs(4));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'SMILE',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 0,
							        requiredExpToUnlock: 250,
							        requiredMoneyToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 250',
							        timeEvent: game.time.addEvent({
							            delay:5000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 4:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CRAWL',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 25,
							        requiredExpToUnlock: 550,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 550',
							        timeEvent: game.time.addEvent({
							            delay:60000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 5:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'STAND',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 40,
							        requiredExpToUnlock: 800,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nEXP: 800\nCRAWL: 1',
							        timeEvent: game.time.addEvent({
							            delay:90000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 6:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WALK',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 65,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: 'REQUIRED:\nSTAND: 2',
							        timeEvent: game.time.addEvent({
							            delay:120000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
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
									stage: stageNo,
									number: buttonNo,
							        description: 'PLAY',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 3,
							        timeEvent: game.time.addEvent({
							            delay:120000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WALK',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 2,
							        requiredExpToUnlock: 2000,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:180000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 3:
							buff.push(buffs(3));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'RUN',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: false,
							        gain: 185,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        timeEvent: game.time.addEvent({
							            delay:300000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
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
									stage: stageNo,
									number: buttonNo,
							        description: 'PLAY',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: true,
							        itemEquipIndex: 3,
							        timeEvent: game.time.addEvent({
							            delay:120000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff.push(buffs(7));
							buff[0] = new buff[0](game,{x:48, y: 209});
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'DAYCARE',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: buff,
							        unlocked: true,
							        gain: 1,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        textDescription: '',
							        itemRequired: false,
							        itemEquipIndex: 3,
							        timeEvent: game.time.addEvent({
							            delay:120000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						default:
							return true;
					}

			}
			
	}

}