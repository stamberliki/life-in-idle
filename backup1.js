import {activeButton} from './activeButton.js';
import {getActiveButtonStats} from './getActiveButtonStats.js';
import {nextStageData} from './nextStageData.js';

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
var crib;
var player;
var nextStage;
var money;
var moneyAmount;
var exp;
var expAmount;
var buyIcon;
var ui;
var saveData = window.localStorage;
var outFocusTime;
var activeButtonLeft = [];
var activeButtonRight = [];
var activeButtonCharacter = [];

var testBtn;

if (!Math.trunc) {
    Math.trunc = function(v) {
        v = +v;
        return (v - v % 1)   ||   (!isFinite(v) || v === 0 ? v : v < 0 ? -0 : 0);
    };
}

var onPause = function onPause(){
    console.log('paused');
    outFocusTime = Date.now();
}
var onResume = function onResume(){
    console.log('resume');
    let elapseTime = Date.now() - outFocusTime;
    for (var x = 0 ; x != this.activeButtonLeft.length ; x++){
        reloadActiveButton(this.activeButtonLeft[x],elapseTime);
    }

    for (var x = 0 ; x != this.activeButtonRight.length ; x++){
        reloadActiveButton(this.activeButtonRight[x],elapseTime);
    }

    for (var x = 0 ; x != activeButtonCharacter.length ; x++){
        reloadActiveButton(activeButtonCharacter[x],elapseTime);
    }
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
    this.load.spritesheet('closeButton','assets/ui/close_button.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.image('uiBg','assets/ui/UI.png');
    this.load.image('buyMenuBg','assets/ui/buy_menu.png');
    this.load.bitmapFont('mainFont', 'assets/ui/font.png','assets/ui/font.fnt');
    this.load.bitmapFont('mainFont8', 'assets/ui/font8.png','assets/ui/font8.fnt');

    this.bg;
    this.buyMenuObj;
    this.buyMenu;
    this.buyMenuBg;
    this.close;
    this.saveGame;
    this.saveManager;
    this.gainMoney;
    this.expGain;
    this.buttonLeftSelected = false;
    this.buttonRightSelected = false;
    this.buttonCharacterSelected = false;
    this.allButtonCharacterUnlock = false;
    this.moneyMultiplier = 1;
    this.expMultiplier = 1;
    this.activeButtonLeft = [];
    this.activeButtonRight = [];
    this.activeButtonCharacter = [];

    this.inputs = [];
}

function create (){
    this.game.events.on('hidden',onPause);
    this.game.events.on('visible',onResume);
    this.gainMoney = gainGold;
    this.expGain = expGain;
    this.activeButtonLeft = activeButtonLeft;
    this.activeButtonRight = activeButtonRight;
    this.activeButtonCharacter = activeButtonCharacter;

    this.bg = this.add.image(400,300+(6*scale),'home',0);
    this.bg.setScale(scale);
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

    bed = this.add.image(560,236,'smallBed');
    bed.setScale(scale);
    bed.visible = false;

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
            crib.setFrame(1);
            if (currentStage == 1){
                this.bg.setFrame(1);
                crib.destroy();
                bed.visible = true;
            }
            if (currentStage == 2){
                player.setPosition(400-32,300-96);
            }
            currentStage++;
            player.anims.play(characterIdle[currentStage],true);
            nextStageLocked = true;
        }
    },this);

    ui = this.add.image(0,0,'uiBg').setOrigin(0);
    ui.setScale(scale);

    buyIcon = this.add.image(640,103,'buyIcon',0).setOrigin(0);
    buyIcon.setScale(scale);
    buyIcon.setInteractive();
    buyIcon.setData({
        enable:true,
    });
    buyIcon.on('pointerout',function(){
        buyIcon.setFrame(0);
    });
    buyIcon.on('pointerover',function(){
        buyIcon.setFrame(1);
    });
    buyIcon.on('pointerup',function(){
        if(buyIcon.data.values.enable){
            this.buyMenu.open();
            disableActiveButtonEvent(this);
            buyIcon.data.values.enable = false;
        }
    },this);

    money = this.add.image(130,103,'props',0).setOrigin(0);
    money.setScale(scale);
    exp = this.add.image(130,137,'props',1).setOrigin(0);
    exp.setScale(scale);

    moneyAmount = this.add.bitmapText(175,111,'mainFont').setOrigin(0);
    expAmount = this.add.bitmapText(175,145,'mainFont').setOrigin(0);

    this.saveManager = new saveManager(this);
    this.saveManager.load(this);
    checkUnlockableActiveButton(this);

    this.inputs.push(nextStage);
    putActiveButtonEvent(this);

    graphics = this.add.graphics({x:0,y:0});

    this.buyMenu = new buyMenu(this);
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

    for (var a = 0 ; a != activeButtonCharacter.length ; a++){
        let buttons = activeButtonCharacter[a];
        let x = buttons.x;
        let y = buttons.y;
        graphics.fillRect(x+20, y+24, 88 * buttons.data.values.timeEvent.getProgress(), 4);
    }
    checkUnlockableActiveButton(this);
    // if (this.allButtonCharacterUnlock && nextStageData(this, saveData.getItem('stage'))) {
        
    // }
}

