import {activeButton} from './activeButton.js';
import {getActiveButtonStats} from './getActiveButtonStats.js';
import {nextStageData} from './nextStageData.js';
import {buffList} from './buffList.js';
import {buyMenuItems} from './buyMenuItems.js';
// import {buyMenuItemsData} from './buyMenuItemsData.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    backgroundColor: '#000000',
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
var outFocusTime;
var activeButtonLeft = [];
var activeButtonRight = [];
var activeButtonCharacter = [];

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
    for (var x = 0 ; x != activeButtonLeft.length ; x++){
        reloadActiveButton(activeButtonLeft[x],elapseTime);
    }

    for (var x = 0 ; x != activeButtonRight.length ; x++){
        reloadActiveButton(activeButtonRight[x],elapseTime);
    }

    for (var x = 0 ; x != activeButtonCharacter.length ; x++){
        reloadActiveButton(activeButtonCharacter[x],elapseTime);
    }
    if (game.currentBuffCharacter){
        if (game.currentBuffCharacter.buffDuration){
            if (game.currentBuffCharacter.buffDuration.delay > game.currentBuffCharacter.buffDuration.elapsed+elapseTime){
                game.currentBuffCharacter.buffDuration.elapsed += elapseTime;
            }
            else{
                game.currentBuffCharacter.deactivate();
            }
        }
    }
    if (game.currentBuffLeft){
        if (game.currentBuffLeft.buffDuration){
            if (game.currentBuffLeft.buffDuration.delay > game.currentBuffLeft.buffDuration.elapsed+elapseTime){
                game.currentBuffLeft.buffDuration.elapsed += elapseTime;
            }
            else{
                game.currentBuffLeft.deactivate();
            }
        }
    }
    if (game.currentBuffRight){
        if (game.currentBuffRight.buffDuration){
            if (game.currentBuffRight.buffDuration.delay > game.currentBuffRight.buffDuration.elapsed+elapseTime){
                game.currentBuffRight.buffDuration.elapsed += elapseTime;
            }
            else{
                game.currentBuffRight.deactivate();
            }
        }
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
    this.load.spritesheet('buyMenuIcons','assets/props/icons/buy_menu_icons.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('crib','assets/props/crib.png',{ frameWidth: 96, frameHeight: 64 });
    this.load.spritesheet('smallBed','assets/props/small_bed.png',{ frameWidth: 64, frameHeight: 96 });
    this.load.spritesheet('home','assets/props/background_home.png',{ frameWidth: 400, frameHeight: 300 });
    this.load.spritesheet('props','assets/ui/props.png',{ frameWidth: 64, frameHeight: 16 });
    this.load.spritesheet('buyIcon','assets/ui/buy_icon.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('closeButton','assets/ui/close_button.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('buffIcons','assets/ui/buff_icons.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('buttonDescription','assets/ui/button_description.png',{ frameWidth: 64, frameHeight: 24 });
    this.load.spritesheet('buffDescription','assets/ui/buff_description.png',{ frameWidth: 32, frameHeight: 24 });
    this.load.spritesheet('buyMenuButtons','assets/ui/buy_menu_props.png',{ frameWidth: 48, frameHeight: 16 });
    this.load.spritesheet('buyMenuItems','assets/ui/buy_menu_items.png',{ frameWidth: 64, frameHeight: 80 });
    this.load.spritesheet('buyMenuCategories','assets/ui/buy_menu_categories.png',{ frameWidth: 64, frameHeight: 16 });
    this.load.image('uiBg','assets/ui/UI.png');
    this.load.image('buyMenuBg','assets/ui/buy_menu.png');
    this.load.bitmapFont('mainFont', 'assets/ui/font.png','assets/ui/font.fnt');
    this.load.bitmapFont('mainFont2', 'assets/ui/font2.png','assets/ui/font2.fnt');
    this.load.bitmapFont('mainFont8', 'assets/ui/font8.png','assets/ui/font8.fnt');

    this.bg;
    this.buyMenuObj;
    this.buyMenu;
    this.buyMenuMoney;
    this.buyMenuBg;
    this.fakeBuyMenuBg;
    this.close;
    this.saveGame;
    this.saveManager;
    this.gainMoney;
    this.expGain;
    this.moneyAmount;
    this.expAmount;
    this.isCareSelected = true;
    this.buyMenuCamera;
    this.buyMenuCategorySelect;
    this.buyMenuItemsCount = this.buyMenuItemsCount + 1 || 0;

    this.buttonLeftSelected = false;
    this.buttonRightSelected = false;
    this.buttonCharacterSelected = false;
    this.allButtonCharacterUnlock = false;
    this.activeButtonNonCharacterCount = [2,2,1];

    this.currentBuffCharacter = null;
    this.currentBuffLeft = null;
    this.currentBuffRight = null;

    this.activeButtonLeft = [];
    this.activeButtonRight = [];
    this.activeButtonCharacter = [];
    this.buyMenuItems = {toy:[], b:[], c:[], d:[], e:[], f:[], };
    this.buyMenuCategories = [];

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

    this.bg = this.add.image(400,300,'home',0);
    this.bg.setScale(scale);
    createIdleAnim(this);
    this.anims.create({
        key: 'activeButtonStop',
        frames: this.anims.generateFrameNumbers('activeButton', { start: 1, end: 2 }),
        frameRate: 2,
        repeat: -1
    });

    crib = this.add.sprite(402,288+(12*scale),'crib');
    crib.setScale(scale);

    player = this.add.sprite(400-32,300-44,'baby').setOrigin(0);
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

            for (let x = 0 ; x != activeButtonLeft.length ; x++){
                activeButtonLeft[x].data.values.description.destroy();
                activeButtonLeft[x].destroy();
            }
            for (let x = 0 ; x != activeButtonRight.length ; x++){
                activeButtonRight[x].data.values.description.destroy();
                activeButtonRight[x].destroy();
            }
            for (let x = 0 ; x != activeButtonCharacter.length ; x++){
                activeButtonCharacter[x].data.values.description.destroy();
                activeButtonCharacter[x].destroy();
            }
            activeButtonLeft.length = 0;
            activeButtonRight.length = 0;
            activeButtonCharacter.length = 0;
            this.inputs.length = 0;

            for (let x = 0 ; x != this.activeButtonNonCharacterCount[currentStage-1] ; x++){
                activeButton(this,activeButtonLeft,
                    'left',getActiveButtonStats(this,'left',currentStage+1,x+1,buffList));

                activeButton(this,activeButtonRight,
                    'right',getActiveButtonStats(this,'right',currentStage+1,x+1,buffList));
            }
            activeButton(this,activeButtonCharacter,
                'character',getActiveButtonStats(this,'character',currentStage+1,1,buffList));

            nextStageLocked = true;
            nextStage.setTexture('lockedButton',0);
            this.allButtonCharacterUnlock = false;
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
    this.moneyAmount = moneyAmount;
    this.expAmount = expAmount;

    graphics = this.add.graphics({x:0,y:0});
    graphics.depth = 1;

    this.buyMenu = new buyMenu(this);
    this.buyMenu.close();

    this.saveManager = new saveManager(this);
    this.saveManager.load(this);
    checkUnlockableActiveButton(this);
    this.inputs.push(nextStage);
    putAllActiveButtonEvent(this);
}

function update(){
    graphics.clear();
    graphics.fillStyle(0x874a1b, 1);
    if (nextStageWasLocked){
        nextStage.setTexture('button',0);
        nextStageWasLocked = false;
        nextStageLocked = false;
    }
    for (var a = 0 ; a != activeButtonLeft.length ; a++){
        let buttons = activeButtonLeft[a];
        let x = buttons.x;
        let y = buttons.y;
        graphics.fillRect(x+20, y+24, 88 * buttons.data.values.timeEvent.getProgress(), 4);
    }

    for (var a = 0 ; a != activeButtonRight.length ; a++){
        let buttons = activeButtonRight[a];
        let x = buttons.x;
        let y = buttons.y;
        graphics.fillRect(x+20, y+24, 88 * buttons.data.values.timeEvent.getProgress(), 4);
    }

    for (var a = 0 ; a != activeButtonCharacter.length ; a++){
        let buttons = activeButtonCharacter[a];
        let x = buttons.x;
        let y = buttons.y;
        graphics.fillRect(x+20, y+24, 88 * buttons.data.values.timeEvent.getProgress(), 4);
    }
    checkUnlockableActiveButton(this);
    // console.log(currentStage);
    if (this.allButtonCharacterUnlock && nextStageData(this, currentStage+1) && nextStageLocked) {
        nextStageWasLocked = true;
    }
}

function putAllActiveButtonEvent(game){
    for (var x = 0 ; x != game.activeButtonLeft.length ; x++){
        game.inputs.push(game.activeButtonLeft[x]);
        game.inputs.push(game.activeButtonLeft[x].data.values.buff.icon);
    }
    for (var x = 0 ; x != game.activeButtonRight.length ; x++){
        game.inputs.push(game.activeButtonRight[x]);
        game.inputs.push(game.activeButtonRight[x].data.values.buff.icon);
    }
    for (var x = 0 ; x != game.activeButtonCharacter.length ; x++){
        game.inputs.push(game.activeButtonCharacter[x]);
        game.inputs.push(game.activeButtonCharacter[x].data.values.buff.icon);
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
    this.buyMenuMoney.setText(moneyAmount.data.values.amount);
    let buttonData = button.data.values;
    let currentBuff;

    if (buttonData.position == 'left' && this.currentBuffLeft){
        checkActiveBuffs(this.currentBuffLeft);
        currentBuff = this.currentBuffLeft;
    }
    else if (buttonData.position == 'right' && this.currentBuffRight){
        checkActiveBuffs(this.currentBuffRight);
        currentBuff = this.currentBuffRight;
    }
    else if (buttonData.position == 'character' && this.currentBuffCharacter){
        checkActiveBuffs(this.currentBuffCharacter);
        currentBuff = this.currentBuffCharacter;
    }

    if (Phaser.Math.Between(1,100) <= buttonData.buff.chance && !buttonData.buff.isActive){
        if (currentBuff){
            if (currentBuff.isActive){
                currentBuff.deactivate();
            } 
        }
        buttonData.buff.active();
        if (buttonData.position == 'left'){
            this.currentBuffLeft = buttonData.buff;
        }
        else if (buttonData.position == 'right'){
            this.currentBuffRight = buttonData.buff;
        }
        else if (buttonData.position == 'character'){
            this.currentBuffCharacter = buttonData.buff;
        }
    }

    if (buttonData.pause){
        buttonData.timeEvent.paused = true;
        buttonData.pausedMidway = false;
        button.anims.remove('activeButtonStop');
        if (buttonData.position == 'left'){
            this.buttonLeftSelected = false;
        }
        else if (buttonData.position == 'right'){
            this.buttonRightSelected = false;
        }
        else if (buttonData.position == 'character'){
            this.buttonCharacterSelected = false;
        }
    }
}

function expGain(gain, button){
    expAmount.setText(expAmount.data.values.amount += gain);
    let buttonData = button.data.values;
    let currentBuff;

    if (buttonData.requiredTurnsToUnlock){
        if (buttonData.requiredTurnsToUnlock > 0){
            buttonData.requiredTurnsToUnlock -= 1;
        }
    }

    if (buttonData.position == 'left' && this.currentBuffLeft){
        checkActiveBuffs(this.currentBuffLeft);
        currentBuff = this.currentBuffLeft;
    }
    else if (buttonData.position == 'right' && this.currentBuffRight){
        checkActiveBuffs(this.currentBuffRight);
        currentBuff = this.currentBuffRight;
    }
    else if (buttonData.position == 'character' && this.currentBuffCharacter){
        checkActiveBuffs(this.currentBuffCharacter);
        currentBuff = this.currentBuffCharacter;
    }

    if (Phaser.Math.Between(1,100) <= buttonData.buff.chance && !buttonData.buff.isActive){
        if (currentBuff){
            if (currentBuff.isActive){
                currentBuff.deactivate();
            } 
        }
        buttonData.buff.active();
        if (buttonData.position == 'left'){
            this.currentBuffLeft = buttonData.buff;
        }
        else if (buttonData.position == 'right'){
            this.currentBuffRight = buttonData.buff;
        }
        else if (buttonData.position == 'character'){
            this.currentBuffCharacter = buttonData.buff;
        }
    }

    if (buttonData.pause){
        buttonData.timeEvent.paused = true;
        buttonData.pausedMidway = false;
        button.anims.remove('activeButtonStop');
        if (buttonData.position == 'left'){
            this.buttonLeftSelected = false;
        }
        else if (buttonData.position == 'right'){
            this.buttonRightSelected = false;
        }
        else if (buttonData.position == 'character'){
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
    game.buyMenuBg = game.add.image(0,0,'buyMenuBg').setOrigin(0);
    game.buyMenuBg.setScale(scale);
    game.buyMenuBg.depth = 2;

    game.buyMenuMoney = game.add.bitmapText(642,88,'mainFont').setOrigin(0);
    game.buyMenuMoney.depth = 2;

    buyMenuItems(game,game.buyMenuItems);

    game.buyMenuCamera = game.cameras.add(252, 162,416,438).setOrigin(0);
    // game.buyMenuCamera.setZoom(0.3);
    game.buyMenuCamera.scrollY = 600;

    game.fakeBuyMenuBg = game.add.image(252, 162,'buyMenuBg').setOrigin(0);
    game.fakeBuyMenuBg.setDisplaySize(416, 438);
    game.fakeBuyMenuBg.depth = 2;
    game.fakeBuyMenuBg.alpha = 0.01;
    game.fakeBuyMenuBg.setInteractive();
    game.fakeBuyMenuBg.setData('isClicked', false);
    game.fakeBuyMenuBg.on('pointerdown',function(){
        game.fakeBuyMenuBg.data.values.isClicked = true;
        game.fakeBuyMenuBg.setData('pointerY', game.input.y);
        game.fakeBuyMenuBg.setData('scrollY', game.buyMenuCamera.scrollY);
    });
    game.fakeBuyMenuBg.on('pointerup',function(){
        game.fakeBuyMenuBg.data.values.isClicked = false;
    });
    game.fakeBuyMenuBg.on('pointerout',function(){
        game.fakeBuyMenuBg.data.values.isClicked = false;
    });

    createBuyMenuCategory(game,'TOY', true);
    createBuyMenuCategory(game, 'bB');
    createBuyMenuCategory(game, 'cC');

    game.input.on('gameobjectmove',function(pointer,gameObject){
        if(game.fakeBuyMenuBg.data.values.isClicked){
            let scroll = game.fakeBuyMenuBg.data.values.scrollY-(pointer.y - game.fakeBuyMenuBg.data.values.pointerY);
            if (scroll >= 600 && scroll <= 1200){
                game.buyMenuCamera.scrollY = scroll;
            }
            else {
                game.buyMenuCamera.scrollY = 600;
            }
        }
    });

    game.close = game.add.image(746,32,'closeButton',0).setOrigin(0);
    game.close.setScale(scale);
    game.close.depth = 2;
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
        game.buyMenuBg.y += 600;
        game.close.y += 600;
        game.buyMenuCamera.y += 600;
        game.buyMenuMoney.y += 600;
        game.fakeBuyMenuBg.y += 600;
        for (let x = 0 ; x != game.buyMenuCategories.length ; x++){
            game.buyMenuCategories[x].y += 600;
            game.buyMenuCategories[x].data.values.text.y += 600;
        }
    }

    this.close = function(){
        game.buyMenuBg.y -= 600;
        game.close.y -= 600;
        game.buyMenuCamera.y -= 600;
        game.buyMenuMoney.y -= 600;
        game.fakeBuyMenuBg.y -= 600;
        for (let x = 0 ; x != game.buyMenuCategories.length ; x++){
            game.buyMenuCategories[x].y -= 600;
            game.buyMenuCategories[x].data.values.text.y -= 600;
        }
    }
}

function createBuyMenuCategory(game, name, selected = false){
    let button = game.add.image(66,162+(32*(game.buyMenuCategories.length+1)),'buyMenuCategories',0).setOrigin(0);
    button.setInteractive();
    button.setData({
        isSelected: selected,
        number: game.buyMenuCategories.length,
        name: name,
        text: game.add.bitmapText(82,170+(32*(game.buyMenuCategories.length+1)), 'mainFont', name).setFontSize(16),

    });
    button.setScale(2);
    button.depth = 2;
    button.data.values.text.depth = 2;
    if (selected){
        button.setFrame(1);
        game.buyMenuCategorySelect = button;
    }
    button.on('pointerout',function() {
        if (!button.isSelected){
            button.setFrame(0);
        }
    });
    button.on('pointerover',function() {
        if (!button.isSelected){
            button.setFrame(2);
        }
    });
    button.on('pointerup',function(){
        button.setFrame(1);
        button.isSelected = true;
        game.buyMenuCamera.scrollX = 416*button.data.values.number;
        if (game.buyMenuCategorySelect){
            game.buyMenuCategorySelect.isSelected = false;
            game.buyMenuCategorySelect.setFrame(0);
        }
        game.buyMenuCategorySelect = button;
    });
    game.buyMenuCategories.push(button);
}

function saveManager(game){
    game.saveGame = window.localStorage;
    game.time.addEvent({
            delay:1000, loop:true, callback: save,
            callbackScope: this, args:[game],
        });
    game.saveGame.clear();
    if (!game.saveGame.getItem('wasSaved')){
        console.log('write');
        game.saveGame.setItem('money',0);
        game.saveGame.setItem('exp',0);
        game.moneyAmount.setData('amount',parseInt(game.saveGame.getItem('money')));
        game.moneyAmount.setText(parseInt(game.saveGame.getItem('money')));
        game.buyMenuMoney.setText(parseInt(game.saveGame.getItem('money')));
        game.expAmount.setData('amount',parseInt(game.saveGame.getItem('exp')));
        game.expAmount.setText(parseInt(game.saveGame.getItem('exp')));
        game.saveGame.setItem('stage', 0);
        activeButton(game,activeButtonLeft,
            'left',getActiveButtonStats(game,'left',1,1,buffList));

        activeButton(game,activeButtonRight,
            'right',getActiveButtonStats(game,'right',1,1,buffList));

        activeButton(game,activeButtonLeft,
            'left',getActiveButtonStats(game,'left',1,2,buffList));

        activeButton(game,activeButtonRight,
            'right',getActiveButtonStats(game,'right',1,2,buffList));

        activeButton(game,activeButtonCharacter,
            'character',getActiveButtonStats(game,'character',1,1,buffList));
    }

    game.moneyAmount.setData('amount',parseInt(game.saveGame.getItem('money')));
    game.moneyAmount.setText(parseInt(game.saveGame.getItem('money')));
    game.expAmount.setData('amount',parseInt(game.saveGame.getItem('exp')));
    game.expAmount.setText(parseInt(game.saveGame.getItem('exp')));
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
        game.saveGame.setItem('stage', currentStage);

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
                buffIsActive: buttons.buff.isActive,
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
                buffIsActive: buttons.buff.isActive,
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
                buffIsActive: buttons.buff.isActive,
            }
        }
        game.saveGame.setItem('activeCharacter', JSON.stringify(activeCharacter));

        if (game.currentBuffCharacter){
            let buffElapsed = -1;
            if (game.currentBuffCharacter.buffDuration){
                buffElapsed = game.currentBuffCharacter.buffDuration.elapsed
            }
            game.saveGame.setItem('currentBuffCharacter',JSON.stringify({
                numberOfTurns: game.currentBuffCharacter.numberOfTurns,
                buffDuration: buffElapsed,
            }));
        }
        if (game.currentBuffLeft){
            let buffElapsed = -1;
            if (game.currentBuffLeft.buffDuration){
                buffElapsed = game.currentBuffLeft.buffDuration.elapsed
            }
            game.saveGame.setItem('currentBuffLeft',JSON.stringify({
                numberOfTurns: game.currentBuffLeft.numberOfTurns,
                buffDuration: buffElapsed,
            }));
        }
        if (game.currentBuffRight){
            let buffElapsed = -1;
            if (game.currentBuffRight.buffDuration){
                buffElapsed = game.currentBuffRight.buffDuration.elapsed
            }
            game.saveGame.setItem('currentBuffRight',JSON.stringify({
                numberOfTurns: game.currentBuffRight.numberOfTurns,
                buffDuration: buffElapsed,
            }));
        }

    }

    this.load = function(game){
        let loadGame = game.saveGame;
        game.buyMenuMoney.setText(parseInt(loadGame.getItem('money')));
        moneyAmount.setText(parseInt(loadGame.getItem('money')));
        expAmount.setText(parseInt(loadGame.getItem('exp')));
        let buttonSelected = JSON.parse(loadGame.getItem('buttonSelected'));
        game.buttonLeftSelected = buttonSelected.buttonLeftSelected;
        game.buttonRightSelected = buttonSelected.buttonRightSelected;
        game.buttonCharacterSelected = buttonSelected.buttonCharacterSelected;
        currentStage = parseInt(loadGame.getItem('stage'));

        if (currentStage >= 2){
            game.bg.setFrame(1);
            crib.destroy();
            bed.visible = true;
        }
        if (currentStage >= 3){
            player.setPosition(400-32,300-96);
        }
        console.log(currentStage);
        player.anims.play(characterIdle[currentStage],true);

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
            getActiveButtonStats(game,'left',button.stage,button.number,buffList,buttonElapseTime));
        let buttonData = game.activeButtonLeft[x].data.values;
        buttonData.timeEvent.paused = button.pause;
        buttonData.pause = button.pause;
        buttonData.unlocked = button.unlocked;
        if (button.buffIsActive){
            buttonData.buff.active();
            game.currentBuffLeft = buttonData.buff;
            let buttonBuff = JSON.parse(game.saveGame.getItem('currentBuffLeft'));
            game.currentBuffLeft.numberOfTurns = buttonBuff.numberOfTurns;
            if (game.currentBuffLeft.buffDuration){
                game.currentBuffLeft.buffDuration.elapsed = buttonBuff.buffDuration;
            }
        }
        if (button.unlocked){
            game.activeButtonLeft[x].setFrame(1);
        }
    }

    else if (position == 'right'){
        activeButton(game,game.activeButtonRight,'right',
            getActiveButtonStats(game,'right',button.stage,button.number,buffList,buttonElapseTime));
        let buttonData = game.activeButtonRight[x].data.values;
        buttonData.timeEvent.paused = button.pause;
        buttonData.pause = button.pause;
        buttonData.unlocked = button.unlocked;
        if (button.buffIsActive){
            buttonData.buff.active();
            game.currentBuffRight = buttonData.buff;
            let buttonBuff = JSON.parse(game.saveGame.getItem('currentBuffRight'));
            game.currentBuffRight.numberOfTurns = buttonBuff.numberOfTurns;
            if (game.currentBuffRight.buffDuration){
                game.currentBuffRight.buffDuration.elapsed = buttonBuff.buffDuration;
            }
        }
        if (button.unlocked){
            game.activeButtonRight[x].setFrame(1);
        }
    }

    else if (position == 'character'){
        activeButton(game,game.activeButtonCharacter,'character',
            getActiveButtonStats(game,'character',button.stage,button.number,buffList,buttonElapseTime));
        let buttonData = game.activeButtonCharacter[x].data.values;
        buttonData.timeEvent.paused = button.pause;
        buttonData.pause = button.pause;
        buttonData.unlocked = button.unlocked;
        buttonData.pausedMidway = button.pausedMidway;
        if (button.buffIsActive){
            buttonData.buff.active();
            game.currentBuffCharacter = buttonData.buff;
            let buttonBuff = JSON.parse(game.saveGame.getItem('currentBuffCharacter'));
            game.currentBuffCharacter.numberOfTurns = buttonBuff.numberOfTurns;
            if (game.currentBuffCharacter.buffDuration){
                game.currentBuffCharacter.buffDuration.elapsed = buttonBuff.buffDuration;
            }
        }
        if (button.unlocked){
            game.activeButtonCharacter[x].setFrame(1);
        }  
    }
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
    let button2;
    let turnsUnlocked = false;

    if (activeButtonCharacter[x-1]){
        button2 = activeButtonCharacter[x-1].data.values;
        // console.log(button.requiredExpToUnlock +'|'+ button2.requiredTurnsToUnlock +'|'+ !button.unlocked);
        if (button.requiredExpToUnlock == -1 && button2.requiredTurnsToUnlock == 0 && !button.unlocked){
            button2 = button;
            turnsUnlocked = true;
        }
        if (button.requiredExpToUnlock == -1 && button.unlocked){
            button2 = button;
        }
        // console.log(button2.description.text);
        // console.log(button.description.text);
        if (button2.requiredTurnsToUnlock){
            if (button2.requiredTurnsToUnlock == 0){
                turnsUnlocked = true;
            }
        }
        else{
            turnsUnlocked = true;
        }
    }
    else{
        turnsUnlocked = true;
    }

    // console.log((button.requiredExpToUnlock <= expAmount.data.values.amount) +'|'+ !game.allButtonCharacterUnlock +'|'+ turnsUnlocked);
    if (button.requiredExpToUnlock <= expAmount.data.values.amount && 
    !game.allButtonCharacterUnlock && turnsUnlocked){
        game.activeButtonCharacter[x].setFrame(1);
        button.unlocked = true;
        if (getActiveButtonStats(game,'character',button.stage,button.number+1,buffList) === true){
            if (button.requiredTurnsToUnlock == 0){
                game.allButtonCharacterUnlock = true;
            }
        }
        else{
            activeButton(game,activeButtonCharacter,'character',
                getActiveButtonStats(game,'character',button.stage,button.number+1,buffList));
            game.inputs.push(activeButtonCharacter[x+1]);
        }
    }
}

function checkActiveBuffs(buff){
    if (buff.numberOfTurns > 0 && buff.numberOfTurns != -1 && buff.isActive){
        buff.numberOfTurns -= 1;
    }
    if (buff.numberOfTurns == 0 && buff.numberOfTurns != -1 && buff.isActive){
        buff.deactivate();
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