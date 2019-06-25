export class recreation{

	constructor(game){
		var _this = this;
		this.game = game;
		this.button;
		this.buttonData;
		this.buffDataProto;
		this.buffData;
		this.popupEvent = new game.popupEvent(game).createCategoriesEvent('',
			{text:"Take a walk" , cost: 1, gain: 1},
			{text:"Watch TV" , cost: 1, gain: 1},
			{text:"Play Games" , cost: 1, gain: 1},
			{text:"Surf Internet" , cost: 1, gain: 1},
			{text:"Go to the beach" , cost: 1, gain: 1},
			{text:"Take a long sleep" , cost: 1, gain: 1},
		);
		this.previousTimeEvent;
		this.timeEvent;
		this.buffManager = this.game.buffManager(0);

		for (let x = 0 ; x != this.popupEvent.buttons.length ; x++){
			console.log(x+'|'+this.popupEvent.buttons.length);
			this.popupEvent.buttons[x].off('pointerup');
		}
	}

	setButton(button){
		this.button = button;

		this.popupEvent.buttons[0].on('pointerup', function(){
			this.buttonData = this.button.data.values;

			this.previousTimeEvent = this.buttonData.timeEvent;
			this.timeEvent = this.game.time.addEvent({
	            delay:100000, loop:true, callback: this.game.expGain,
	            callbackScope: this.game, paused: false, args: [0, this.button],
			});
			this.buttonData.timeEvent = this.timeEvent;

			this.button.data.values.buff[0] = new this.buffManager(this.game);
			this.buffData = this.button.data.values.buff[0];
			this.buffData.config({
				chance: 10,
				button: this.button,
			});

			this.buffDataProto = Object.getPrototypeOf(this.buffData);
			this.buffDataProto.active = function active(){
				this.isActive = true;
				for (var x = 0 ; x < this.game.currentBuffCharacter.length ; x++){
					if (this.game.currentBuffCharacter[x].isActive && !this.game.currentBuffCharacter[x].immune){
						this.game.currentBuffCharacter[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffLeft.length ; x++){
					if (this.game.currentBuffLeft[x].isActive && !this.game.currentBuffLeft[x].immune){
						this.game.currentBuffLeft[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffRight.length ; x++){
					if (this.game.currentBuffRight[x].isActive && !this.game.currentBuffRight[x].immune){
						this.game.currentBuffRight[x].deactivate();
					}
				}
			}

			this.buffDataProto.deactivate = function deactivate(){
				this.button.data.values.timeEvent.paused = true;
				this.button.data.values.recreation.popupEvent.finished = false;
				this.isActive = false;
				this.button.data.values.timeEvent = this.button.data.values.recreation.previousTimeEvent;
			}

			this.popupEvent.hide();
			this.popupEvent.finished = true;
		},this);

		this.popupEvent.buttons[1].on('pointerup', function(){
			this.buttonData = this.button.data.values;

			this.previousTimeEvent = this.buttonData.timeEvent;
			this.timeEvent = this.game.time.addEvent({
	            delay:1000, loop:true, callback: this.game.expGain,
	            callbackScope: this.game, paused: false, args: [0, this.button],
			});
			this.buttonData.timeEvent = this.timeEvent;

			this.button.data.values.buff[0] = new this.buffManager(this.game);
			this.buffData = this.button.data.values.buff[0];
			this.buffData.config({
				chance: 10,
				button: this.button,
			});

			this.buffDataProto = Object.getPrototypeOf(this.buffData);
			this.buffDataProto.active = function active(){
				this.isActive = true;
				for (var x = 0 ; x < this.game.currentBuffCharacter.length ; x++){
					if (this.game.currentBuffCharacter[x].isActive && !this.game.currentBuffCharacter[x].immune){
						this.game.currentBuffCharacter[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffLeft.length ; x++){
					if (this.game.currentBuffLeft[x].isActive && !this.game.currentBuffLeft[x].immune){
						this.game.currentBuffLeft[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffRight.length ; x++){
					if (this.game.currentBuffRight[x].isActive && !this.game.currentBuffRight[x].immune){
						this.game.currentBuffRight[x].deactivate();
					}
				}
			}

			this.buffDataProto.deactivate = function deactivate(){
				this.button.data.values.timeEvent.paused = true;
				this.button.data.values.recreation.popupEvent.finished = false;
				this.isActive = false;
				this.button.data.values.timeEvent = this.button.data.values.recreation.previousTimeEvent;
			}

			this.popupEvent.hide();
			this.popupEvent.finished = true;
		},this);

		this.popupEvent.buttons[2].on('pointerup', function(){
			this.buttonData = this.button.data.values;

			this.previousTimeEvent = this.buttonData.timeEvent;
			this.timeEvent = this.game.time.addEvent({
	            delay:1000, loop:true, callback: this.game.expGain,
	            callbackScope: this.game, paused: false, args: [0, this.button],
			});
			this.buttonData.timeEvent = this.timeEvent;

			this.button.data.values.buff[0] = new this.buffManager(this.game);
			this.buffData = this.button.data.values.buff[0];
			this.buffData.config({
				chance: 10,
				button: this.button,
			});

			this.this.buffDataProto = Object.getPrototypeOf(this.buffData);
			this.buffDataProto.active = function active(){
				this.isActive = true;
				for (var x = 0 ; x < this.game.currentBuffCharacter.length ; x++){
					if (this.game.currentBuffCharacter[x].isActive && !this.game.currentBuffCharacter[x].immune){
						this.game.currentBuffCharacter[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffLeft.length ; x++){
					if (this.game.currentBuffLeft[x].isActive && !this.game.currentBuffLeft[x].immune){
						this.game.currentBuffLeft[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffRight.length ; x++){
					if (this.game.currentBuffRight[x].isActive && !this.game.currentBuffRight[x].immune){
						this.game.currentBuffRight[x].deactivate();
					}
				}
			}

			this.buffDataProto.deactivate = function deactivate(){
				this.button.data.values.timeEvent.paused = true;
				this.button.data.values.recreation.popupEvent.finished = false;
				this.isActive = false;
				this.button.data.values.timeEvent = this.button.data.values.recreation.previousTimeEvent;
			}

			this.popupEvent.hide();
			this.popupEvent.finished = true;
		},this);

		this.popupEvent.buttons[3].on('pointerup', function(){
			this.buttonData = this.button.data.values;

			this.previousTimeEvent = this.buttonData.timeEvent;
			this.timeEvent = this.game.time.addEvent({
	            delay:1000, loop:true, callback: this.game.expGain,
	            callbackScope: this.game, paused: false, args: [0, this.button],
			});
			this.buttonData.timeEvent = this.timeEvent;

			this.button.data.values.buff[0] = new this.buffManager(this.game);
			this.buffData = this.button.data.values.buff[0];
			this.buffData.config({
				chance: 10,
				button: this.button,
			});

			this.buffDataProto = Object.getPrototypeOf(this.buffData);
			this.buffDataProto.active = function active(){
				this.isActive = true;
				for (var x = 0 ; x < this.game.currentBuffCharacter.length ; x++){
					if (this.game.currentBuffCharacter[x].isActive && !this.game.currentBuffCharacter[x].immune){
						this.game.currentBuffCharacter[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffLeft.length ; x++){
					if (this.game.currentBuffLeft[x].isActive && !this.game.currentBuffLeft[x].immune){
						this.game.currentBuffLeft[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffRight.length ; x++){
					if (this.game.currentBuffRight[x].isActive && !this.game.currentBuffRight[x].immune){
						this.game.currentBuffRight[x].deactivate();
					}
				}
			}

			this.buffDataProto.deactivate = function deactivate(){
				this.button.data.values.timeEvent.paused = true;
				this.button.data.values.recreation.popupEvent.finished = false;
				this.isActive = false;
				this.button.data.values.timeEvent = this.button.data.values.recreation.previousTimeEvent;
			}

			this.popupEvent.hide();
			this.popupEvent.finished = true;
		},this);

		this.popupEvent.buttons[4].on('pointerup', function(){
			this.buttonData = this.button.data.values;

			this.previousTimeEvent = this.buttonData.timeEvent;
			this.timeEvent = this.game.time.addEvent({
	            delay:1000, loop:true, callback: this.game.expGain,
	            callbackScope: this.game, paused: false, args: [0, this.button],
			});
			this.buttonData.timeEvent = this.timeEvent;

			this.button.data.values.buff[0] = new this.buffManager(this.game);
			this.buffData = this.button.data.values.buff[0];
			this.buffData.config({
				chance: 10,
				button: this.button,
			});

			this.buffDataProto = Object.getPrototypeOf(this.buffData);
			this.buffDataProto.active = function active(){
				this.isActive = true;
				for (var x = 0 ; x < this.game.currentBuffCharacter.length ; x++){
					if (this.game.currentBuffCharacter[x].isActive && !this.game.currentBuffCharacter[x].immune){
						this.game.currentBuffCharacter[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffLeft.length ; x++){
					if (this.game.currentBuffLeft[x].isActive && !this.game.currentBuffLeft[x].immune){
						this.game.currentBuffLeft[x].deactivate();
					}
				}
				for (var x = 0 ; x < this.game.currentBuffRight.length ; x++){
					if (this.game.currentBuffRight[x].isActive && !this.game.currentBuffRight[x].immune){
						this.game.currentBuffRight[x].deactivate();
					}
				}
			}

			this.buffDataProto.deactivate = function deactivate(){
				this.button.data.values.timeEvent.paused = true;
				this.button.data.values.recreation.popupEvent.finished = false;
				this.isActive = false;
				this.button.data.values.timeEvent = this.button.data.values.recreation.previousTimeEvent;
			}

			this.popupEvent.hide();
			this.popupEvent.finished = true;
		},this);

		this.popupEvent.buttons[5].on('pointerup', function(){
			this.buttonData = this.button.data.values;
			this.previousTimeEvent = this.buttonData.timeEvent;
			this.timeEvent = this.game.time.addEvent({
	            delay:1000, loop:true, callback: this.game.expGain,
	            callbackScope: this.game, paused: false, args: [0, this.button],
			});
			this.buttonData.timeEvent = this.timeEvent;

			this.buffManager = this.game.buffManager(9);
			this.button.data.values.buff[0] = new this.buffManager(this.game, {x:130, y:170});

			this.popupEvent.hide();
			this.popupEvent.finished = true;
		},this);
	}

}