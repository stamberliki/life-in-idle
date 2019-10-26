export class workData{

	constructor(game){
		var _this = this;
		this.button;
		this.game = game;
		this.workData = {
			veryLow: {
				minGain: 5,
				maxGain: 10,
				nonDegreePoint: 1,
				degreePoint: 2, 
				nonDegree:['Service Crew','Cashier','Dishwasher'],
				degree:{
					'College of Law':['Legislator'],
					'Education':['Teacher'],
				}
			},
			low: {
				minGain: 20,
				maxGain: 40,
				nonDegreePoint: 2,
				degreePoint: 4, 
				nonDegree:['Delivery Driver'],
				degree:{
					'Medical School': ['Nurse'],
					'Education': ['Primary Education\nTeacher'],
				}
			},
			average: {
				minGain: 45,
				maxGain: 160,
				nonDegreePoint: 4,
				degreePoint: 8, 
				nonDegree: ['Customer\nService'],
				degree:{
					'Computer Science': ['Data Analyst', 'Graphic Artist']
				}
			},
			high: {
				minGain: 140,
				maxGain: 640,
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
				minGain: 415,
				maxGain: 2560,
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
            delay:5000, loop:true, callback: game.gainMoney,
            callbackScope: game, paused: true,
        });
        this.previousTimeEvent;
        this.workTier;
        this.points = 0;
        this.rejectedJobs = [];
        this.list;
        this.workList = [];
        this.degree;
        this.degreeTier;
        this.schoolFinished;
		this.degreeList = ['Law School', 'Education', 'Medical School', 'Computer Science', 'Engineering', 'Avionics',];
		this.schoolList = ['Normal','Public','Private','Top-Class','World-Class'];

        for (var x in this.workData){
        	this.workList = this.workList.concat(this.workData[x].nonDegree);
        	for (var y in this.workData[x].degree){
        		this.workList = this.workList.concat(this.workData[x].degree[y]);
        	}
        }
        this.workList = this.workList.filter(function(x){return x;});

        this.jobSelection = new game.popupEvent(game).createTwoChoiceEvent('',{
        	text: 'Yes',
        	event: function(){
        		_this.acceptJob();
        		_this.game.statistics.updateWork();
        	}
        },{
        	text: 'No',
        	event: function(){
        		_this.rejectedJobs.push(_this.acceptedWorkName);
        	}
        }).setRequiredDelay(true);

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
				_this.points = 0;
				_this.acceptedWorkName = '';
				_this.acceptedWorkGain = '';
        		if (buttonData.position == 'left'){
        			_this.game.buttonLeftSelected = false;
        		}
        		else if (buttonData.position == 'right'){
        			_this.game.buttonRightSelected = false;
        		}
        		else if (buttonData.position == 'character'){
        			_this.game.buttonCharacterSelected = false;
        		}
        		_this.game.statistics.updateWork();
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

            this.jobSelection.text.setText('You applying as a\n'+this.acceptedWorkName.split('\n').join(' ')+'\nfor '+this.acceptedWorkGain+' per cycle\nDo you want to apply?');
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
        if (this.degree){
           	this.list = this.workData[this.workTier].nonDegree;
            if (this.schoolFinished){
            	if (this.schoolFinished == 'Normal School'){
            		this.list = this.list.concat(this.workData['veryLow'].degree[this.degree]);
                    this.degreeTier = 'veryLow';
            	}
            	else if (this.schoolFinished == 'Public School'){
            		this.list = this.list.concat(this.workData['low'].degree[this.degree]);
                    this.degreeTier = 'low';
            	}
            	else if (this.schoolFinished == 'Private School'){
            		this.list = this.list.concat(this.workData['average'].degree[this.degree]);
                    this.degreeTier = 'average';
            	}
            	else if (this.schoolFinished == 'Top-Class School'){
            		this.list = this.list.concat(this.workData['high'].degree[this.degree]);
                    this.degreeTier = 'high';
            	}
            	else if (this.schoolFinished == 'World-Class School'){
            		this.list = this.list.concat(this.workData['veryHigh'].degree[this.degree]);
                    this.degreeTier = 'veryHigh';
            	}
            }
            this.list = this.list.filter(function(x){return x;});
            this.acceptedWorkName = Phaser.Math.RND.pick(this.list);
            this.acceptedWorkGain = Phaser.Math.Between(this.workData[this.workTier].minGain, this.workData[this.workTier].maxGain);
            if (this.workData[this.workTier].nonDegree.includes(this.acceptedWorkName)){
                this.acceptedWorkGain /= 2;
            }
            else if (this.workData[this.degreeTier].degree[this.degree].includes(this.acceptedWorkName)){
                this.acceptedWorkGain = Phaser.Math.Between(this.workData[this.degreeTier].minGain, this.workData[this.degreeTier].maxGain);
            }
            this.points = this.workData[this.workTier].degreePoint;
        }
        else{
            this.acceptedWorkName = Phaser.Math.RND.pick(this.workData[this.workTier].nonDegree);
            this.acceptedWorkGain = Phaser.Math.Between(this.workData[this.workTier].minGain, this.workData[this.workTier].maxGain)/2;
            this.points = this.workData[this.workTier].nonDegreePoint;
        }
	}

	generateJobByTier(isMaxGain){
        this.list = this.workData[this.workTier].nonDegree;
        this.degreeListTier = [];
        for (let x in this.workData[this.workTier].degree){
        	this.list = this.list.concat(this.workData[this.workTier].degree[x]);
        	this.degreeListTier.push(x);
        }
        this.degree = Phaser.Math.RND.pick(this.degreeListTier);
        this.acceptedWorkName = Phaser.Math.RND.pick(this.list);
        if (isMaxGain){
        	this.acceptedWorkGain = this.workData[this.workTier].maxGain;
        }
        else{
        	this.acceptedWorkGain = Phaser.Math.Between(this.workData[this.workTier].minGain, this.workData[this.workTier].maxGain);
        }
        this.points = this.workData[this.workTier].degreePoint;
	}

	generateRandomJobData(){
        this.list = [];
        if (this.game.tier == 1){
            this.degreeTier = 'veryLow';
        }
        else if (this.game.tier == 2){
            this.degreeTier = Phaser.Math.RND.pick(['veryLow','low']);
        }
        else if (this.game.tier == 3){
            this.degreeTier = Phaser.Math.RND.pick(['veryLow','low','average']);
        }
        else if (this.game.tier == 4){
            this.degreeTier = Phaser.Math.RND.pick(['veryLow','low','average','high']);
        }
        else if (this.game.tier == 5){
            this.degreeTier = Phaser.Math.RND.pick(['veryLow','low','average','high','veryHigh']);
        }
        for (let x in this.workData[this.degreeTier].degree){
            this.list.push(x);
        }
        this.schoolFinished = Phaser.Math.RND.pick(this.list);
        this.degree = Phaser.Math.RND.pick(this.workData[this.degreeTier].degree[this.schoolFinished]);
	}

	getJobData(){
		this.degree = this.game.degree;
		this.schoolFinished = this.game.schoolFinished;
	}

	acceptJob(){
		let buttonData = this.button.data.values;
		this.previousTimeEvent = buttonData.timeEvent;
		buttonData.timeEvent = this.timeEvent;
		buttonData.gain = this.acceptedWorkGain;
		buttonData.timeEvent.args = [this.acceptedWorkGain, this.button];
		this.jobSelection.finished = true;
		buttonData.runOneWithLoop = false;
		this.holdEvent.text.setText('You are about to quit your job as a\n'+this.acceptedWorkName.split('\n').join(' ')+'\nDo you want to quit your job?');
		this.holdEvent.popup.resize(Math.max((this.holdEvent.text.getTextBounds().local.width/2)+400,496),
                (this.holdEvent.text.getTextBounds().local.height/2)+322);
        this.holdEvent.popup.setOrigin(0.5).setScale(2);
        this.game.applySpeedMultiplier(this.game);
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

	getData(){
		let buttonData = this.button.data.values;
		return {
			workName: this.acceptedWorkName,
			workGain: this.acceptedWorkGain,
    		jobSelectionFinished: this.jobSelection.finished,
    		runOneWithLoop: buttonData.runOneWithLoop,
    		degree: this.degree,
    		schoolFinished: this.schoolFinished,
		};
	}

}