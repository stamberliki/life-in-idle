export class cutscene{
	
	constructor(game){
		this.game = game;

		this.finish = true;
	    this.skip = false;
	    this.play = true;

	    this.textList = [
		    'abcde f g h\nijk l m n',
		    'you fail',
		    'you succed',
		    'stay the same',
		    ];
	    this.textQueue = '';
	    this.textIndex = 0;
	    this.currentTextIndexQueue = this.currentTextIndexQueue + 1 || 0;
	    this.textIndexQueue = [0,2];
	    this.text = this.game.add.bitmapText(48,455,'mainFont','').setOrigin(0).setVisible(false);
	    this.text.depth = 3;
	    this.textTimeEvent = this.game.time.addEvent({
	        delay:100, loop:true, callback: this.setText,
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

}