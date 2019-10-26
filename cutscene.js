export class cutscene{
	
	constructor(game){
		this.game = game;

		this.finish = true;
	    this.skip = false;
	    this.play = true;
	    this.textList;

	    this.textListTrial = [
			'Ah, Welcome back!',//0
			'How is the simulation going?',//1
			'Let me see what you have done so far',//2
			'...',//3
			'Congratulations you pass the simulation',//4
			'Not only you pass, but also you get the highest points',//5
			'But also you fail to promote you to a higher class',//6
			'The person you simulated live in a stagnant life, but its \nbetter than nothing',//7
			'The person you simulated have the best day of its entire life',//8
			'The person you simulated is the new Elon of this generation',//9
			'You are now promoted to a higher class',//10
			'Sorry but you fail the simulation',//11
			'You just not fail, but also you score the lowest',//12
			'You are now demoted to lower class',//13
			'You still retain your class',//14
			'Poor human, it struggles about its life now. May it find \ntranquillity from the rest of its life',//15
			'Are  you ready for you simulation?',//16
			'You are now simulating a family of very-low class',//17
			'You are now simulating a family of low class',//18
			'You are now simulating a family of middle class',//19
			'You are now simulating a family of high class',//20
			'You are now simulating a family of very-high class',//21
			'Good luck to your simulation and see you soon.',//22
		];
		this.textListFirstTime = [
			'Ah, Welcome back!',
			'I\'m A\'el, one of the guardians of this realm.',
			'What do you mean you don\'t know me or this place?',
			'Hmmm, seems you suffered memory loss from your last\nsimulation.',
			'I\'m going to tell you the basics.',
			'Ok...',
			'You are controlling the faith of the person from the baby \nup to the adult stage with the help of the parents.',
			'Use your simulation powers(buttons) to control them. But \nfor every action, there are either good or bad \nconsequences.',
			'Gain experience from your powers to unlock more powers \nand level up to new stages.',
			'There are powers that requires an item, or an item that \nenchance the powers.',
			'You can select one power at a time. But you can select the \nschool and any powers at the same time.',
			'From baby to toddler, it is require to use the \'Care\' power \nto use the main character\'s power',
			'Gain money by working from the parent or from the person \nyou simulated in further stages',
			'Buy items to magically gain more either money or \nexperience, or speed multiplier.',
			'You can quit your job by holding it, and select a new one by \nrunning it again.',
			'The jobs available depends on the class and the degree.',
			'And in the adult stage, you have the option to face the trial \naccording to what you do in the simulation.',
			'If you do good, you will be promoted to the higher class, \nif you do ok, you will retain to your previous class, if you do \nbad, you will be demoted to the lower class.',
			'The criteria are confidential so we will not tell you about \nthat.',
			'You will get a gift of the achiever when you finish a certain \nquest.',
			'Any Question?',
			'No, there are no breaks("offline progress") We dont want \nthis people doing nothing in the middle of something.',
			'There will be some tooltip for the buffs/debuffs, how to \nunlock more powers, how to move to the next stage, and how \nto gain achevements',
			'Are  you ready for you simulation?',
			'You are now simulating a family of very-low class.',
			'Good luck to your simulation and see you soon.',
		];
		
	    this.textQueue = '';
	    this.textIndex = 0;
	    this.currentTextIndexQueue = this.currentTextIndexQueue + 1 || 0;
	    this.textIndexQueue = [0,2];
	    this.text = this.game.add.bitmapText(48,455,'mainFont','').setOrigin(0).setVisible(false);
	    this.text.depth = 3;
	    this.textTimeEvent = this.game.time.addEvent({
	        delay:10, loop:true, callback: this.setText,
	        callbackScope: this, paused: true,
	    });

		this.bg = this.game.add.image(0,0,'a_el').setOrigin(0).setScale(2).setVisible(false);
		this.bg.depth = 2;
		this.eyes = this.game.add.sprite(365,158,'eyesAnim',0).setOrigin(0.5).setScale(2).setVisible(false);
		this.eyes.depth = 2;
	    this.game.anims.create({
	        key: 'eyesAnim',
	        frames: this.game.anims.generateFrameNumbers('eyes', { start: 0, end: 18 }),
	        frameRate: 8,
	        repeat: 0,   
	    });
	    this.game.anims.create({
	        key: 'eyesAnim2',
	        frames: this.game.anims.generateFrameNumbers('eyes2', { start: 0, end: 8 }),
	        frameRate: 8,
	        repeat: -1,   
	    });
	    this.eyes.on('animationcomplete', function(){
	        this.eyes.anims.play('eyesAnim2', true);
	    },this);
	    this.dialog = this.game.add.nineslice(400,517,10,10,'dialog',10).setScale(2).setVisible(false);
	    this.dialog.resize(369,75);
	    this.dialog.setOrigin(0.5);
	    this.dialog.depth = 2;
	    this.dialog.setInteractive();
	    this.dialog.on('pointerup', function(){
	        if (this.textQueue.length <= this.textIndex && this.textIndexQueue.length-1 > this.currentTextIndexQueue){
	            this.currentTextIndexQueue = this.currentTextIndexQueue + 1 || 0;
	            this.textQueue = this.textList[this.textIndexQueue[this.currentTextIndexQueue]];
	            this.textIndex = 0;
	            this.text.setText('');
	            this.textTimeEvent.paused = false;
				this.eyes.anims.play('eyesAnim', true);
	        }
	        else if (this.textQueue.length <= this.textIndex && this.textIndexQueue.length-1 <= this.currentTextIndexQueue){
	        	this.hide();
	        	this.textIndex = 0;
	        	this.text.text = '';
	        }
	        else{
	            this.textTimeEvent.paused = true;
	            this.textIndex = this.textQueue.length;
	            this.text.setText(this.textQueue);
	        }
	    }, this);
	}

	show(fromAscend){
		this.game.disableButtonsEvent(this.game);
		this.finish = false;
		this.game.cameras.main.once('camerafadeoutcomplete', function (camera) {
		    this.bg.setVisible(true);
		    this.eyes.setVisible(true);
		    if (fromAscend){
		    	this.game.ascend.evaluate();
		    }

    		this.eyes.anims.play('eyesAnim2',true);

		    camera.fadeIn(1000, 255, 255, 255);

		}, this);

		this.game.cameras.main.once('camerafadeincomplete', function(camera){
			this.textTimeEvent.paused = false;
		    this.text.setVisible(true);
		    this.dialog.setVisible(true);
			this.eyes.anims.play('eyesAnim', true);
		    this.textIndex = 0;
		    this.textQueue = this.textList[this.textIndexQueue[0]];
		}, this);

		this.game.cameras.main.fadeOut(1000, 255, 255, 255);
	}

	showFadeIn(){
		this.game.disableButtonsEvent(this.game);
		this.finish = false;
		this.game.cameras.main.once('camerafadeincomplete', function(camera){
			this.textTimeEvent.paused = false;
		    this.text.setVisible(true);
		    this.dialog.setVisible(true);
			this.eyes.anims.play('eyesAnim', true);
		    this.textIndex = this.textIndexQueue[0];
		    this.textQueue = this.textList[this.textIndex];
		}, this);
		
	    this.bg.setVisible(true);
	    this.eyes.setVisible(true);

		this.eyes.anims.play('eyesAnim2',true);
		this.game.cameras.main.fadeIn(1000, 255, 255, 255);
	}
	
	hide(){
		this.finish = true;
	    this.text.setVisible(false);
	    this.dialog.setVisible(false);
	    this.game.cameras.main.once('camerafadeoutcomplete', function (camera) {
	        this.bg.setVisible(false);
	        this.eyes.setVisible(false);
			this.game.enableButtonsEvent(this.game);

	        camera.fadeIn(1000, 255, 255, 255);

	    }, this);

	    this.game.cameras.main.fadeOut(1000, 255, 255, 255);
	}

	setText(){
	    this.text.setText(this.text.text + this.textQueue.charAt(this.textIndex-1));
	    this.textIndex = this.textIndex + 1 || 0;
	    if (this.textIndex >= this.textQueue.length+1){
	        this.textTimeEvent.paused = true;
		}
	}

	setTextIndexQueue(textIndexQueue){
		this.textIndexQueue = textIndexQueue;
	}

	getTextListFirstTimeQueueList(){
		this.textListQueue = [];
		for (let x = 0 ; x != this.textListFirstTime.length ; x++){
			this.textListQueue.push(x);
		}
		return this.textListQueue;
	}

}