function putActiveButtonEvent(game){
    for (var x = 0 ; x != game.activeButtonLeft.length ; x++){
        game.inputs.push(game.activeButtonLeft[x]);
    }
    for (var x = 0 ; x != game.activeButtonRight.length ; x++){
        game.inputs.push(game.activeButtonRight[x]);
    }
    for (var x = 0 ; x != game.activeButtonCharacter.length ; x++){
        game.inputs.push(game.activeButtonCharacter[x]);
    }
}

function disableActiveButtonEvent(game){
    for (var x = 0 ; x != game.inputs.length ; x++){
        game.inputs[x].disableInteractive();
    }
}

function enableActiveButtonEvent(game){
    for (var x = 0 ; x != game.inputs.length ; x++){
        game.inputs[x].setInteractive();
    }
}

function gainGold(gain, button){
    moneyAmount.setText(moneyAmount.data.values.amount += gain);
    if (button.data.values.pause){
        button.data.values.timeEvent.paused = true;
        button.data.values.pausedMidway = false;
        button.anims.remove('activeButtonStop');
        if (button.data.values.position == 'left'){
            this.buttonLeftSelected = false;
        }
        else if (button.data.values.position == 'right'){
            this.buttonRightSelected = false;
        }
        else if (button.data.values.position == 'character'){
            this.buttonCharacterSelected = false;
        }
    }
}

function expGain(gain, button){
    expAmount.setText(expAmount.data.values.amount += gain);
    if (button.data.values.pause){
        button.data.values.timeEvent.paused = true;
        button.data.values.pausedMidway = false;
        button.anims.remove('activeButtonStop');
        if (button.data.values.position == 'left'){
            this.buttonLeftSelected = false;
        }
        else if (button.data.values.position == 'right'){
            this.buttonRightSelected = false;
        }
        else if (button.data.values.position == 'character'){
            this.buttonCharacterSelected = false;
        }
    }
}

