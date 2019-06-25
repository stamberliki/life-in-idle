export class workData{

	constructor(game){
		var _this = this;
		this.button;
		this.game = game;
		this.workData = {
			veryLow: {
				minGain: 15,
				maxGain: 20,
				nonDegreePoint: 1,
				degreePoint: 2, 
				nonDegree:['Service Crew','Cashier','Dishwasher'],
				degree:{
					'College of Law':['Legislator'],
					'Education':['Teacher'],
				}
			},
			low: {
				minGain: 40,
				maxGain: 60,
				nonDegreePoint: 2,
				degreePoint: 4, 
				nonDegree:['Delivery Driver'],
				degree:{
					'Medical School': ['Nurse'],
					'Education': ['Primary Education Teacher'],
				}
			},
			average: {
				minGain: 100,
				maxGain: 130,
				nonDegreePoint: 4,
				degreePoint: 8, 
				nonDegree: ['Customer Service'],
				degree:{
					'Computer Science': ['Data Analyst', 'Graphic Artist']
				}
			},
			high: {
				minGain: 150,
				maxGain: 175,
				nonDegreePoint: 16,
				degreePoint: 32, 
				nonDegree: [''],
				degree:{
					'Engineer': ['Architect'],
					'College of Law': ['Lawyer'],
					'Medical School': ['Professional Doctor'],
				}
			},
			veryHigh: {
				minGain: 200,
				maxGain: 250,
				nonDegreePoint: 64,
				degreePoint: 128, 
				nonDegree:[''],
				degree:{
					'Computer Science': ['Software Developer'],
					'Medical School': ['Pharmacist'],
					'Avionics': ['Pilot'],
					'Engineer': ['Engineer'],
				}
			},
		};
		this.acceptedWorkName;
		this.acceptedWorkGain;
        this.timeEvent = game.time.addEvent({
            delay:2000, loop:true, callback: game.gainMoney,
            callbackScope: game, paused: true,
        }),
        this.previousTimeEvent;
        this.workTier;
        this.points = 0;

        this.jobSelection = new game.popupEvent(game).createTwoChoiceEvent('',{
        	text: 'Yes',
        	event: function(){
        		_this.acceptJob();
        	}
        },{
        	text: 'No',
        	event: function(){
        	}
        },
        ).setRequiredDelay(true),

        this.holdEvent = new game.popupEvent(game).createTwoChoiceEvent('',{
        	text: 'Yes',
        	event: function(){
        		let buttonData = _this.button.data.values;
        		buttonData.timeEvent.paused = true;
        		buttonData.default.pause = true;
        		buttonData.timeEvent.args[0] = [0];
        		buttonData.timeEvent.elapsed = 0;
        		buttonData.timeEvent = _this.previousTimeEvent;
        		buttonData.gain = 0;
        		buttonData.timeEvent.args[0] = [0];
        		_this.jobSelection.finished = false;
        		buttonData.runOneWithLoop = true;
				this.points = 0;
        		if (buttonData.position == 'left'){
        			_this.game.buttonLeftSelected = false;
        		}
        		else if (buttonData.position == 'right'){
        			_this.game.buttonRightSelected = false;
        		}
        		else if (buttonData.position == 'character'){
        			_this.game.buttonCharacterSelected = false;
        		}
        	}
        },{
        	text: 'No',
        	event: function(){
        	}
        });
        this.holdEvent.finished = true;

        this.holdTimeEventDelay = game.time.addEvent({
		    delay:1000, loop:true, callback: this.playHoldTimeEvent,
		    callbackScope: this, paused: true,
        });
		this.holdTimeEvent = game.time.addEvent({
		    delay:3000, loop:true, callback: this.showQuitJobEvent,
		    callbackScope: this, paused: true,
    	});
	}

	setButton(button){
		this.button = button;
		this.button.on('pointerdown', function(){
			if (this.jobSelection.finished){
				this.holdTimeEventDelay.paused = false;
			}
		},this);
	}

	showJobSelection(game){
        if (!this.jobSelection.finished){
        	this.generateJob(game);

            this.jobSelection.text.setText('You applying as a\n'+this.acceptedWorkName+'\nfor '+this.acceptedWorkGain+' per cycle\nDo you want to apply?');
            this.jobSelection.popup.resize(Math.max((this.jobSelection.text.getTextBounds().local.width/2)+400,496),
                (this.jobSelection.text.getTextBounds().local.height/2)+322);
            this.jobSelection.popup.setOrigin(0.5).setScale(2);
            this.jobSelection.show();
        }
	}

	generateJob(game){
        if (game.tier == 1){
            this.workTier = 'veryLow';
        }
        else if (game.tier == 2){
            this.workTier = Phaser.Math.RND.pick(['veryLow','low']);
        }
        else if (game.tier == 3){
            this.workTier = Phaser.Math.RND.pick(['veryLow','low','average']);
        }
        else if (game.tier == 4){
            this.workTier = Phaser.Math.RND.pick(['veryLow','low','average','high']);
        }
        else if (game.tier == 5){
            this.workTier = Phaser.Math.RND.pick(['veryLow','low','average','high','veryHigh']);
        }
        if (game.degree){
            let list = this.workData[this.workTier].nonDegree;
            list = list.concat(this.workData[this.workTier].degree[game.degree]);
            this.acceptedWorkName = Phaser.Math.RND.pick(list);
            this.acceptedWorkGain = Phaser.Math.Between(this.workData[this.workTier].minGain, this.workData[this.workTier].maxGain);
            if (!this.workData[this.workTier].degree[game.degree].includes(this.acceptedWorkName)){
                this.acceptedWorkGain /= 2;
            }
            this.points = this.workData[this.workTier].degreePoint;
        }
        else{
            this.acceptedWorkName = Phaser.Math.RND.pick(this.workData[this.workTier].nonDegree);
            this.acceptedWorkGain = Phaser.Math.Between(this.workData[this.workTier].minGain, this.workData[this.workTier].maxGain)/2;
            this.points = this.workData[this.workTier].nonDegreePoint;
        }
	}

	playHoldTimeEvent(){
		this.holdTimeEventDelay.paused = true;
		this.holdTimeEvent.paused = false;
		this.button.data.values.holdEvent.setVisible(true);
		this.button.data.values.holdEvent.play('activeButtonHoldAnimation',false,0);
	}

	showQuitJobEvent(){
        this.holdEvent.finished = true;
		this.holdEvent.show();
		this.holdTimeEvent.paused = true;
	}

	hideHoldAnim(){
        this.holdTimeEventDelay.paused = true;
        this.holdTimeEvent.paused = true;
        this.holdTimeEventDelay.elapsed = 0;
        this.holdTimeEvent.elapsed = 0;
        this.button.data.values.holdEvent.setVisible(false);
	}

	acceptJob(){
		let buttonData = this.button.data.values;
		this.previousTimeEvent = buttonData.timeEvent;
		buttonData.timeEvent = this.timeEvent;
		buttonData.gain = this.acceptedWorkGain;
		buttonData.timeEvent.args = [this.acceptedWorkGain, this.button];
		this.jobSelection.finished = true;
		buttonData.runOneWithLoop = false;
		this.holdEvent.text.setText('You are about to quit your job as a\n'+this.acceptedWorkName+'\nDo you want to quit your job?');
		this.holdEvent.popup.resize(Math.max((this.holdEvent.text.getTextBounds().local.width/2)+400,496),
                (this.holdEvent.text.getTextBounds().local.height/2)+322);
        this.holdEvent.popup.setOrigin(0.5).setScale(2);
	}

	getData(){
		let buttonData = this.button.data.values;
		return {
			workName: this.acceptedWorkName,
			workGain: this.acceptedWorkGain,
    		jobSelectionFinished: this.jobSelection.finished,
    		runOneWithLoop: buttonData.runOneWithLoop,
		};
	}

}