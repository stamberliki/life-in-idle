export class popupEvent{

	constructor(game,text,disapproveEvent){
		this.game = game;
		this.popup = this.game.add.image(0, 0, 'popupEvent').setOrigin(0).setScale(2);
		this.popup.depth = 2;
		this.approveButton;
		this.disapproveButton;
		this.text = this.game.add.bitmapText(280,244,'mainFont2',text).setFontSize(16);
		this.text.depth = 2;
		if (disapproveEvent){
			this.approveButton = this.game.add.sprite(344,342,'button32',0).setScale(2);
			this.approveButton.depth = 2;
			this.approveButton.setInteractive();
			this.disapproveButton = this.game.add.sprite(456,342,'button32',0).setScale(2);
			this.disapproveButton.depth = 2;
			this.disapproveButton.setInteractive();

			this.approveButton.on('pointerout',function(){
				this.approveButton.setFrame(0);
			},this);
			this.approveButton.on('pointerover',function(){
				this.approveButton.setFrame(1);
			},this);

			this.disapproveButton.on('pointerout',function(){
				this.disapproveButton.setFrame(0);
			},this);
			this.disapproveButton.on('pointerover',function(){
				this.disapproveButton.setFrame(1);
			},this);
		}
		else {
			this.approveButton = this.game.add.sprite(400,342,'button32',0).setScale(2);
			this.approveButton.depth = 2;
			this.approveButton.setInteractive();
			this.approveButton.setData('text', this.game.add.bitmapText(400,342,'mainFont','OK').setFontSize(8).setOrigin(0.5));
			this.approveButton.data.values.text.depth = 2;

			this.approveButton.on('pointerout',function(){
				this.approveButton.setFrame(0);
			},this);
			this.approveButton.on('pointerover',function(){
				this.approveButton.setFrame(1);
			},this);
			this.approveButton.on('pointerup',function(){
				this.destroy();
			},this);
		}

	}


	show (){

	}

	hide(){

	}

	destroy(){
		this.game = '';
		this.approveButton.data.values.text.destroy();
		this.approveButton.destroy();
		this.popup.destroy();
		this.text.destroy();
		if (this.disapproveButton){
			this.disapproveButton.data.values.destroy();
			this.disapproveButton.destroy();
		}
	}

}