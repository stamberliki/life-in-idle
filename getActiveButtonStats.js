export function getActiveButtonStats(game,location,stageNo,buttonNo,buffs,startAt=0){
	var buff;

	switch (location){
		case 'left':
			switch (stageNo){
				case 1:
					switch(buttonNo){
						case 1:
							buff = buffs(5);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CARE',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: new buff(game,{x:48, y: 209}),
							        gain: 0,
							        isCare: true,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff = buffs(5);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: new buff(game,{x:48, y: 209}),
							        gain: 2,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
					}
				case 2:
					switch(buttonNo){
						case 1:
							buff = buffs(5);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CARE',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: new buff(game,{x:48, y: 209}),
							        gain: 0,
							        isCare: true,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff = buffs(5);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: new buff(game,{x:48, y: 209}),
							        gain: 2,
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
							buff = buffs(5);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CARE',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: new buff(game,{x:721, y: 209}),
							        gain: 0,
							        isCare: true,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff = buffs(5);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: new buff(game,{x:48, y: 209}),
							        gain: 2,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
					}
				case 2:
					switch(buttonNo){
						case 1:
							buff = buffs(5);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CARE',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: new buff(game,{x:48, y: 209}),
							        gain: 0,
							        isCare: true,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.gainMoney,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff = buffs(5);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WORK',
							        unlocked: true,
							        pause: true,
							        pausedMidway: false,
							        event: game.gainMoney.name,
							        buff: new buff(game,{x:721, y: 209}),
							        gain: 2,
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
							buff = buffs(1);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CRY',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: true,
							        gain: 2000,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff = buffs(1);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'POOP',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: false,
							        gain: 2,
							        requiredExpToUnlock: 50,
							        requiredMoneyToUnlock: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 3:
							buff = buffs(4);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'SMILE',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: false,
							        gain: 2,
							        requiredExpToUnlock: 250,
							        requiredMoneyToUnlock: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 4:
							buff = buffs(3);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'CRAWL',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: false,
							        gain: 2,
							        requiredExpToUnlock: 550,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 5:
							buff = buffs(3);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'STAND',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: false,
							        gain: 2,
							        requiredExpToUnlock: 800,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 1,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 6:
							buff = buffs(3);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WALK',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: false,
							        gain: 2,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 1,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						default:
							return true;
					}
				case 2:
					switch(buttonNo){
						case 1:
							buff = buffs(3);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'EAT',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: false,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 2:
							buff = buffs(3);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'PLAY',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: true,
							        gain: 0,
							        requiredExpToUnlock: 0,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 3:
							buff = buffs(3);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'WALK',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: true,
							        gain: 2,
							        requiredExpToUnlock: 2000,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 1,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						case 4:
							buff = buffs(3);
							return {
									stage: stageNo,
									number: buttonNo,
							        description: 'RUN',
							        pause: true,
							        pausedMidway: false,
							        event: game.expGain.name,
							        buff: new buff(game,{x:130, y: 172}),
							        unlocked: false,
							        gain: 2,
							        requiredExpToUnlock: -1,
							        requiredMoneyToUnlock: 0,
							        requiredTurnsToUnlock: 0,
							        timeEvent: game.time.addEvent({
							            delay:1000, loop:true, callback: game.expGain,
							            callbackScope: game, paused: true, startAt: startAt,
							        })
							    };
						default:
							return true;
					}
			}
			
	}

}