function createIdleAnim(game){
    game.anims.create({
        key: 'baby_idle',
        frames: game.anims.generateFrameNumbers('baby', { start: 0, end: 6 }),
        frameRate: 2,
        repeat: -1
    });
    game.anims.create({
        key: 'baby2_idle',
        frames: game.anims.generateFrameNumbers('baby2', { start: 0, end: 2 }),
        frameRate: 2,
        repeat: -1
    });
    game.anims.create({
        key: 'toddler_idle',
        frames: game.anims.generateFrameNumbers('toddler', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    game.anims.create({
        key: 'earlyChild_idle',
        frames: game.anims.generateFrameNumbers('earlyChild', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    game.anims.create({
        key: 'childhood_idle',
        frames: game.anims.generateFrameNumbers('childhood', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    game.anims.create({
        key: 'teenager1_idle',
        frames: game.anims.generateFrameNumbers('teenager1', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    game.anims.create({
        key: 'teenager2_idle',
        frames: game.anims.generateFrameNumbers('teenager2', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
    game.anims.create({
        key: 'adulthood_idle',
        frames: game.anims.generateFrameNumbers('adulthood', { start: 0, end: 4 }),
        frameRate: 2,
        repeat: -1
    });
}

function buyMenu(game){
    game.buyMenuBg = game.add.image(0,600,'buyMenuBg').setOrigin(0);
    game.buyMenuBg.setScale(scale);

    game.close = game.add.image(746,632,'closeButton',0).setOrigin(0);
    game.close.setScale(scale);
    game.close.setInteractive();
    game.close.on('pointerout',function() {
        game.close.setFrame(0);
    },game);
    game.close.on('pointerover',function() {
        game.close.setFrame(1);
    },game);
    game.close.on('pointerup',function(){
        game.buyMenu.close();
        enableActiveButtonEvent(game);
        buyIcon.data.values.enable = true;
    },game);

    this.open = function(){
        game.buyMenuBg.y -= 600;
        game.close.y -= 600;
    }

    this.close = function(){
        game.buyMenuBg.y += 600;
        game.close.y += 600;
    }
}

function saveManager(game){
    game.saveGame = window.localStorage;
    game.time.addEvent({
            delay:1000, loop:true, callback: save,
            callbackScope: this, args:[game],
        });
    // game.saveGame.clear();
    if (!game.saveGame.getItem('wasSaved')){
        console.log('write');
        game.saveGame.setItem('money',0);
        game.saveGame.setItem('exp',0);
        activeButton(game,activeButtonLeft,
            'left',getActiveButtonStats(game,'left',1,1));

        activeButton(game,activeButtonRight,
            'right',getActiveButtonStats(game,'right',1,1));

        activeButton(game,activeButtonCharacter,
            'character',getActiveButtonStats(game,'character',1,1));
    }

    moneyAmount.setData('amount',parseInt(game.saveGame.getItem('money')));
    moneyAmount.setText(parseInt(game.saveGame.getItem('money')));
    expAmount.setData('amount',parseInt(game.saveGame.getItem('exp')));
    expAmount.setText(parseInt(game.saveGame.getItem('exp')));
    game.saveGame.setItem('buttonSelected',JSON.stringify({
        buttonLeftSelected: game.buttonLeftSelected,
        buttonRightSelected: game.buttonRightSelected,
        buttonCharacterSelected: game.buttonCharacterSelected,
    }));

    this.save = function(game){
        game.saveGame.setItem('wasSaved',true);
        game.saveGame.setItem('money',moneyAmount.data.values.amount);
        game.saveGame.setItem('exp',expAmount.data.values.amount);
        game.saveGame.setItem('time',Date.now());
        game.saveGame.setItem('buttonSelected',JSON.stringify({
            buttonLeftSelected: game.buttonLeftSelected,
            buttonRightSelected: game.buttonRightSelected,
            buttonCharacterSelected: game.buttonCharacterSelected,
        }));

        let activeLeft = {};
        let activeRight = {};
        let activeCharacter = {};
        for (var x = 0 ; x != activeButtonLeft.length ; x++){
            let buttons = game.activeButtonLeft[x].data.values;
            activeLeft[x] = {
                stage: buttons.stage,
                number: buttons.number,
                pause: buttons.pause,
                pausedMidway: buttons.pausedMidway,
                elapseTime: buttons.timeEvent.getProgress(),
                delay: buttons.timeEvent.delay,
                event: buttons.event,
                unlocked: buttons.unlocked,
                gain: buttons.gain,

            }
        }
        game.saveGame.setItem('activeLeft',JSON.stringify(activeLeft));

        for (var x = 0 ; x != activeButtonRight.length ; x++){
            let buttons = game.activeButtonRight[x].data.values;
            activeRight[x] = {
                stage: buttons.stage,
                number: buttons.number,
                pause: buttons.pause,
                pausedMidway: buttons.pausedMidway,
                elapseTime: buttons.timeEvent.getProgress(),
                delay: buttons.timeEvent.delay,
                event: buttons.event,
                unlocked: buttons.unlocked,
                gain: buttons.gain,
            }
        }
        game.saveGame.setItem('activeRight',JSON.stringify(activeRight));

        for (var x = 0 ; x != activeButtonCharacter.length ; x++){
            let buttons = game.activeButtonCharacter[x].data.values;
            activeCharacter[x] = {
                stage: buttons.stage,
                number: buttons.number,
                pause: buttons.pause,
                pausedMidway: buttons.pausedMidway,
                elapseTime: buttons.timeEvent.getProgress(),
                delay: buttons.timeEvent.delay,
                event: buttons.event,
                unlocked: buttons.unlocked,
                gain: buttons.gain,
            }
        }   
        game.saveGame.setItem('stage',activeCharacter[0].stage);
        game.saveGame.setItem('activeCharacter',JSON.stringify(activeCharacter));
    }

    this.load = function(game){
        let loadGame = game.saveGame;
        moneyAmount.setText(parseInt(loadGame.getItem('money')));
        expAmount.setText(parseInt(loadGame.getItem('exp')));
        let buttonSelected = JSON.parse(loadGame.getItem('buttonSelected'));
        game.buttonLeftSelected = buttonSelected.buttonLeftSelected;
        game.buttonRightSelected = buttonSelected.buttonRightSelected;
        game.buttonCharacterSelected = buttonSelected.buttonCharacterSelected;

        let elapseTime = loadGame.getItem('time');
        if (elapseTime){
            elapseTime = Date.now() - elapseTime;
        }

        let activeLeft = JSON.parse(loadGame.getItem('activeLeft'));
        if (activeLeft != null){
            for (var x = 0 ; x != Object.keys(activeLeft).length ; x++){
                loadActiveButton(game,'left',x,activeLeft[x],elapseTime);
            }
        }

        let activeRight = JSON.parse(loadGame.getItem('activeRight'));
        if (activeRight != null){
            for (var x = 0 ; x != Object.keys(activeRight).length ; x++){
                loadActiveButton(game,'right',x,activeRight[x],elapseTime);
            }
        }

        let activeCharacter = JSON.parse(loadGame.getItem('activeCharacter'));
        if (activeCharacter != null){
            for (var x = 0 ; x != Object.keys(activeCharacter).length ; x++){
                loadActiveButton(game,'character',x,activeCharacter[x],elapseTime);
            }
        }
    }
}

function loadActiveButton(game,position,x,Button,elapseTime){
    let button = Button;
    let event;
    if (button.event == 'gainGold'){
        event = gainGold;
    }
    else if (button.event == 'expGain'){
        event = expGain;
    }
    let buttonElapseTime = button.elapseTime;
    let delay = button.delay;
    if (!button.pause){
        console.log('pass');
        if (delay < ((elapseTime)+(buttonElapseTime*delay))){
            buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
            let accumulate = Math.trunc(buttonElapseTime/delay);
            if (button.event == 'gainGold'){
                moneyAmount.data.values.amount += button.gain*accumulate;
                moneyAmount.setText(moneyAmount.data.values.amount);
            }
            else if (button.event == 'expGain'){
                expAmount.data.values.amount += button.gain*accumulate;
                expAmount.setText(expAmount.data.values.amount);
            }
            buttonElapseTime = buttonElapseTime-(delay*accumulate);
        }
        else {
            buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
        }
    }
    if (button.pausedMidway){
        buttonElapseTime = buttonElapseTime*delay;
    }
    if (position == 'left'){
        activeButton(game,game.activeButtonLeft,'left',
            getActiveButtonStats(game,'left',button.stage,button.number,buttonElapseTime));
        game.activeButtonLeft[x].data.values.timeEvent.paused = button.pause;
        game.activeButtonLeft[x].data.values.pause = button.pause;
        game.activeButtonLeft[x].data.values.unlocked = button.unlocked;
        if (button.unlocked){
            game.activeButtonLeft[x].setFrame(1);
        }
    }
    else if (position == 'right'){
        activeButton(game,game.activeButtonRight,'right',
            getActiveButtonStats(game,'right',button.stage,button.number,buttonElapseTime));
        game.activeButtonRight[x].data.values.timeEvent.paused = button.pause;
        game.activeButtonRight[x].data.values.pause = button.pause;   
        game.activeButtonRight[x].data.values.unlocked = button.unlocked;
        if (button.unlocked){
            game.activeButtonRight[x].setFrame(1);
        }
    }
    else if (position == 'character'){
        activeButton(game,game.activeButtonCharacter,'character',
            getActiveButtonStats(game,'character',button.stage,button.number,buttonElapseTime));
        game.activeButtonCharacter[x].data.values.timeEvent.paused = button.pause;
        game.activeButtonCharacter[x].data.values.pause = button.pause;
        game.activeButtonCharacter[x].data.values.pausedMidway = button.pausedMidway;
        game.activeButtonCharacter[x].data.values.unlocked = button.unlocked;
        if (button.unlocked){
            game.activeButtonCharacter[x].setFrame(1);
        }  
    }
    // console.log(game.activeButtonLeft[x].data.values.timeEvent.startAt);
}

function reloadActiveButton(button,elapseTime){
    let buttons = button;
    let delay = buttons.data.values.timeEvent.delay;
    let buttonElapseTime = buttons.data.values.timeEvent.getProgress();
    if (!buttons.data.values.timeEvent.paused){
        if (delay < ((elapseTime)+(buttonElapseTime*delay))){
            buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
            let accumulate = Math.trunc(buttonElapseTime/delay);
            if (buttons.data.values.timeEvent.callback == gainGold){
                moneyAmount.data.values.amount += buttons.data.values.timeEvent.args[0]*accumulate;
                moneyAmount.setText(moneyAmount.data.values.amount);
            }
            else if (buttons.data.values.timeEvent.callback == expGain){
                expAmount.data.values.amount += buttons.data.values.timeEvent.args[0]*accumulate;
                expAmount.setText(expAmount.data.values.amount);
            }
            buttonElapseTime = buttonElapseTime-(delay*accumulate);
        }
        else {
            buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
        }
    }
    if (buttons.data.values.pausedMidway){
        buttonElapseTime = buttonElapseTime*delay;
    }
    buttons.data.values.timeEvent.elapsed = buttonElapseTime;
}

function checkUnlockableActiveButton(game){
    let x = activeButtonCharacter.length-1;
    let button = activeButtonCharacter[x].data.values;
    if (button.requiredExpToUnlock <= expAmount.data.values.amount && !game.allButtonCharacterUnlock){
        if (getActiveButtonStats(game,'character',button.stage,button.number+1) === true){
            game.activeButtonCharacter[x].setFrame(1);
            button.unlocked = true;
            game.allButtonCharacterUnlock = true;
        }
        else{
            activeButton(game,activeButtonCharacter,'character',
                getActiveButtonStats(game,'character',button.stage,button.number+1));
            activeButtonCharacter[x].setFrame(1);
            activeButtonCharacter[x+1].depth = activeButtonCharacter[x].depth;
            activeButtonCharacter[x+1].data.values.depth = activeButtonCharacter[x].data.values.depth;
            button.unlocked = true;
            console.log(activeButtonCharacter[x+1].z +'|'+ activeButtonCharacter[x].z);
        }
    }
}

function save(game){
    game.saveManager.save(game);
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}