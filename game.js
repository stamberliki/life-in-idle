var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    backgroundColor: '#6d6d6d',
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var scale = 2;
var currentStage = 0;
var nextStageLocked = true;
var nextStageWasLocked = false;
var characterIdle = ['baby_idle','baby2_idle','toddler_idle',
                    'earlyChild_idle','childhood_idle','teenager1_idle',
                    'teenager2_idle','adulthood_idle'];
var graphics;
var bed;
var activeButtonLeft = [];
var activeButtonRight = [];
var activeButtonCharacter = [];
var money;
var moneyAmount;
var exp;
var expAmount;
var buyIcon;

var onPause = function onPause(){
    console.log('paused');
}
var onResume = function onResume(){
    console.log('resume');
}

function preload (){
    this.load.spritesheet('baby','assets/characters/baby.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('baby2','assets/characters/baby2.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('toddler','assets/characters/toddler.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('earlyChild','assets/characters/early child.png',{ frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('childhood','assets/characters/childhood.png',{ frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('teenager1','assets/characters/teenager1.png',{ frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('teenager2','assets/characters/teenager2.png',{ frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('adulthood','assets/characters/adulthood.png',{ frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('button','assets/ui/button.png',{ frameWidth: 64, frameHeight: 14 });
    this.load.spritesheet('activeButton','assets/ui/active_button.png',{ frameWidth: 64, frameHeight: 18 });
    this.load.spritesheet('lockedButton','assets/ui/locked_button.png',{ frameWidth: 64, frameHeight: 19 });
    this.load.spritesheet('cribIcons','assets/props/icons/crib_icon.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('crib','assets/props/crib.png',{ frameWidth: 96, frameHeight: 64 });
    this.load.spritesheet('smallBed','assets/props/small_bed.png',{ frameWidth: 64, frameHeight: 96 });
    this.load.spritesheet('home','assets/props/background_home.png',{ frameWidth: 400, frameHeight: 300 });
    this.load.spritesheet('props','assets/ui/props.png',{ frameWidth: 64, frameHeight: 16 });
    this.load.spritesheet('buyIcon','assets/ui/buy_icon.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.image('uiBg','assets/ui/UI.png');
    this.load.bitmapFont('orangeki', 'assets/ui/font.png','assets/ui/font.fnt');
}

function create (){
    this.game.events.on('hidden',onPause);
    this.game.events.on('visible',onResume);
    bg = this.add.image(400,300+(6*scale),'home');
    bg.setScale(scale);
    createIdleAnim(this);
    this.anims.create({
        key: 'activeButtonStop',
        frames: this.anims.generateFrameNumbers('activeButton', { start: 1, end: 2 }),
        frameRate: 2,
        repeat: -1
    });

    crib = this.add.sprite(402,300+(12*scale),'crib');
    crib.setScale(scale);

    player = this.add.sprite(400-32,300-32,'baby').setOrigin(0);
    player.setScale(scale);
    player.anims.play('baby_idle',true);

    nextStage = this.add.image(400,600-(16*scale),'button',0);
    nextStage.setScale(scale);
    nextStage.setInteractive();
    if (nextStageLocked){
        nextStage.setTexture('lockedButton',0);
    }
    nextStage.on('pointerover', function () {
        if (!nextStageLocked){
            nextStage.setFrame(1);
        }
    });
    nextStage.on('pointerout', function () {
        if (!nextStageLocked){
            nextStage.setFrame(0);
        }
    });
    nextStage.on('pointerdown', function () {
        if (!nextStageLocked){
            nextStage.setFrame(2);
        }
    });
    nextStage.on('pointerup', function () {
        if (!nextStageLocked){
            nextStage.setFrame(1);
            crib.setFrame(1)
            if (currentStage == 1){
                bg.setFrame(1);
                crib.destroy();
                bed = this.add.image(560,236,'smallBed');
                bed.setScale(scale);
            }
            if (currentStage == 2){
                player.setPosition(400-32,300-96);
            }
            currentStage++;
            player.anims.play(characterIdle[currentStage],true);

            nextStageLocked = true;
        }
    },this);

    testBtn = this.add.image(600-(32*scale),600-(32*scale),'button',0).setOrigin(0);
    testBtn.setScale(scale);
    testBtn.setInteractive();
    testBtn.on('pointerup', function () {
        nextStageLocked = false;
        nextStageWasLocked = true;
    });

    ui = this.add.image(0,0,'uiBg').setOrigin(0);
    ui.setScale(scale);

    createActiveButtonLeft(this,2,{
        description: 'WORK',
        pause: true,
        timeEvent: this.time.addEvent({
            delay:5000, loop:true, callback: gainGold,
            callbackScope: this, paused: true
        }),
    });

    createActiveButtonRight(this,2,{
        description: 'WORK',
        pause: true,
        timeEvent: this.time.addEvent({
            delay:5000, loop:true, callback: gainGold,
            callbackScope: this, paused: true
        }),
    });

    createActiveButtonCharacter(this,2,{
        description: 'aaaaaaaaaaa',
        pause: true,
        timeEvent: this.time.addEvent({
            delay:5000, loop:true, callback: expGain,
            callbackScope: this, paused: true
        }),
    });

    buyIcon = this.add.image(640,103,'buyIcon',0).setOrigin(0);
    buyIcon.setScale(scale);
    buyIcon.setInteractive();
    buyIcon.on('pointerout',function(){
        buyIcon.setFrame(0);
    });
    buyIcon.on('pointerover',function(){
        buyIcon.setFrame(1);
    });

    graphics = this.add.graphics({x:0,y:0});

    money = this.add.image(130,103,'props',0).setOrigin(0);
    money.setScale(scale);

    exp = this.add.image(130,137,'props',1).setOrigin(0);
    exp.setScale(scale);

    moneyAmount = this.add.bitmapText(175,110,'orangeki').setOrigin(0);
    moneyAmount.setText(0);
    moneyAmount.setData('amount',0);

    expAmount = this.add.bitmapText(175,144,'orangeki').setOrigin(0);
    expAmount.setData('amount',0);
    expAmount.setText(0);

}

function update(){
    graphics.clear();
    graphics.fillStyle(0x874a1b, 1);
    if (nextStageLocked){
        nextStage.setTexture('lockedButton',0);
    }
    else if (nextStageWasLocked){
        nextStage.setTexture('button',0);
        nextStageWasLocked = false;
    }
    for (var x = 0 ; x != activeButtonLeft.length ; x++){
        let buttons = activeButtonLeft[x];
        if (!buttons.data.values.timeEvent.paused){
            let x = buttons.x;
            let y = buttons.y;
            graphics.fillRect(x+20, y+24, 88 * buttons.data.values.timeEvent.getProgress(), 4);
        }
    }

    for (var x = 0 ; x != activeButtonRight.length ; x++){
        let buttons = activeButtonRight[x];
        if (!buttons.data.values.timeEvent.paused){
            let x = buttons.x;
            let y = buttons.y;
            graphics.fillRect(x+20, y+24, 88 * buttons.data.values.timeEvent.getProgress(), 4);
        }
    }

    for (var x = 0 ; x != activeButtonCharacter.length ; x++){
        let buttons = activeButtonCharacter[x];
        if (!buttons.data.values.timeEvent.paused){
            let x = buttons.x;
            let y = buttons.y;
            graphics.fillRect(x+20, y+24, 88 * buttons.data.values.timeEvent.getProgress(), 4);
        }
    }
}

function gainGold(gain, param){
    moneyAmount.setText(moneyAmount.data.values.amount += gain);
    if (param.data.values.pause){
        param.data.values.timeEvent.paused = true;
        param.anims.remove('activeButtonStop');
    }
}

function expGain(gain, param){
    expAmount.setText(expAmount.data.values.amount += gain);
    if (param.data.values.pause){
        param.data.values.timeEvent.paused = true;
        param.anims.remove('activeButtonStop');
    }

}

function createIdleAnim(param){
    param.anims.create({
        key: 'baby_idle',
        frames: param.anims.generateFrameNumbers('baby', { start: 0, end: 6 }),
        frameRate: 2,
        repeat: -1
    });
    param.anims.create({
        key: 'baby2_idle',
        frames: param.anims.generateFrameNumbers('baby2', { start: 0, end: 2 }),
        frameRate: 2,
        repeat: -1
    });
    param.anims.create({
        key: 'toddler_idle',
        frames: param.anims.generateFrameNumbers('toddler', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    param.anims.create({
        key: 'earlyChild_idle',
        frames: param.anims.generateFrameNumbers('earlyChild', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    param.anims.create({
        key: 'childhood_idle',
        frames: param.anims.generateFrameNumbers('childhood', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    param.anims.create({
        key: 'teenager1_idle',
        frames: param.anims.generateFrameNumbers('teenager1', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    param.anims.create({
        key: 'teenager2_idle',
        frames: param.anims.generateFrameNumbers('teenager2', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    param.anims.create({
        key: 'adulthood_idle',
        frames: param.anims.generateFrameNumbers('adulthood', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
}

function createActiveButtonLeft(param, gain, data){
    var size = activeButtonLeft.length;
    var x = -1;
    var y = 125+((size+1)*38);
    activeButtonLeft.push(
            param.add.sprite(x,y,'activeButton',1).setOrigin(0)
        );
    activeButtonLeft[size].setScale(scale);
    activeButtonLeft[size].setInteractive();
    activeButtonLeft[size].setData(data);
    activeButtonLeft[size].data.values.description = param.add.bitmapText(x+64,y+11,'orangeki', data.description).setOrigin(0.5).setCenterAlign();
    activeButtonLeft[size].data.values.timeEvent.args = [gain, activeButtonLeft[size]];
    activeButtonLeft[size].on('pointerout',function(){
        if(!activeButtonLeft[size].data.values.pause || activeButtonLeft[size].data.values.timeEvent.paused){
            activeButtonLeft[size].setFrame(1);
        }
    });
    activeButtonLeft[size].on('pointerover',function(){
        if(!activeButtonLeft[size].data.values.pause || activeButtonLeft[size].data.values.timeEvent.paused){
            activeButtonLeft[size].setFrame(0);
        }
    });
    activeButtonLeft[size].on('pointerup',function(){
        if (activeButtonLeft[size].data.values.timeEvent.paused){
            activeButtonLeft[size].data.values.timeEvent.paused = false;
            activeButtonLeft[size].data.values.pause = false;
        }
        else{
            activeButtonLeft[size].data.values.pause = true;
            activeButtonLeft[size].anims.play('activeButtonStop',true);
        }
    });
}

function createActiveButtonRight(param, gain, data){
    var size = activeButtonRight.length;
    var x = 673;
    var y = 125+((size+1)*38);
    activeButtonRight.push(
            param.add.image(x,y,'activeButton',1).setOrigin(0)
        );
    activeButtonRight[size].setScale(scale);
    activeButtonRight[size].setInteractive();
    activeButtonRight[size].setData(data);
    activeButtonRight[size].data.values.description = param.add.bitmapText(x+64,y+11,'orangeki',data.description).setOrigin(0.5).setCenterAlign();
    activeButtonRight[size].data.values.timeEvent.args = [gain, activeButtonRight[size].data];
    activeButtonRight[size].on('pointerout',function(){
        activeButtonRight[size].setFrame(1);
    });
    activeButtonRight[size].on('pointerover',function(){
        activeButtonRight[size].setFrame(0);
    });
    activeButtonRight[size].on('pointerup',function(){
        if (activeButtonRight[size].data.values.timeEvent.paused){
            activeButtonRight[size].data.values.timeEvent.paused = false;
            activeButtonRight[size].data.values.pause = false;
        }
        else{
            activeButtonRight[size].data.values.pause = true;
        }
    });
}

function createActiveButtonCharacter(param, gain, data){
    var size = activeButtonCharacter.length;
    var x = 332+(size*160);
    var y = 8;
    if (size > 2){
        x = 332+((size-3)*160);
        y = 32+16+8;
    }

    activeButtonCharacter.push(
            param.add.image(x,y,'activeButton',1).setOrigin(0)
        );
    activeButtonCharacter[size].setScale(scale);
    activeButtonCharacter[size].setInteractive();
    activeButtonCharacter[size].setData(data);
    activeButtonCharacter[size].data.values.description = param.add.bitmapText(x+64,y+11,'orangeki', data.description).setOrigin(0.5).setCenterAlign();
    activeButtonCharacter[size].data.values.timeEvent.args = [gain, activeButtonCharacter[size]];
    activeButtonCharacter[size].on('pointerout',function(){
        activeButtonCharacter[size].setFrame(1);
    });
    activeButtonCharacter[size].on('pointerover',function(){
        activeButtonCharacter[size].setFrame(0);
    });
    activeButtonCharacter[size].on('pointerup',function(){
        if (activeButtonCharacter[size].data.values.timeEvent.paused){
            activeButtonCharacter[size].data.values.timeEvent.paused = false;
            activeButtonCharacter[size].data.values.pause = false;
        }
        else{
            activeButtonCharacter[size].data.values.pause = true;
        }
    });
}