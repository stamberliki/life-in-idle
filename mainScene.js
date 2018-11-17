class mainScene extends Phaser.Scene{
	constructor(){
		super({key:"mainScene"});
	}

	preload (){
        this.load.image('me','character.png');
    }

    create (){
    }

}