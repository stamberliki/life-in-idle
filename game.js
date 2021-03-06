import {activeButton} from './activeButton.js';
import {getActiveButtonStats} from './getActiveButtonStats.js';
import {nextStageData} from './nextStageData.js';
import {buffList} from './buffList.js';
import {buyMenuItems} from './buyMenuItems.js';
import {buyMenuItemsData} from './buyMenuItemsData.js';
import {popupEvent} from './popupEvent.js';
import {workData} from './workData.js';
import {recreation} from './recreation.js'
import {ascend} from './ascend.js'
import {cutscene} from './cutscene.js'
import {achievements} from './achievements.js';
import {statistics} from './statistics.js';
import * as nineslice from './nineslice.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    backgroundColor: '#000000',
    parent: 'game',
    plugins: {
        global: [ NineSlice.Plugin.DefaultCfg ],
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var game = new Phaser.Game(config);
var scale = 2;
var nextStageWasLocked = false;
var characterIdle = ['baby_idle','baby2_idle','toddler_idle',
                    'earlyChild_idle','childhood_idle','teenager1_idle',
                    'teenager2_idle','adulthood_idle'];
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
    let _game = game.scene.scenes[0];
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

    for (let x = 0 ; x != _game.currentBuffCharacter.length ; x++){
        if (_game.currentBuffCharacter.buffDuration){
            if (_game.currentBuffCharacter.buffDuration.delay > _game.currentBuffCharacter.buffDuration.elapsed+elapseTime){
                _game.currentBuffCharacter.buffDuration.elapsed += elapseTime;
            }
            else{
                _game.currentBuffCharacter.deactivate();
            }
        }
    }
    
    for (let x = 0 ; x != _game.currentBuffLeft.length ; x++){
        if (_game.currentBuffLeft.buffDuration){
            if (_game.currentBuffLeft.buffDuration.delay > _game.currentBuffLeft.buffDuration.elapsed+elapseTime){
                _game.currentBuffLeft.buffDuration.elapsed += elapseTime;
            }
            else{
                _game.currentBuffLeft.deactivate();
            }
        }
    }
    
    for (let x = 0 ; x != _game.currentBuffRight.length ; x++){
        if (_game.currentBuffRight.buffDuration){
            if (_game.currentBuffRight.buffDuration.delay > _game.currentBuffRight.buffDuration.elapsed+elapseTime){
                _game.currentBuffRight.buffDuration.elapsed += elapseTime;
            }
            else{
                _game.currentBuffRight.deactivate();
            }
        }
    }

    if (expAmount.data.values.amount >= 600+((600*.25)*(game.tier-1)) && _game.currentStageCounter == 0){
        _game.currentStageCounter = 1;
    }
    if (expAmount.data.values.amount >= 4500+((4500*.25)*(game.tier-1)) && _game.currentStage == 4){
        _game.currentStageCounter = 2;
    }
    _game.player.anims.play(characterIdle[_game.currentStage+_game.currentStageCounter],true);
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
    this.load.spritesheet('button','assets/ui/button.png',{ frameWidth: 96, frameHeight: 15 });
    this.load.spritesheet('button32','assets/ui/button32.png',{ frameWidth: 32, frameHeight: 14 });
    this.load.spritesheet('activeButton','assets/ui/active_button.png',{ frameWidth: 64, frameHeight: 18 });
    this.load.spritesheet('activeButtonHoldAnim','assets/ui/active_button_hold_anim.png',{ frameWidth: 64, frameHeight: 20 });
    this.load.spritesheet('lockedButton','assets/ui/locked_button.png',{ frameWidth: 96, frameHeight: 20 });
    this.load.spritesheet('buyMenuIcons','assets/props/icons/buy_menu_icons.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('crib','assets/props/crib.png',{ frameWidth: 96, frameHeight: 64 });
    this.load.spritesheet('bed','assets/props/small_bed.png',{ frameWidth: 96, frameHeight: 128 });
    this.load.spritesheet('desk','assets/props/desk.png',{ frameWidth: 96, frameHeight: 64 });
    this.load.spritesheet('computer','assets/props/computer.png',{ frameWidth: 96, frameHeight: 80 });
    this.load.spritesheet('bedsideTable','assets/props/bedside_table.png',{ frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('home','assets/props/background_home.png',{ frameWidth: 400, frameHeight: 300 });
    this.load.spritesheet('props','assets/ui/props.png',{ frameWidth: 64, frameHeight: 16 });
    this.load.spritesheet('buyIcon','assets/ui/buy_icon.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('saveIcon','assets/ui/save_button.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('achievementsButton','assets/ui/achievements_button.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('closeButton','assets/ui/close_button.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('buffIcons','assets/ui/buff_icons.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('buyMenuButtons','assets/ui/buy_menu_props.png',{ frameWidth: 48, frameHeight: 16 });
    this.load.spritesheet('buyMenuItems','assets/ui/buy_menu_items.png',{ frameWidth: 64, frameHeight: 80 });
    this.load.spritesheet('buyMenuCategories','assets/ui/buy_menu_categories.png',{ frameWidth: 72, frameHeight: 16 });
    this.load.spritesheet('loading','assets/ui/loading.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('achievementIcons','assets/ui/achievement_icons.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('fatherPortraitHair','assets/characters/father portraits/hair.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('motherPortraitHair','assets/characters/mother portraits/hair.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('eyes','assets/characters/a_el/A_el eyes.png',{ frameWidth: 153, frameHeight: 58 });
    this.load.spritesheet('eyes2','assets/characters/a_el/A_el eyes2.png',{ frameWidth: 153, frameHeight: 58 });
    this.load.image('a_el','assets/characters/a_el/A_el.png');
    this.load.image('uiBg','assets/ui/UI.png');
    this.load.image('buyMenuBg','assets/ui/buy_menu.png');
    this.load.image('achievementsBg','assets/ui/achievements_menu.png');
    this.load.image('popupEvent','assets/ui/popup_event.png');
    this.load.image('descriptionPopup','assets/ui/description_popup.png');
    this.load.image('popupEventCategories','assets/ui/popup_event_categories.png');
    this.load.image('dialog','assets/ui/dialog.png');
    this.load.image('fatherPortraitBase','assets/characters/father portraits/base.png');
    this.load.image('motherPortraitBase','assets/characters/mother portraits/base.png');
    this.load.bitmapFont('mainFont', 'assets/ui/font.png','assets/ui/font.fnt');
    this.load.bitmapFont('mainFont2', 'assets/ui/font2.png','assets/ui/font2.fnt');
    this.load.bitmapFont('mainFont3', 'assets/ui/font3.png','assets/ui/font3.fnt');
    this.load.bitmapFont('mainFont8', 'assets/ui/font8.png','assets/ui/font8.fnt');

    this.player;
    this.nextStage;
    this.bg;
    this.currentStageCounter=0;
    this.buyMenuObj;
    this.buyMenu;
    this.buyMenuMoney;
    this.buyMenuBg;
    this.fakeBuyMenuBg;
    this.close;
    this.saveGame;
    this.saveManager;
    this.saveButton;
    this.gainMoney;
    this.expGain;
    this.moneyAmount;
    this.expAmount;
    this.moneyMultiplier = 1;
    this.expMultiplier = 1;
    this.speedMultiplier = 0;
    this.isCareSelected = false;
    this.nextStageLocked = true;
    this.buyMenuCamera;
    this.buyMenuCategorySelect;
    this.checkItemEquip = checkItemEquip;
    this.renderBuyMenuItem = renderBuyMenuItem;
    this.repositionBuffs = repositionBuffs;
    this.loadFirstButtons = loadFirstButtons;
    this.clearBuffs = clearBuffs;
    this.applySpeedMultiplier = applySpeedMultiplier;
    this.clearAllButtons = clearAllButtons;
    this.currentStage;
    this.enableButtonsEvent;
    this.disableButtonsEvent;
    this.popupEvent = popupEvent;
    this.buyMenuItemsCount = this.buyMenuItemsCount + 1 || 0;
    this.motherPortrait;
    this.fatherPortrait;
    this.degree;
    this.schoolFinished;
    this.workManager;
    this.recreationManager;
    this.buffManager;
    this.tier;
    this.ascend;
    this.cutscene;
    this.graphics;
    this.achievements;
    this.statistics;
    this.kongregate;

    this.buttonLeftSelected = false;
    this.buttonRightSelected = false;
    this.buttonCharacterSelected = false;
    this.allButtonCharacterUnlock = false;
    this.activeButtonNonCharacterCount = [2,1,1,1,2];

    this.currentBuffCharacter = [];
    this.currentBuffLeft = [];
    this.currentBuffRight = [];

    this.activeButtonLeft = activeButtonLeft;
    this.activeButtonRight = activeButtonRight;
    this.activeButtonCharacter = activeButtonCharacter;
    this.buyMenuCategories = [];

    this.inputs = [];
    this.test;
}

function create (){
    var _this = this;
    this.game.events.on('hidden',onPause);
    this.game.events.on('visible',onResume);
    this.gainMoney = gainGold;
    this.expGain = expGain;
    this.enableButtonsEvent = enableActiveButtonEvent;
    this.disableButtonsEvent = disableActiveButtonEvent;
    this.popupEvent = popupEvent;
    this.isCareSelected = false;
    this.workManager = workData;
    this.recreationManager = recreation;
    this.buffManager = buffList;
    this.ascend = new ascend(this);
    this.cutscene = new cutscene(this);
    this.statistics = new statistics(this);
    createIdleAnim(this);

    this.anims.create({
        key: 'activeButtonStop',
        frames: this.anims.generateFrameNumbers('activeButton', { start: 1, end: 2 }),
        frameRate: 2,
        repeat: -1
    });

    this.bg = this.add.image(400,300,'home',0);
    this.bg.setData('tierCounter', 0);
    this.bg.setScale(scale);

    this.player = this.add.sprite(400,290,'baby').setOrigin(0.5);
    this.player.setScale(scale);
    this.player.anims.play('baby_idle',true);
    this.player.depth = 1;

    this.nextStage = this.add.image(400,600-(16*scale),'button',0);
    this.nextStage.setData('text', this.add.bitmapText(400,600-(19*scale),'mainFont','Next Stage').setOrigin(0.5));
    this.nextStage.setScale(scale);
    this.nextStage.setInteractive();
    this.nextStage.data.values.descriptionPopup = new function(){
        this.popupBG = _this.add.nineslice(0,0,16,16,'descriptionPopup',4);
        this.isPointed = false;
        this.popupText = _this.add.bitmapText(0,0,'mainFont2','');
        this.popupBG.setScale(2);
        this.required = {
                1: ['', '\n1 Small Bed', '\n5 Walks'],
                2: ['', '\n1 Bedside Table', '\n1 Desk', '\n5 Runs'],
                3: ['', ],
                4: ['', '\n1 Medium Bed'],
                5: ['', '\n1 Queen-Size Bed'],
            };
        
        this.show = function(){
            this.popupBG.setVisible(true);
            this.popupText.setVisible(true);
            this.isPointed = true;
        }

        this.hide = function(){
            this.popupBG.setVisible(false);
            this.popupText.setVisible(false);
            this.isPointed = false;
        }

        this.destroy = function(){
            this.popupBG.destroy();
            this.popupText.destroy();
        }

        this.resize = function(){
            this.popupBG.resize((this.popupText.getTextBounds().local.width/2)+8,(this.popupText.getTextBounds().local.height/2)+8);
        }

        this.reinitialize = function(){
            if (_this.currentStage == 0){
                if (_this.expAmount.data.values.amount >= 400+((400*.25)*(_this.tier-1))){
                    this.required['1'][0] = '';
                }
                else {
                    this.required['1'][0] = '\nExp: '+(400+((400*.25)*(_this.tier-1)));
                }
            }
            else if (_this.currentStage == 1){
                if (_this.expAmount.data.values.amount >= 750+((750*.25)*(_this.tier-1))){
                    this.required['2'][0] = '';
                }
                else {
                    this.required['2'][0] = '\nExp: '+(750+((750*.25)*(_this.tier-1)));
                }
            }
            else if (_this.currentStage == 2){
                if (_this.expAmount.data.values.amount >= 1500+((1500*.25)*(_this.tier-1))){
                    this.required['3'][0] = '';
                }
                else {
                    this.required['3'][0] = '\nExp: '+(1500+((1500*.25)*(_this.tier-1)));
                }
            }
            else if (_this.currentStage == 3){
                if (_this.expAmount.data.values.amount >= 2750+((2750*.25)*(_this.tier-1))){
                    this.required['4'][0] = '';
                }
                else {
                    this.required['4'][0] = '\nExp: '+(2750+((2750*.25)*(_this.tier-1)));
                }
            }
            else if (_this.currentStage == 4){
                if (_this.expAmount.data.values.amount >= 4500+((4500*.25)*(_this.tier-1))){
                    this.required['5'][0] = '';
                }
                else {
                    this.required['5'][0] = '\nExp: '+(4500+((4500*.25)*(_this.tier-1)));
                }
            }
            if (typeof _this.currentStage !== 'undefined' && _this.currentStage < 5){
                this.popupText.text = 'Required:'+this.required[(_this.currentStage+1).toString()].join('');
            }
            this.resize();
        }
        this.reinitialize();

        _this.input.on('gameobjectmove',function(pointer,gameObject){
            if (gameObject === _this.nextStage){
                if (this.isPointed){
                    this.popupBG.x = pointer.x+8;
                    this.popupBG.y = pointer.y+8;
                    this.popupText.x = pointer.x+16;
                    this.popupText.y = pointer.y;
                    this.popupBG.setOrigin(0,1);
                    this.popupText.setOrigin(0,1);
                }
            }
        }, this);
    };
    this.nextStage.data.values.popupEvent = new this.popupEvent(this).createTwoChoiceEvent('Are you sure you want to ascend?\nEverything will be reset',{
        text: 'Yes',
        event: function(){
            _this.ascend.run();
        }
    },{
        text: 'No',
        event: function(){},
    },);
    if (this.nextStageLocked){
        this.nextStage.setTexture('lockedButton',0);
    }
    this.nextStage.on('pointerover', function(){
        if (!this.nextStageLocked){
            this.nextStage.setFrame(1);
            if ( this.currentStage >= 5 ){
                this.nextStage.setFrame(4);
            }
        }
        else{
            this.nextStage.data.values.descriptionPopup.show();
        }
    }, this);
    this.nextStage.on('pointerout', function(){
        if (!this.nextStageLocked){
            this.nextStage.setFrame(0);
            if ( this.currentStage >= 5 ){
                this.nextStage.setFrame(3);
            }
        }
        this.nextStage.data.values.descriptionPopup.hide();
    }, this);
    this.nextStage.on('pointerdown', function(){
        if (!this.nextStageLocked){
            this.nextStage.setFrame(2);
            if ( this.currentStage >= 5 ){
                this.nextStage.setFrame(5);
            }
        }
    }, this);
    this.nextStage.on('pointerup', function(){
        if (!this.nextStageLocked){
            if (this.currentStage < 5){
                this.nextStage.setFrame(1);
            }
            if (this.currentStage < 6){
                this.currentStage++;
            }
            if (this.currentStage == 5){
                this.nextStage.data.values.text.setText('TRIAL');
                this.nextStage.setFrame(3);
            }

            if ( this.currentStage >= 6){
                this.nextStage.data.values.popupEvent.show();
            }
            else {
                this.player.anims.play(characterIdle[this.currentStage+this.currentStageCounter],true);
                
                this.isCareSelected = false;
                if (this.currentStage+this.currentStageCounter == 2){
                    this.bg.data.values.tierCounter = 1;
                    this.bg.setFrame((this.tier-1)+this.bg.data.values.tierCounter);
                    this.player.setPosition(400,416);
                }
                if (this.currentStage+this.currentStageCounter == 3){
                    this.player.setPosition(400,384);
                }
                if (this.currentStage+this.currentStageCounter >= 3){
                    this.isCareSelected = true;
                }

                //get work data
                let leftButton = {}, rightButton = {}, characterButton = {};
                if (this.currentStage-1 <= 1){
                    leftButton['gain'] = activeButtonLeft[1].data.values.gain+(activeButtonLeft[1].data.values.cycleCount*.15);
                    leftButton['totalCycle'] = activeButtonLeft[1].data.values.totalCycle+activeButtonLeft[1].data.values.cycleCount;
                    leftButton['workData'] = activeButtonLeft[1].data.values.work.getData();
                    leftButton['elapseTime'] = activeButtonLeft[1].data.values.timeEvent.elapsed;
                    leftButton['paused'] = activeButtonLeft[1].data.values.timeEvent.paused;
                    leftButton['elapseTimeCare'] = activeButtonLeft[0].data.values.timeEvent.elapsed;
                    leftButton['pausedCare'] = activeButtonLeft[0].data.values.timeEvent.paused;

                    rightButton['gain'] = activeButtonRight[1].data.values.gain+(activeButtonRight[1].data.values.cycleCount*.15);
                    rightButton['totalCycle'] = activeButtonRight[1].data.values.totalCycle+activeButtonRight[1].data.values.cycleCount;
                    rightButton['workData'] = activeButtonRight[1].data.values.work.getData();
                    rightButton['elapseTime'] = activeButtonRight[1].data.values.timeEvent.elapsed;
                    rightButton['paused'] = activeButtonRight[1].data.values.timeEvent.paused;
                    rightButton['elapseTimeCare'] = activeButtonRight[0].data.values.timeEvent.elapsed;
                    rightButton['pausedCare'] = activeButtonRight[0].data.values.timeEvent.paused;
                }
                else {
                    leftButton['gain'] = activeButtonLeft[0].data.values.gain+(activeButtonLeft[0].data.values.cycleCount*.15);
                    leftButton['totalCycle'] = activeButtonLeft[0].data.values.totalCycle+activeButtonLeft[0].data.values.cycleCount;
                    leftButton['workData'] = activeButtonLeft[0].data.values.work.getData();
                    leftButton['elapseTime'] = activeButtonLeft[0].data.values.timeEvent.elapsed;
                    leftButton['paused'] = activeButtonLeft[0].data.values.timeEvent.paused;

                    rightButton['gain'] = activeButtonRight[0].data.values.gain+(activeButtonRight[0].data.values.cycleCount*.15);
                    rightButton['totalCycle'] = activeButtonRight[0].data.values.totalCycle+activeButtonRight[0].data.values.cycleCount;
                    rightButton['workData'] = activeButtonRight[0].data.values.work.getData();
                    rightButton['elapseTime'] = activeButtonRight[0].data.values.timeEvent.elapsed;
                    rightButton['paused'] = activeButtonRight[0].data.values.timeEvent.paused;
                }
                if (this.currentStage == 5){
                    characterButton['workData'] = activeButtonCharacter[2].data.values.work.getData();
                    characterButton['paused'] = activeButtonCharacter[2].data.values.timeEvent.paused;
                    characterButton['elapsed'] = activeButtonCharacter[2].data.values.timeEvent.elapsed;
                }

                //remove all buttons and buffs
                clearBuffs(this.currentBuffCharacter);
                clearBuffs(this.currentBuffLeft);
                clearBuffs(this.currentBuffRight);

                for (let x = 0 ; x != activeButtonLeft.length ; x++){
                    activeButtonLeft[x].data.values.description.destroy();
                    activeButtonLeft[x].data.values.timeEvent.paused = true;
                    activeButtonLeft[x].data.values.descriptionPopup.destroy();
                    activeButtonLeft[x].destroy();
                }
                for (let x = 0 ; x != activeButtonRight.length ; x++){
                    activeButtonRight[x].data.values.description.destroy();
                    activeButtonRight[x].data.values.timeEvent.paused = true;
                    activeButtonRight[x].data.values.descriptionPopup.destroy();
                    activeButtonRight[x].destroy();
                }
                for (let x = 0 ; x != activeButtonCharacter.length ; x++){
                    activeButtonCharacter[x].data.values.description.destroy();
                    activeButtonCharacter[x].data.values.timeEvent.paused = true;
                    activeButtonCharacter[x].destroy();
                }
                activeButtonLeft.length = 0;
                activeButtonRight.length = 0;
                activeButtonCharacter.length = 0;
                this.inputs.length = 0;
                this.buttonLeftSelected = false;
                this.buttonRightSelected = false;
                this.buttonCharacterSelected = false;

                //re-add buttons
                for (let x = 0 ; x != this.activeButtonNonCharacterCount[this.currentStage-1] ; x++){
                    activeButton(this,activeButtonLeft,
                        'left',getActiveButtonStats(this,'left',this.currentStage+1,x+1,buffList));

                    activeButton(this,activeButtonRight,
                        'right',getActiveButtonStats(this,'right',this.currentStage+1,x+1,buffList));
                }
                activeButton(this,activeButtonCharacter,
                    'character',getActiveButtonStats(this,'character',this.currentStage+1,1,buffList));
                if (this.currentStage == 5){
                    activeButton(this,activeButtonCharacter,
                        'character',getActiveButtonStats(this,'character',this.currentStage+1,2,buffList));
                }
                putAllActiveButtonEvent(this);

                //recheck all items
                let buyMenuCategorySelectHolder = this.buyMenuCategorySelect;
                for (let x = 0 ; x != this.buyMenuCategories.length ; x++){
                    this.buyMenuCategorySelect = this.buyMenuCategories[x];
                    renderBuyMenuItem(this, true);
                }
                this.buyMenuCategorySelect = buyMenuCategorySelectHolder;
                if (this.currentStage == 1){
                    this.buyMenuCamera.scrollX = 416*0;
                    this.buyMenuCamera.scrollY = 600;
                    if (this.buyMenuCategorySelect){
                        this.buyMenuCategorySelect.data.values.isSelected = false;
                        this.buyMenuCategorySelect.setFrame(0);
                    }
                    this.buyMenuCategorySelect = this.buyMenuCategories[0];
                    this.buyMenuCategorySelect.setFrame(1);
                    this.buyMenuCategorySelect.data.values.isSelected = true;
                }

                //apply work cycle promotion
                if (this.currentStage <= 1){
                    activeButtonLeft[1].data.values.totalCycle = leftButton.totalCycle;
                    activeButtonLeft[1].data.values.work.jobSelection.finished = leftButton.workData.jobSelectionFinished;
                    activeButtonLeft[1].data.values.work.degree = leftButton.workData.degree;
                    activeButtonLeft[1].data.values.work.schoolFinished = leftButton.workData.schoolFinished;
                    if (leftButton.workData.jobSelectionFinished){
                        activeButtonLeft[1].data.values.work.acceptedWorkName = leftButton.workData.workName;
                        activeButtonLeft[1].data.values.work.acceptJob();
                    }
                    activeButtonLeft[1].data.values.gain = leftButton.gain;
                    activeButtonLeft[1].data.values.timeEvent.args = [activeButtonLeft[1].data.values.gain, activeButtonLeft[1]];
                    activeButtonLeft[1].data.values.timeEvent.elapsed = leftButton.elapseTime;
                    activeButtonLeft[0].data.values.timeEvent.elapsed = leftButton.elapseTimeCare;
                    if (!leftButton.paused){
                        activeButtonLeft[1].data.values.timeEvent.paused = false;
                        activeButtonLeft[1].data.values.default.pause = false;
                        activeButtonLeft[1].data.values.default.pausedMidway = false;
                        this.buttonLeftSelected = true;
                    }
                    if (!leftButton.pausedCare){
                        activeButtonLeft[0].data.values.timeEvent.paused = false;
                        activeButtonLeft[0].data.values.default.pause = false;
                        activeButtonLeft[0].data.values.default.pausedMidway = false;
                        this.isCareSelected = true;
                        this.buttonLeftSelected = true;
                    }

                    activeButtonRight[1].data.values.totalCycle = rightButton.totalCycle;
                    activeButtonRight[1].data.values.work.jobSelection.finished = rightButton.workData.jobSelectionFinished;
                    activeButtonRight[1].data.values.work.degree = rightButton.workData.degree;
                    activeButtonRight[1].data.values.work.schoolFinished = rightButton.workData.schoolFinished;
                    if (rightButton.workData.jobSelectionFinished){
                        activeButtonRight[1].data.values.work.acceptedWorkName = rightButton.workData.workName;
                        activeButtonRight[1].data.values.work.acceptJob();
                    }
                    activeButtonRight[1].data.values.gain = rightButton.gain;
                    activeButtonRight[1].data.values.timeEvent.args = [activeButtonRight[1].data.values.gain, activeButtonRight[1]];
                    activeButtonRight[1].data.values.timeEvent.elapsed = rightButton.elapseTime;
                    activeButtonRight[0].data.values.timeEvent.elapsed = rightButton.elapseTimeCare;
                    if (!rightButton.paused){
                        activeButtonRight[1].data.values.timeEvent.paused = false;
                        activeButtonRight[1].data.values.default.pause = false;
                        activeButtonRight[1].data.values.default.pausedMidway = false;
                        this.buttonRightSelected = true;
                    }
                    if (!rightButton.pausedCare){
                        activeButtonRight[0].data.values.timeEvent.paused = false;
                        activeButtonRight[0].data.values.default.pause = false;
                        activeButtonRight[0].data.values.default.pausedMidway = false;
                        this.isCareSelected = true;
                        this.buttonRightSelected = true;
                    }

                    money.setData('promotionEventPopup', 
                    new popupEvent(this).createAcknowledgeEvent('Your mother now have '+activeButtonLeft[1].data.values.gain+
                        '\ncash per cycle,'+
                        '\nwhile you father \nhave '+
                        activeButtonRight[1].data.values.gain+' cash per cycle \nas a promotion \nto their work'));
                    money.data.values.promotionEventPopup.approveButton.y += 24;
                    money.data.values.promotionEventPopup.approveButton.data.values.text.y += 24;
                }
                else {
                    activeButtonLeft[0].data.values.totalCycle = leftButton.totalCycle;
                    activeButtonLeft[0].data.values.work.jobSelection.finished = leftButton.workData.jobSelectionFinished;
                    activeButtonLeft[0].data.values.work.degree = leftButton.workData.degree;
                    activeButtonLeft[0].data.values.work.schoolFinished = leftButton.workData.schoolFinished;
                    if (leftButton.workData.jobSelectionFinished){
                        activeButtonLeft[0].data.values.work.acceptedWorkName = leftButton.workData.workName;
                        activeButtonLeft[0].data.values.work.acceptJob();
                    }
                    activeButtonLeft[0].data.values.gain = leftButton.gain;
                    activeButtonLeft[0].data.values.timeEvent.args = [activeButtonLeft[0].data.values.gain, activeButtonLeft[0]];
                    activeButtonLeft[0].data.values.timeEvent.elapsed = leftButton.elapseTime;
                    if (!leftButton.paused){
                        activeButtonLeft[0].data.values.timeEvent.paused = false;
                        activeButtonLeft[0].data.values.default.pause = false;
                        activeButtonLeft[0].data.values.default.pausedMidway = false;
                    }

                    activeButtonRight[0].data.values.totalCycle = rightButton.totalCycle;
                    activeButtonRight[0].data.values.work.jobSelection.finished = rightButton.workData.jobSelectionFinished;
                    activeButtonRight[0].data.values.work.degree = rightButton.workData.degree;
                    activeButtonRight[0].data.values.work.schoolFinished = rightButton.workData.schoolFinished;
                    if (rightButton.workData.jobSelectionFinished){
                        activeButtonRight[0].data.values.work.acceptedWorkName = rightButton.workData.workName;
                        activeButtonRight[0].data.values.work.acceptJob();
                    }
                    activeButtonRight[0].data.values.gain = rightButton.gain;
                    activeButtonRight[0].data.values.timeEvent.args = [activeButtonRight[0].data.values.gain, activeButtonRight[0]];
                    activeButtonRight[0].data.values.timeEvent.elapsed = rightButton.elapseTime;
                    if (!rightButton.paused){
                        activeButtonRight[0].data.values.timeEvent.paused = false;
                        activeButtonRight[0].data.values.default.pause = false;
                        activeButtonRight[0].data.values.default.pausedMidway = false;
                    }

                    money.setData('promotionEventPopup', 
                    new popupEvent(this).createAcknowledgeEvent('Your father now have '+activeButtonLeft[0].data.values.gain+
                        '\ncash per cycle,'+
                        '\nwhile you mother \now have '+
                        activeButtonRight[0].data.values.gain+' cash per cycle \nas a promotion \nto their work'));
                    money.data.values.promotionEventPopup.approveButton.y += 24;
                    money.data.values.promotionEventPopup.approveButton.data.values.text.y += 24;
                }
                if (this.currentStage == 5){
                    this.activeButtonCharacter[1].data.values.work.jobSelection.finished = characterButton.workData.jobSelectionFinished;
                    this.activeButtonCharacter[1].data.values.work.degree = characterButton.workData.degree;
                    this.activeButtonCharacter[1].data.values.work.schoolFinished = characterButton.workData.schoolFinished;
                    if (characterButton.workData.jobSelectionFinished){
                        this.activeButtonCharacter[1].data.values.work.acceptedWorkName = characterButton.workData.workName;
                        this.activeButtonCharacter[1].data.values.work.acceptedWorkGain = characterButton.workData.workGain;
                        this.activeButtonCharacter[1].data.values.work.acceptJob();
                    }
                    this.activeButtonCharacter[1].data.values.timeEvent.elapsed = characterButton.elapsed;
                    if (!characterButton.paused){
                        this.activeButtonCharacter[1].data.values.timeEvent.paused = false;
                        this.activeButtonCharacter[1].data.values.default.pause = false;
                        this.activeButtonCharacter[1].data.values.default.pausedMidway = false;
                    }
                }

                this.statistics.updateAll();
                this.nextStageLocked = true;
                this.nextStage.setTexture('lockedButton',0);
                this.nextStage.data.values.text.y = 600-(19*scale);
                this.nextStage.data.values.descriptionPopup.reinitialize();
                this.allButtonCharacterUnlock = false;
                checkItemEquip(this);
                applySpeedMultiplier(this);
            }
        }
    }, this);

    ui = this.add.image(0,0,'uiBg').setOrigin(0);
    ui.setScale(scale);

    buyIcon = this.add.image(640,103,'buyIcon',0).setOrigin(0);
    buyIcon.setScale(scale);
    buyIcon.setInteractive();
    buyIcon.setData('enable',true);
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

    this.saveButton = this.add.image(640, 176,'saveIcon',0).setOrigin(0);
    this.saveButton.setScale(scale);
    this.saveButton.setInteractive();
    this.saveButton.setData({
        isSaving:false,
        loading: this.add.sprite(126,536,'loading').setOrigin(0).setScale(2).setVisible(false),
        text: this.add.bitmapText(137,564,'mainFont','SAVING').setOrigin(0).setFontSize(8).setVisible(false),
    });
    this.saveButton.data.values.loading.on('animationcomplete',function(){
        this.saveButton.data.values.loading.setVisible(false);
        this.saveButton.data.values.text.setVisible(false);
            this.saveButton.data.values.isSaving = false;
    },this);
    this.saveButton.on('pointerout',function(){
        this.saveButton.setFrame(0);
    },this);
    this.saveButton.on('pointerover',function(){
        this.saveButton.setFrame(1);
    },this);
    this.saveButton.on('pointerup',function(){
        if (!this.saveButton.isSaving){
            this.saveManager.save(this);
        }
    },this);

    this.achievements = new achievements(this);

    money = this.add.image(130,103,'props',0).setOrigin(0);
    money.setScale(scale);
    money.depth = 1;
    exp = this.add.image(130,137,'props',1).setOrigin(0);
    exp.setScale(scale);
    exp.depth = 1;

    moneyAmount = this.add.bitmapText(175,111,'mainFont').setOrigin(0);
    expAmount = this.add.bitmapText(175,145,'mainFont').setOrigin(0);
    moneyAmount.depth = 1;
    expAmount.depth = 1;
    this.moneyAmount = moneyAmount;
    this.expAmount = expAmount;

    this.graphics = this.add.graphics({x:0,y:0});
    this.graphics.depth = 1;

    this.fatherPortrait = this.add.image(62,148,'fatherPortraitBase').setOrigin(0.5).setScale(2);
    this.fatherPortrait.depth = 1;
    this.fatherPortrait.setData('hair','');

    this.motherPortrait = this.add.image(742,148,'motherPortraitBase').setOrigin(0.5).setScale(2);
    this.motherPortrait.depth = 1;
    this.motherPortrait.setData('hair','');

    this.buyMenu = new buyMenu(this);
    this.buyMenu.close();

    this.saveManager = new saveManager(this);
    this.saveManager.load(this);

    kongregateAPI.loadAPI(function(){
        _this.kongregate = kongregateAPI.getAPI();
    });
}

function update(){
    this.graphics.clear();
    this.graphics.fillStyle(0x874a1b, 1);

    if (nextStageWasLocked){
        this.nextStage.setTexture('button',0);
        this.nextStage.data.values.text.y = 600-(17*scale);
        nextStageWasLocked = false;
        this.nextStageLocked = false;
        if (this.currentStage >= 5){
            this.nextStage.setFrame(3);
        }
    }
    for (var a = 0 ; a != activeButtonLeft.length ; a++){
        this.graphics.fillRect(activeButtonLeft[a].x-44, activeButtonLeft[a].y+6, 88 * activeButtonLeft[a].data.values.timeEvent.getProgress(), 4);
    }

    for (var a = 0 ; a != activeButtonRight.length ; a++){
        this.graphics.fillRect(activeButtonRight[a].x-44, activeButtonRight[a].y+6, 88 * activeButtonRight[a].data.values.timeEvent.getProgress(), 4);
    }

    for (var a = 0 ; a != activeButtonCharacter.length ; a++){
        this.graphics.fillRect(activeButtonCharacter[a].x-44, activeButtonCharacter[a].y+6, 88 * activeButtonCharacter[a].data.values.timeEvent.getProgress(), 4);
    }

    checkUnlockableActiveButton(this);

    if (this.allButtonCharacterUnlock && nextStageData(this, this.currentStage+1) && this.nextStageLocked) {
        nextStageWasLocked = true;
    }
}

function putAllActiveButtonEvent(game){
    for (var x = 0 ; x != game.activeButtonLeft.length ; x++){
        game.inputs.push(game.activeButtonLeft[x]);
    }
    for (var x = 0 ; x != game.activeButtonRight.length ; x++){
        game.inputs.push(game.activeButtonRight[x]);
    }
    for (var x = 0 ; x != game.activeButtonCharacter.length ; x++){
        game.inputs.push(game.activeButtonCharacter[x]);
    }
    game.inputs.push(buyIcon);
    game.inputs.push(game.saveButton);
    game.inputs.push(game.nextStage);
    game.inputs.push(game.achievements.button);
}

function disableActiveButtonEvent(game){
    for (var x = 0 ; x != game.inputs.length ; x++){
        game.inputs[x].disableInteractive();
        if (game.inputs[x].data){
            if (game.inputs[x].data.values.buff){   
                for (let y = 0 ; y != game.inputs[x].data.values.buff.length ; y++){
                    game.inputs[x].data.values.buff[y].icon.disableInteractive();
                }
            }
        }
    }
}

function enableActiveButtonEvent(game){
    for (var x = 0 ; x != game.inputs.length ; x++){
        if (game.inputs[x].data){
            if (game.inputs[x].data.values.retired){
                continue;
            }
        }
        game.inputs[x].setInteractive();
        if (game.inputs[x].data){
            if (game.inputs[x].data.values.buff){   
                for (let y = 0 ; y != game.inputs[x].data.values.buff.length ; y++){
                    game.inputs[x].data.values.buff[y].icon.setInteractive();
                }
            }
        }
    }
}

function clearAllButtons(game){
    clearBuffs(game.currentBuffCharacter);
    clearBuffs(game.currentBuffLeft);
    clearBuffs(game.currentBuffRight);
    for (let x = 0 ; x != activeButtonLeft.length ; x++){
        activeButtonLeft[x].data.values.description.destroy();
        activeButtonLeft[x].data.values.timeEvent.paused = true;
        activeButtonLeft[x].data.values.descriptionPopup.destroy();
        activeButtonLeft[x].destroy();
    }
    for (let x = 0 ; x != activeButtonRight.length ; x++){
        activeButtonRight[x].data.values.description.destroy();
        activeButtonRight[x].data.values.timeEvent.paused = true;
        activeButtonRight[x].data.values.descriptionPopup.destroy();
        activeButtonRight[x].destroy();
    }
    for (let x = 0 ; x != activeButtonCharacter.length ; x++){
        activeButtonCharacter[x].data.values.description.destroy();
        activeButtonCharacter[x].data.values.timeEvent.paused = true;
        activeButtonCharacter[x].destroy();
    }
    activeButtonLeft.length = 0;
    activeButtonRight.length = 0;
    activeButtonCharacter.length = 0;
    game.inputs.length = 0;
    game.buttonLeftSelected = false;
    game.buttonRightSelected = false;
    game.buttonCharacterSelected = false;
}

function loadFirstButtons(game){
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
    putAllActiveButtonEvent(game);
}

function gainGold(gain, button=''){
    moneyAmount.setText(moneyAmount.data.values.amount += Math.trunc(gain*this.moneyMultiplier));
    this.buyMenuMoney.setText(moneyAmount.data.values.amount);
    let buttonData = button.data.values;
    if (typeof buttonData.cycleCount !== 'undefined'){
        buttonData.cycleCount =  buttonData.cycleCount + 1 | 0;
    }

    updateBuffs(this, buttonData);

    if (buttonData.work){
        if (!buttonData.work.jobSelection.finished){
            buttonData.work.showJobSelection(this);
        }
        if (buttonData.position == 'character'){
            expAmount.data.values.amount += Math.trunc((gain*this.expMultiplier)*.35);
            expAmount.setText(expAmount.data.values.amount);
        }
    }

    if (buttonData.default.pause){
        buttonData.timeEvent.paused = true;
        buttonData.default.pausedMidway = false;
        button.anims.remove('activeButtonStop');
        if (!buttonData.ignoreSingleButtonOnly){
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
    else if ((!buttonData.timeEvent.loop && buttonData.timeEvent.hasDispatched) || buttonData.runOneWithLoop){
        buttonData.timeEvent.elapsed = 0;
        buttonData.timeEvent.paused = true;
        buttonData.default.pausedMidway = false;
        buttonData.default.pause = true;
        button.anims.remove('activeButtonStop');
        if (!buttonData.runOneWithLoop){
            button.setFrame(3);
        }
        if (!buttonData.ignoreSingleButtonOnly){
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
}

function expGain(gain, button=''){
    if (this.nextStage.data.values.descriptionPopup.required[this.currentStage+1][0] != ''){
        expAmount.data.values.amount += Math.trunc(gain*this.expMultiplier);
        expAmount.setText(expAmount.data.values.amount);   
    }
    let buttonData = button.data.values;

    if (expAmount.data.values.amount >= (600+((600*.25)*(this.tier-1)))/2 && this.currentStageCounter == 0){
        this.currentStageCounter = 1;
        this.player.anims.play(characterIdle[this.currentStage+this.currentStageCounter],true);
    }
    if (expAmount.data.values.amount >= (4500+((4500*.25)*(this.tier-1)))/2 && this.currentStage == 4){
        this.currentStageCounter += 1;
        this.player.anims.play(characterIdle[this.currentStage+this.currentStageCounter],true);
    }
    if (this.currentStage == 4){
        this.statistics.updateDegree();
    }
    if (buttonData.requiredTurnsToUnlock){
        if (buttonData.requiredTurnsToUnlock > 0){
            buttonData.requiredTurnsToUnlock -= 1;
        }
    }

    this.nextStage.data.values.descriptionPopup.reinitialize();

    updateBuffs(this, buttonData);

    if (buttonData.default.pause){
        buttonData.timeEvent.paused = true;
        buttonData.default.pausedMidway = false;
        button.anims.remove('activeButtonStop');
        if (!buttonData.ignoreSingleButtonOnly){
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
    else if ((!buttonData.timeEvent.loop && buttonData.timeEvent.hasDispatched) || buttonData.runOneWithLoop){
        buttonData.timeEvent.elapsed = 0;
        buttonData.timeEvent.paused = true;
        buttonData.default.pausedMidway = false;
        buttonData.default.pause = true;
        button.anims.remove('activeButtonStop');
        if (!buttonData.runOneWithLoop){
            button.setFrame(3);
        }
        if (!buttonData.ignoreSingleButtonOnly){
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
}

function createIdleAnim(game){
    game.anims.create({
        key: 'loading',
        frames: game.anims.generateFrameNumbers('loading', { start: 0, end: 22 }),
        frameRate: 30,
        repeat: 3,   
    });
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
    game.anims.create({
        key: 'activeButtonHoldAnimation',
        frames: game.anims.generateFrameNumbers('activeButtonHoldAnim', { start: 0, end: 72 }),
        frameRate: 24,
        repeat: 0
    });
}

function buyMenu(game){
    game.buyMenuBg = game.add.image(0,0,'buyMenuBg').setOrigin(0);
    game.buyMenuBg.setScale(scale);
    game.buyMenuBg.depth = 2;

    game.buyMenuMoney = game.add.bitmapText(642,88,'mainFont').setOrigin(0);
    game.buyMenuMoney.depth = 2;

    game.buyMenuCamera = game.cameras.add(252, 162,416,438).setOrigin(0);
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

    createBuyMenuCategory(game, 'BEDSIDE TABLE', 1, -1); //0
    createBuyMenuCategory(game, 'COMPUTERS', 3, -1,false, true, 3); //1
    createBuyMenuCategory(game, 'CRIB', 0, 1, true); //2
    createBuyMenuCategory(game, 'DESK', 1, -1, false, false); //3
    createBuyMenuCategory(game, 'GADGETS', 3, -1, false, true, 0); //4
    createBuyMenuCategory(game, 'MEDIUM BED', 3, 5); //5
    createBuyMenuCategory(game, 'QUEEN-SIZE BED', 4, -1); //6
    createBuyMenuCategory(game, 'SCHOOL SUPPLIES', 2, -1, false, true, 3); //7
    createBuyMenuCategory(game, 'SMALL BED', 0, 4); //8
    createBuyMenuCategory(game, 'TOYS', 1, 4); //9
    
    buyMenuItems(game,game.buyMenuCategories,buyMenuItemsData);

    game.input.on('gameobjectmove',function(pointer,gameObject){
        if(game.fakeBuyMenuBg.data.values.isClicked){
            game.buyMenuCamera.scrollY = game.fakeBuyMenuBg.data.values.scrollY-(pointer.y - game.fakeBuyMenuBg.data.values.pointerY);
            if (game.buyMenuCamera.scrollY >= 792){
                game.buyMenuCamera.scrollY = 792;
            }
            else if (game.buyMenuCamera.scrollY <= 600 || 792 >= (600+(Math.trunc(game.buyMenuCategorySelect.data.values.itemList.length/3)*192))){
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

function createBuyMenuCategory(game, name, stageAvailable, stageMax, selected = false, needPrimaryItem=false, primaryItemPointer = ''){
    let button = game.add.image(66,130+(32*(game.buyMenuCategories.length+1)),'buyMenuCategories',0).setOrigin(0);
    button.setInteractive();
    button.setData({
        isSelected: selected,
        stageAvailable: stageAvailable,
        stageMax: stageMax,
        number: game.buyMenuCategories.length,
        name: name,
        text: game.add.bitmapText(74,146+(32*(game.buyMenuCategories.length+1)), 'mainFont', name).setFontSize(16).setOrigin(0,.5),
        itemSelect: '',
        itemList: [],
        itemRender: '',
        needPrimaryItem: needPrimaryItem,
        primaryItemPointer: primaryItemPointer,
    });
    if (button.data.values.text.width > 125){
        button.data.values.text.setFontSize(8).setOrigin(0,.5);
    }
    button.setScale(2);
    button.depth = 2;
    button.data.values.text.depth = 2;
    if (selected){
        button.setFrame(1);
        game.buyMenuCategorySelect = button;
        game.buyMenuCamera.scrollX = 416*button.data.values.number;
    }
    button.on('pointerout',function() {
        if (!button.data.values.isSelected){
            button.setFrame(0);
        }
    });
    button.on('pointerover',function() {
        if (!button.data.values.isSelected && button.data.values.stageAvailable <= game.currentStage && (game.currentStage < button.data.values.stageMax || button.data.values.stageMax == -1)){
            button.setFrame(2);
        }
    });
    button.on('pointerup',function(){
        if (!button.data.values.isSelected && button.data.values.stageAvailable <= game.currentStage && (game.currentStage < button.data.values.stageMax || button.data.values.stageMax == -1)){
            game.buyMenuCamera.scrollX = 416*button.data.values.number;
            game.buyMenuCamera.scrollY = 600;
            if (game.buyMenuCategorySelect){
                game.buyMenuCategorySelect.data.values.isSelected = false;
                game.buyMenuCategorySelect.setFrame(0);
            }
            game.buyMenuCategorySelect = button;
            game.buyMenuCategorySelect.setFrame(1);
            game.buyMenuCategorySelect.data.values.isSelected = true;

        }
    });
    game.buyMenuCategories.push(button);
}

function renderBuyMenuItem(game, ignoreAddMultiplier){
    if(game.buyMenuCategorySelect.data.values.itemSelect){
        let data = game.buyMenuCategorySelect.data.values.itemSelect.data.values;
        //bst
        if (data.position-1 == 0){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                if (game.currentStage == 1){
                    game.nextStage.data.values.descriptionPopup.required['2'][1] = '';
                }
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(400,256,'bedsideTable',data.itemNumber).setOrigin(0.5).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
        }
        //cmp
        if (data.position-1 == 1){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(176,156,'computer',data.itemNumber).setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
            game.buyMenuCategorySelect.data.values.itemRender.depth = 1;
        }
        //crb
        if (data.position-1 == 2){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(400,310,'crib',data.itemNumber).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
            if (game.currentStage+game.currentStageCounter <= 1){
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(true);
            }
            else {
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(false);
            }
        }
        //dsk
        if (data.position-1 == 3){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                if (game.currentStage == 1){
                    game.nextStage.data.values.descriptionPopup.required['2'][2] = '';
                }
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(176,194,'desk',data.itemNumber).setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
        }
        //gts
        if (data.position-1 == 4){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(400,248,'buyMenuIcons',data.iconItemNumber).setOrigin(0.5).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.iconItemNumber);
        }
        //MB
        if (data.position-1 == 5){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                if (game.currentStage == 3){
                    game.nextStage.data.values.descriptionPopup.required['4'][1] = '';
                }
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(432,192,'bed').setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber+9);
            if (game.currentStage+game.currentStageCounter >= 5 && game.currentStage+game.currentStageCounter < 7){
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(true);
            }
            else {
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(false);
            }
        }  
        //qsb
        if (data.position-1 == 6){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                if (game.currentStage == 4){
                    game.nextStage.data.values.descriptionPopup.required['5'][1] = '';
                }
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(432,192,'bed').setOrigin(0).setVisible(false).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber+18);
            if (game.currentStage+game.currentStageCounter >= 7){
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(true);
            }
            else {
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(false);
            }
        }
        //scsu
        if (data.position-1 == 7){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(242,200,'buyMenuIcons',data.iconItemNumber).setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.iconItemNumber);
            if (game.currentStage <= 2){
                game.buyMenuCategorySelect.data.values.itemRender.x = 242;
            }
            else if (game.currentStage >= 3){
                game.buyMenuCategorySelect.data.values.itemRender.x = 292;
            }
        } 
        //sbed
        if (data.position-1 == 8){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                if (game.currentStage == 0){
                    game.nextStage.data.values.descriptionPopup.required['1'][1] = '';
                }
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(432,192, 'bed').setScale(2).setVisible(false).setOrigin(0);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
            if (game.currentStage+game.currentStageCounter >= 2 && game.currentStage+game.currentStageCounter < 5){
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(true);
            }
            else if (game.currentStage+game.currentStageCounter >= 5){
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(false);
            }
        } 
        //toys
        if (data.position-1 == 9){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(240,448,'buyMenuIcons',data.iconItemNumber).setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.iconItemNumber);
        }
        if (!ignoreAddMultiplier){
            addSpeedMultiplier(game);
        }
        game.nextStage.data.values.descriptionPopup.reinitialize();
    }
}

function saveManager(game){
    game.saveGame = window.localStorage;
    game.time.addEvent({
            delay:300000, loop:true, callback: save,
            callbackScope: this, args:[game],
        });
    // game.saveGame.clear();
    game.moneyAmount.setData('amount',parseInt(game.saveGame.getItem('money')));
    game.expAmount.setData('amount',parseInt(game.saveGame.getItem('exp')));
    if (!game.saveGame.getItem('wasSaved')){
        game.currentStage = 0;
        game.saveGame.setItem('stage', game.currentStage);
        game.saveGame.setItem('money',0);
        game.saveGame.setItem('exp',0);
        game.moneyAmount.setData('amount',parseInt(game.saveGame.getItem('money')));
        game.moneyAmount.setText(parseInt(game.saveGame.getItem('money')));
        game.buyMenuMoney.setText(parseInt(game.saveGame.getItem('money')));
        game.expAmount.setData('amount',parseInt(game.saveGame.getItem('exp')));
        game.expAmount.setText(parseInt(game.saveGame.getItem('exp')));
        game.saveGame.setItem('stage', 0);
        game.saveGame.setItem('stageCounter', 0);
        game.saveGame.setItem('isCareSelected',game.isCareSelected);
        game.saveGame.setItem('expMultiplier', game.expMultiplier);
        game.saveGame.setItem('moneyMultiplier', game.moneyMultiplier);
        game.saveGame.setItem('speedMultiplier', game.speedMultiplier);
        game.saveGame.setItem('tier', 1);
        game.saveGame.setItem('tierCounter', 0);
        game.saveGame.setItem('degree', '');
        game.saveGame.setItem('schoolFinished', '');
        game.tier = 1;
        game.saveGame.setItem('motherHairFrame', Phaser.Math.Between(0,2));
        game.saveGame.setItem('fatherHairFrame', Phaser.Math.Between(0,4));
        game.fatherPortrait.hair = game.add.image(62,148,'fatherPortraitHair', game.saveGame.getItem('fatherHairFrame')).setOrigin(0.5).setScale(2);
        game.fatherPortrait.hair.depth = 1;
        game.motherPortrait.hair = game.add.image(742,148,'motherPortraitHair', game.saveGame.getItem('motherHairFrame')).setOrigin(0.5).setScale(2);
        game.fatherPortrait.hair.depth = 1;
        
        let defaultBuyItemData = game.buyMenuCategories[2].data.values.itemList[0].data.values;
        defaultBuyItemData.buyButton.setFrame(2);
        defaultBuyItemData.isBrought = true;
        defaultBuyItemData.canBeBrought = true;
        defaultBuyItemData.isUsed = true;
        defaultBuyItemData.buyButtonText.setText('USED');
        defaultBuyItemData.descriptionPopup.popupText.setText(defaultBuyItemData.desc);
        defaultBuyItemData.descriptionPopup.popupBG.resize((defaultBuyItemData.descriptionPopup.popupText.getTextBounds().local.width/2)+8, (defaultBuyItemData.descriptionPopup.popupText.getTextBounds().local.height/2)+8);
        game.buyMenuCategorySelect = game.buyMenuCategories[2];
        game.buyMenuCategorySelect.data.values.itemSelect = game.buyMenuCategories[2].data.values.itemList[0];
        renderBuyMenuItem(game);
        game.buyMenuCategorySelect = game.buyMenuCategories[2];

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

        let buttonData = game.activeButtonLeft[1].data.values;
        buttonData.work.generateJob(game);
        buttonData.work.acceptJob();
        buttonData.gain = 10;
        buttonData.timeEvent.args[0] = 10;

        buttonData = game.activeButtonRight[1].data.values;
        buttonData.work.generateJob(game);
        buttonData.work.acceptJob();
        buttonData.gain = 10;
        buttonData.timeEvent.args[0] = 10;
        putAllActiveButtonEvent(game);

        game.cutscene.textList = game.cutscene.textListFirstTime;
        game.cutscene.setTextIndexQueue(game.cutscene.getTextListFirstTimeQueueList());
        game.cutscene.showFadeIn();
    }

    this.save = function(game){
        game.saveButton.data.values.isSaving = true;
        game.saveButton.data.values.text.setVisible(true);
        game.saveButton.data.values.loading.setVisible(true);
        game.saveButton.data.values.loading.anims.play('loading',true);

        game.saveGame.setItem('wasSaved',true);
        game.saveGame.setItem('money',moneyAmount.data.values.amount);
        game.saveGame.setItem('exp',expAmount.data.values.amount);
        game.saveGame.setItem('time',Date.now());
        game.saveGame.setItem('stage', game.currentStage);
        game.saveGame.setItem('stageCounter', game.currentStageCounter);
        game.saveGame.setItem('isCareSelected',game.isCareSelected);
        game.saveGame.setItem('tier',game.tier);
        game.saveGame.setItem('tierCounter', game.bg.data.values.tierCounter);
        game.saveGame.setItem('expMultiplier', game.expMultiplier);
        game.saveGame.setItem('moneyMultiplier', game.moneyMultiplier);
        game.saveGame.setItem('degree', game.degree);
        game.saveGame.setItem('schoolFinished', game.schoolFinished);


        let activeLeft = {};
        let activeRight = {};
        let activeCharacter = {};
        let buffLeft = {};
        let buffRight = {};
        let buffCharacter = {};
        let achievementList = [];
        for (var x = 0 ; x != activeButtonLeft.length ; x++){
            let buttons = game.activeButtonLeft[x].data.values;
            activeLeft[x] = {
                stage: buttons.default.stage,
                number: buttons.default.number,
                pause: buttons.default.pause,
                pausedMidway: buttons.default.pausedMidway,
                elapseTime: buttons.timeEvent.getProgress(),
                delay: buttons.timeEvent.delay,
                event: buttons.event,
                unlocked: buttons.unlocked,
                gain: buttons.gain,
                hasDispatched: buttons.timeEvent.hasDispatched,
                buff: {},
                turns: buttons.requiredTurnsToUnlock,
            };
            if(typeof buttons.runOneWithLoop !== 'undefined'){
                activeLeft[x].runOneWithLoop = buttons.runOneWithLoop;
            }
            if (buttons.popupEvent){
                activeLeft[x].popupEventFinished = buttons.popupEvent.finished;
            }
            if (buttons.cycleCount || buttons.totalCycle){
                activeLeft[x].cycle = buttons.cycleCount;
                activeLeft[x].totalCycle = buttons.totalCycle;
            }
            if (buttons.work){
                activeLeft[x].workJobSelectionFinished = buttons.work.jobSelection.finished;
                activeLeft[x].workName = buttons.work.acceptedWorkName;
                activeLeft[x].workDegree = buttons.work.degree;
                activeLeft[x].workSchoolFinished = buttons.work.schoolFinished;
            }
            for (let y = 0 ; y != buttons.buff.length ; y++){
                activeLeft[x].buff[y] = {
                    isActive: buttons.buff[y].isActive,
                    numberOfTurns: buttons.buff[y].numberOfTurns,
                    buffDuration: buttons.buff[y].buffElapsed,

                }
            }
        }
        game.saveGame.setItem('activeLeft',JSON.stringify(activeLeft));

        for (var x = 0 ; x != activeButtonRight.length ; x++){
            let buttons = game.activeButtonRight[x].data.values;
            activeRight[x] = {
                stage: buttons.default.stage,
                number: buttons.default.number,
                pause: buttons.default.pause,
                pausedMidway: buttons.default.pausedMidway,
                elapseTime: buttons.timeEvent.getProgress(),
                delay: buttons.timeEvent.delay,
                event: buttons.event,
                unlocked: buttons.unlocked,
                gain: buttons.gain,
                hasDispatched: buttons.timeEvent.hasDispatched,
                buff: {},
                turns: buttons.requiredTurnsToUnlock,
            };
            if(typeof buttons.runOneWithLoop !== 'undefined'){
                activeRight[x].runOneWithLoop = buttons.runOneWithLoop;
            }
            if (buttons.popupEvent){
                activeRight[x].popupEventFinished = buttons.popupEvent.finished;
            }
            if (buttons.cycleCount || buttons.totalCycle){
                activeRight[x].cycle = buttons.cycleCount;
                activeRight[x].totalCycle = buttons.totalCycle;
            }
            if (buttons.work){
                activeRight[x].workJobSelectionFinished = buttons.work.jobSelection.finished;
                activeRight[x].workName = buttons.work.acceptedWorkName;
                activeRight[x].workDegree = buttons.work.degree;
                activeRight[x].workSchoolFinished = buttons.work.schoolFinished;
            }
            for (let y = 0 ; y != buttons.buff.length ; y++){
                activeRight[x].buff[y] = {
                    isActive: buttons.buff[y].isActive,
                    numberOfTurns: buttons.buff[y].numberOfTurns,
                    buffDuration: buttons.buff[y].buffElapsed,
                }
            }
        }
        game.saveGame.setItem('activeRight',JSON.stringify(activeRight));

        for (var x = 0 ; x != activeButtonCharacter.length ; x++){
            let buttons = game.activeButtonCharacter[x].data.values;
            activeCharacter[x] = {
                stage: buttons.default.stage,
                number: buttons.default.number,
                pause: buttons.default.pause,
                pausedMidway: buttons.default.pausedMidway,
                elapseTime: buttons.timeEvent.getProgress(),
                delay: buttons.timeEvent.delay,
                event: buttons.event,
                unlocked: buttons.unlocked,
                gain: buttons.gain,
                hasDispatched: buttons.timeEvent.hasDispatched,
                buff: {},
                turns: buttons.requiredTurnsToUnlock,
            };
            if(typeof buttons.runOneWithLoop !== 'undefined'){
                activeCharacter[x].runOneWithLoop = buttons.runOneWithLoop;
            }
            if (buttons.popupEvent){
                activeCharacter[x].popupEventFinished = buttons.popupEvent.finished;
            }
            if (buttons.work){
                activeCharacter[x].workJobSelectionFinished = buttons.work.jobSelection.finished;
                activeCharacter[x].workName = buttons.work.acceptedWorkName;
                activeCharacter[x].workDegree = buttons.work.degree;
                activeCharacter[x].workSchoolFinished = buttons.work.schoolFinished;
            }
            for (let y = 0 ; y != buttons.buff.length ; y++){
                activeCharacter[x].buff[y] = {
                    isActive: buttons.buff[y].isActive,
                    numberOfTurns: buttons.buff[y].numberOfTurns,
                    buffDuration: buttons.buff[y].buffElapsed,
                }
            }
        }
        game.saveGame.setItem('activeCharacter', JSON.stringify(activeCharacter));

        let buyItems = [];
        for (let x = 0 ; x != game.buyMenuCategories.length ; x++){
            let data = game.buyMenuCategories[x].data.values.itemList;
            for (let y = 0 ; y != data.length ; y++){
                buyItems[buyItems.length] = {
                    isBrought: data[y].data.values.isBrought,
                    canBeBrought: data[y].data.values.canBeBrought,
                    isUsed: data[y].data.values.isUsed,
                    id: data[y].data.values.id,
                }
            }
        }
        game.saveGame.setItem('buyItems', JSON.stringify(buyItems));

        for (let x = 0 ; x != game.achievements.achievementsList.length ; x++){
            if (game.achievements.achievementsList[x].data.values.unlocked){
                achievementList.push(x);
            }
        }
        game.saveGame.setItem('achievements', JSON.stringify(achievementList));
    }

    this.load = function(game){
        let loadGame = game.saveGame;
        game.buyMenuMoney.setText(parseInt(loadGame.getItem('money')));
        moneyAmount.setText(parseInt(loadGame.getItem('money')));
        expAmount.setText(parseInt(loadGame.getItem('exp')));
        moneyAmount.data.values.amount = parseInt(loadGame.getItem('money'));
        expAmount.data.values.amount = parseInt(loadGame.getItem('exp'));
        game.isCareSelected = loadGame.getItem('isCareSelected') === 'true';
        game.currentStage = parseInt(loadGame.getItem('stage'));
        game.currentStageCounter = parseInt(loadGame.getItem('stageCounter'));
        game.tier = parseInt(loadGame.getItem('tier'));
        game.bg.data.values.tierCounter = parseInt(loadGame.getItem('tierCounter'));
        game.bg.setFrame(game.tier-1 + game.bg.data.values.tierCounter);
        game.expMultiplier = parseInt(loadGame.getItem('expMultiplier'));
        game.moneyMultiplier = parseInt(loadGame.getItem('moneyMultiplier'));
        game.degree = loadGame.getItem('degree');
        game.schoolFinished = loadGame.getItem('schoolFinished');
        var accumulate = {money: 0 , exp: 0};
        game.fatherPortrait.hair = game.add.image(62,148,'fatherPortraitHair', loadGame.getItem('fatherHairFrame')).setOrigin(0.5).setScale(2);
        game.fatherPortrait.hair.depth = 1;
        game.motherPortrait.hair = game.add.image(742,148,'motherPortraitHair', loadGame.getItem('motherHairFrame')).setOrigin(0.5).setScale(2);
        game.motherPortrait.hair.depth = 1;

        for (let x in JSON.parse(loadGame.getItem('achievements'))){
            game.achievements.unlock(x);
        }

        let elapseTime = loadGame.getItem('time');
        if (elapseTime){
            elapseTime = Date.now() - elapseTime;
            if (elapseTime > 3600000){
                elapseTime = 3600000;
            }
        }

        let activeLeft = JSON.parse(loadGame.getItem('activeLeft'));
        if (activeLeft != null){
            for (let x = 0 ; x != Object.keys(activeLeft).length ; x++){
                loadActiveButton(game,'left',x,activeLeft[x],elapseTime, accumulate);
            }
        }

        let activeRight = JSON.parse(loadGame.getItem('activeRight'));
        if (activeRight != null){
            for (let x = 0 ; x != Object.keys(activeRight).length ; x++){
                loadActiveButton(game,'right',x,activeRight[x],elapseTime, accumulate);
            }
        }

        let activeCharacter = JSON.parse(loadGame.getItem('activeCharacter'));
        if (activeCharacter != null){
            for (let x = 0 ; x != Object.keys(activeCharacter).length ; x++){
                loadActiveButton(game,'character',x,activeCharacter[x],elapseTime, accumulate);
            }
        }

        let buyItems = JSON.parse(loadGame.getItem('buyItems'));
        if (buyItems != null){
            for (let x = 0 ; x != buyItems.length ; x++){
                let itemSave = buyItems[x];
                for (let a = 0 ; a != game.buyMenuCategories.length ; a++){
                    let dataCategories = game.buyMenuCategories[a].data.values.itemList;
                    game.buyMenuCategorySelect = game.buyMenuCategories[a];
                    for (let b = 0 ; b != dataCategories.length ; b++ ){
                        let dataItems = dataCategories[b].data.values;
                        if (itemSave.id == dataItems.id){
                            dataItems.isBrought = itemSave.isBrought;
                            dataItems.canBeBrought = itemSave.canBeBrought;
                            dataItems.isUsed = itemSave.isUsed;
                            if (dataItems.isBrought){
                                dataItems.buyButtonText.setText('USE');
                                dataItems.descriptionPopup.popupText.setText(dataItems.desc);
                                dataItems.descriptionPopup.popupBG.resize((dataItems.descriptionPopup.popupText.getTextBounds().local.width/2)+8, (dataItems.descriptionPopup.popupText.getTextBounds().local.height/2)+8);
                            }
                            if (dataItems.isUsed){
                                dataItems.buyButton.setFrame(2);
                                game.buyMenuCategories[a].data.values.itemSelect = dataCategories[b];
                                dataItems.buyButtonText.setText('USED');
                            }
                        }
                    }

                }
            }
            for (let x = 0 ; x != game.buyMenuCategories.length ; x++){
                game.buyMenuCategorySelect = game.buyMenuCategories[x];
                renderBuyMenuItem(game);
            }
            checkItemEquip(game);
        }
        applySpeedMultiplier(game);
        if (game.currentStage == 0){
            game.buyMenuCategorySelect = game.buyMenuCategories[2];
        }
        else {
            game.buyMenuCategorySelect = game.buyMenuCategories[2];
            game.buyMenuCategorySelect.setFrame(0);
            game.buyMenuCategorySelect.data.values.isSelected = false;
            game.buyMenuCategorySelect = game.buyMenuCategories[0];
            game.buyMenuCategorySelect.setFrame(1);
            game.buyMenuCamera.scrollX = 416*game.buyMenuCategorySelect.data.values.number;
            game.buyMenuCategorySelect.data.values.isSelected = true;
        }

        if (expAmount.data.values.amount >= 120 && game.currentStageCounter >= 0){
            game.currentStageCounter = 1;
        }
        if (expAmount.data.values.amount >= 1500 && game.currentStage >= 4){
            game.currentStageCounter += 1;
        }
        if (game.currentStage+game.currentStageCounter >= 2){
            game.player.setPosition(400,416);
        }
        if (game.currentStage+game.currentStageCounter >= 3){
            game.player.setPosition(400,384);
        }
        if (game.currentStage+1 >= 6){
            game.nextStage.data.values.text.setText('TRIAL');
            game.nextStage.setFrame(3);
            if (!game.nextStage.data.values.popupEvent){
                game.nextStage.data.values.popupEvent = new game.popupEvent(game).createTwoChoiceEvent('Are you sure you want to ascend?\nEverything will be reset',{
                    text: 'Yes',
                    event: function(){
                        game.cutscene.setTextIndexQueue([0]);
                        game.ascend.run();
                    }
                },{
                    text: 'No',
                    event: function(){},
                },
                );
            }
        }
        game.player.anims.play(characterIdle[game.currentStage+game.currentStageCounter],true);

        checkUnlockableActiveButton(game);
        putAllActiveButtonEvent(game);
        repositionBuffs(game);
        game.nextStage.data.values.descriptionPopup.reinitialize();
        game.statistics.updateAll();
        // if (game.saveGame.getItem('wasSaved')){
        //     moneyAmount.setData('offlineEvent', new popupEvent(game).createAcknowledgeEvent(
        //         'While you\'re gone,\nYou gain '+Math.trunc(accumulate.money)+' cash \nand '+ Math.trunc(accumulate.exp)+' exp'));            
        // }
    }
}

function loadActiveButton(game,position,x,Button,elapseTime, accumulateList){
    let button = Button;
    let buttonElapseTime = button.elapseTime;
    button.elapseTime = elapseTime;
    button.accumulateList = accumulateList;

    if (position == 'left'){
        activeButton(game,game.activeButtonLeft,'left',
            getActiveButtonStats(game,'left',button.stage,button.number,buffList));
        loadButton(game, game.activeButtonLeft[x], button, buttonElapseTime, 'left');
    }

    else if (position == 'right'){
        activeButton(game,game.activeButtonRight,'right',
            getActiveButtonStats(game,'right',button.stage,button.number,buffList));
        loadButton(game, game.activeButtonRight[x], button, buttonElapseTime, 'right');
    }

    else if (position == 'character'){
        activeButton(game,game.activeButtonCharacter,'character',
            getActiveButtonStats(game,'character',button.stage,button.number,buffList));
        loadButton(game, game.activeButtonCharacter[x], button, buttonElapseTime, 'character');
    }
}

function loadButton(game,activeButtonPosition,button,buttonElapseTime, position){
    let buttonData = activeButtonPosition.data.values;
    let event;
    let delay = 1*button.delay;
    if (button.event == 'gainGold'){
        event = gainGold;
    }
    else if (button.event == 'expGain'){
        event = expGain;
    }

    if (buttonData.work){
        buttonData.work.jobSelection.finished = button.workJobSelectionFinished;
        buttonData.work.degree = button.workDegree;
        buttonData.work.schoolFinished = button.workSchoolFinished;
        if (buttonData.work.jobSelection.finished){
            buttonData.work.acceptedWorkGain = button.gain;
            buttonData.work.acceptedWorkName = button.workName;
            buttonData.work.acceptJob();
        }
    }
    buttonData.default.pause = button.pause;
    buttonData.unlocked = button.unlocked;
    buttonData.default.pausedMidway = button.pausedMidway;
    buttonData.gain = button.gain;
    buttonData.timeEvent.args[0] = button.gain;
    buttonData.timeEvent.paused = button.pause;
    buttonData.requiredTurnsToUnlock = button.turns;
    if (!buttonData.timeEvent.hasDispatched){
        buttonData.timeEvent.hasDispatched = button.hasDispatched;
    }
    buttonData.timeEvent.hasDispatched = button.hasDispatched;
    if (typeof buttonData.runOneWithLoop !== 'undefined'){
        buttonData.runOneWithLoop = button.runOneWithLoop;
    }
    if (buttonData.popupEvent){
        buttonData.popupEvent.finished = button.popupEventFinished;
    }
    if (button.unlocked){
        activeButtonPosition.setFrame(1);
    }

    if (button.cycle || button.totalCycle){
        buttonData.cycleCount = button.cycle;
        buttonData.totalCycle = button.totalCycle;
    }

    if (!button.pause){
        // if (delay < ((button.elapseTime)+(buttonElapseTime*delay))){
            // if ((!buttonData.timeEvent.loop && !buttonData.timeEvent.hasDispatched) || buttonData.runOneWithLoop){
            //     buttonData.timeEvent.hasDispatched = true;
            //     buttonData.timeEvent.callbackScope[buttonData.timeEvent.callback.name](parseInt(buttonData.timeEvent.args[0]), buttonData.timeEvent.args[1]);
            //     if (!buttonData.runOneWithLoop){
            //         activeButtonPosition.setFrame(3);
            //     }
            // }
            // else{
            //     buttonElapseTime = ((button.elapseTime)+(buttonElapseTime*delay));
            //     let accumulate = Math.trunc(buttonElapseTime/delay);
            //     if (button.event == 'gainGold'){
            //         moneyAmount.data.values.amount += Math.trunc((button.gain*accumulate)*.50);
            //         moneyAmount.setText(moneyAmount.data.values.amount);
            //         button.accumulateList.money += (button.gain*accumulate)*.50;
            //     }
            //     else if (button.event == 'expGain'){
            //         expAmount.data.values.amount += Math.trunc((button.gain*accumulate)*.50);
            //         expAmount.setText(expAmount.data.values.amount);
            //         button.accumulateList.exp += (button.gain*accumulate)*.50;
            //     }
            //     buttonElapseTime = buttonElapseTime-(delay*accumulate);}
        //     }
        // else {
            // buttonElapseTime = (button.elapseTime)+(buttonElapseTime*delay);
        // }
        if (position == 'left'){
            game.buttonLeftSelected = activeButtonPosition;
        }
        else if (position == 'right'){
            game.buttonRightSelected = activeButtonPosition;
        }
        else if (position == 'character' && !buttonData.ignoreSingleButtonOnly){
            game.buttonCharacterSelected = activeButtonPosition;
        }
    }
    // else{
        buttonElapseTime = buttonElapseTime*delay;
    // }

    buttonData.timeEvent.elapsed = buttonElapseTime;
    for (let y = 0 ; y != Object.keys(button.buff).length ; y++){
        if (button.buff[y].isActive){
            buttonData.buff[y].active();
            if (position == 'left'){
                game.currentBuffLeft.push(buttonData.buff[y]);
                game.currentBuffLeft.numberOfTurns = button.buff[y].numberOfTurns;
                if (game.currentBuffLeft.buffDuration){
                    game.currentBuffLeft.buffDuration.elapsed = button.buff[y].buffDuration;
                }
            }   
            else if (position == 'right'){
                game.currentBuffRight.push(buttonData.buff[y]);
                game.currentBuffRight.numberOfTurns = button.buff[y].numberOfTurns;
                if (game.currentBuffRight.buffDuration){
                    game.currentBuffRight.buffDuration.elapsed = button.buff[y].buffDuration;
                }
            }
            else if(position == 'character'){
                game.currentBuffCharacter.push(buttonData.buff[y]);
                game.currentBuffCharacter.numberOfTurns = button.buff[y].numberOfTurns;
                if (game.currentBuffCharacter.buffDuration){
                    game.currentBuffCharacter.buffDuration.elapsed = button.buff[y].buffDuration;
                }
            }
        }
    }
    if ((!buttonData.timeEvent.loop && buttonData.timeEvent.hasDispatched) || buttonData.runOneWithLoop){
        buttonData.timeEvent.elapsed = 0;
        buttonData.timeEvent.paused = true;
        buttonData.default.pausedMidway = false;
        buttonData.default.pause = true;
        activeButtonPosition.anims.remove('activeButtonStop');
        if (!buttonData.runOneWithLoop){
            activeButtonPosition.setFrame(3);
        }
    }
}

function reloadActiveButton(button,elapseTime){
    let delay = button.data.values.timeEvent.delay;
    let buttonElapseTime = button.data.values.timeEvent.getProgress();
    let buttonData = button.data.values;
    if (!button.data.values.timeEvent.paused){
        if (delay < ((elapseTime)+(buttonElapseTime*delay))){
            if ((!buttonData.timeEvent.loop && !buttonData.timeEvent.hasDispatched) || buttonData.runOneWithLoop){
                buttonData.timeEvent.hasDispatched = true;
                buttonData.timeEvent.callbackScope[buttonData.timeEvent.callback.name](parseInt(buttonData.timeEvent.args[0]), buttonData.timeEvent.args[1]);
                if (!buttonData.runOneWithLoop){
                    button.setFrame(3);
                }
            }
            else {
                buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
                let accumulate = Math.trunc(buttonElapseTime/delay);
                if (button.data.values.timeEvent.callback == gainGold){
                    moneyAmount.data.values.amount += Math.trunc(button.data.values.timeEvent.args[0]*accumulate);
                    moneyAmount.setText(moneyAmount.data.values.amount);
                }
                else if (button.data.values.timeEvent.callback == expGain){
                    expAmount.data.values.amount += Math.trunc(button.data.values.timeEvent.args[0]*accumulate);
                    expAmount.setText(expAmount.data.values.amount);
                }
                buttonElapseTime = buttonElapseTime-(delay*accumulate);
            }
        }
        else {
            buttonElapseTime = (elapseTime)+(buttonElapseTime*delay);
        }
    }
    if (button.data.values.pausedMidway){
        buttonElapseTime = buttonElapseTime*delay;
    }
    button.data.values.timeEvent.elapsed = buttonElapseTime;
}

function checkUnlockableActiveButton(game){
    let x = activeButtonCharacter.length-1;
    let button = activeButtonCharacter[x].data.values;
    let button2;
    let turnsUnlocked = false;

    if (activeButtonCharacter[x-1]){
        button2 = activeButtonCharacter[x-1].data.values;
        if (button.requiredExpToUnlock == -1 && button2.requiredTurnsToUnlock == 0 && !button.unlocked){
            button2 = button;
            turnsUnlocked = true;
        }
        if (button.requiredExpToUnlock == -1 && button.unlocked){
            button2 = button;
        }
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

    if (button.requiredExpToUnlock+((button.requiredExpToUnlock*.25)*(game.tier-1)) <= expAmount.data.values.amount && !game.allButtonCharacterUnlock && turnsUnlocked){
        if (!button.unlocked){
            button.unlocked = true;
            game.activeButtonCharacter[x].setFrame(1);
        }
        if (getActiveButtonStats(game, 'character', button.default.stage, button.default.number+1, buffList) === true){
            if (button.requiredTurnsToUnlock == 0){
                if (game.currentStage == 0){
                    game.nextStage.data.values.descriptionPopup.required['1'][2] = '';
                }
                else if (game.currentStage == 1){
                    game.nextStage.data.values.descriptionPopup.required['2'][3] = '';
                }
                game.allButtonCharacterUnlock = true;
            }
        }
        else{
            activeButton(game,activeButtonCharacter,'character',
                getActiveButtonStats(game, 'character', button.default.stage, button.default.number+1, buffList));
            game.inputs.push(activeButtonCharacter[x+1]);
            activeButtonCharacter[x+1].data.values.timeEvent.timeScale = 1+(game.speedMultiplier/100);
        }
    }
}

function updateBuffs(game, buttonData){
    let currentBuff;
    if (buttonData.position == 'left' && game.currentBuffLeft){
        checkActiveBuffs(game.currentBuffLeft);
        currentBuff = game.currentBuffLeft;
    }
    else if (buttonData.position == 'right' && game.currentBuffRight){
        checkActiveBuffs(game.currentBuffRight);
        currentBuff = game.currentBuffRight;
    }
    else if (buttonData.position == 'character' && game.currentBuffCharacter){
        checkActiveBuffs(game.currentBuffCharacter);
        currentBuff = game.currentBuffCharacter;
    }

    if (currentBuff){
        for (var x = 0 ; x < currentBuff.length ; x++){
            if (!currentBuff[x].isActive){
                currentBuff.splice(x,1);
            }
        }
    }

    for (var x = 0 ; x != buttonData.buff.length ; x++){
        if (Phaser.Math.Between(1,100) <= buttonData.buff[x].chance && !buttonData.buff[x].isActive){
            if (buttonData.work){
                if (!buttonData.work.jobSelection.finished){
                    break;
                }
            }
            if (currentBuff){
                for (var y = 0 ; y < currentBuff.length ; y++){
                    if (currentBuff[y].buffNumber == buttonData.buff[x].buffNumber && !currentBuff[y].immune){
                        currentBuff[y].deactivate();
                        currentBuff.splice(y,1);
                    }
                }
            }
            
            if (buttonData.position == 'left'){
                game.currentBuffLeft.push(buttonData.buff[x]);
            }
            else if (buttonData.position == 'right'){
                game.currentBuffRight.push(buttonData.buff[x]);
            }
            else if (buttonData.position == 'character'){
                game.currentBuffCharacter.push(buttonData.buff[x]);
            }
            buttonData.buff[x].active();
            repositionBuffs(game);
            break;
        }
    }
}

function repositionBuffs(game){
    for (let x = 0 ; x < game.currentBuffLeft.length ; x++){
        if (!game.currentBuffLeft[x].isActive){
            game.currentBuffLeft.splice(x--,1);
        }
        else{
            if(x == 0){
                game.currentBuffLeft[x].icon.x = game.currentBuffLeft[x].x-(16*(game.currentBuffLeft.length-1));
            }
            else{
                game.currentBuffLeft[x].icon.x = game.currentBuffLeft[0].x+16;
            }
        }
    }
    for (let x = 0 ; x < game.currentBuffRight.length ; x++){
        if (!game.currentBuffRight[x].isActive){
            game.currentBuffRight.splice(x--,1);
        }
        else{
            if(x == 0){
                game.currentBuffRight[x].icon.x = game.currentBuffRight[x].x-(16*(game.currentBuffRight.length-1));
            }
            else{
                game.currentBuffRight[x].icon.x = game.currentBuffRight[0].x+16;
            }
        }
    }
    for (let x = 0 ; x < game.currentBuffCharacter.length ; x++){
        if (!game.currentBuffCharacter[x].isActive){
            game.currentBuffCharacter.splice(x--,1);
        }
        else{
            game.currentBuffCharacter[x].icon.x = game.currentBuffCharacter[x].x+(32*x);
        }
    }
}

function checkActiveBuffs(buff){
    for (var x = 0 ; x < buff.length ; x++){
        if (buff[x].numberOfTurns > 0 && buff[x].numberOfTurns != -1 && buff[x].isActive){
            buff[x].numberOfTurns -= 1;
        }
        if (buff[x].numberOfTurns == 0 && buff[x].numberOfTurns != -1 && buff[x].isActive){
            buff[x].deactivate();
            buff.splice[x,1];
        }
    }
}

function clearBuffs(buffArray){
    for (let x = 0 ; x < buffArray.length ; x++){
        buffArray[x].deactivate();
    }
}

function checkItemEquip(game){
    for (let x = 0 ; x != activeButtonCharacter.length ; x++){
        let data = activeButtonCharacter[x].data.values;
        if (data.itemEquipIndex){
            if (game.buyMenuCategories[data.itemEquipIndex-1].data.values.itemSelect){
                let itemData = game.buyMenuCategories[data.itemEquipIndex-1].data.values.itemSelect.data.values;
                if (data.event == 'gainGold'){
                    if (data.itemRequired){
                        data.gain = itemData.gainMoney;
                    }
                    else {
                        data.gain *= (itemData.point/100)+1;
                    }
                }
                else if (data.event == 'expGain'){
                    if (data.itemRequired){
                        data.gain = itemData.gainExp;
                    }
                    else {
                        data.gain *= (itemData.point/100)+1;
                    }
                }
                data.timeEvent.args[0] = data.gain;
            }
        }
    }
}

function addSpeedMultiplier(game, checkAll){
    if (checkAll){
        for (let x = 0 ; x != game.buyMenuCategories.length ; x++){
            game.buyMenuCategorySelect = game.buyMenuCategories[x];
            if (game.buyMenuCategorySelect.data.values.itemSelect){
                game.speedMultiplier += game.buyMenuCategorySelect.data.values.itemSelect.data.values.point;
            }
        }
    }
    else {
        if (game.buyMenuCategorySelect.data.values.prevItem){
            game.speedMultiplier -= game.buyMenuCategorySelect.data.values.prevItem.data.values.point;
        }
        if (game.buyMenuCategorySelect.data.values.itemSelect){
            game.speedMultiplier += game.buyMenuCategorySelect.data.values.itemSelect.data.values.point;
        }
    }
    applySpeedMultiplier(game);
}

function applySpeedMultiplier(game, checkAll){
    if (checkAll){
        addSpeedMultiplier(game, true);
    }
    for (let x = 0 ; x != game.activeButtonLeft.length ; x++){
        game.activeButtonLeft[x].data.values.timeEvent.timeScale = 1+(game.speedMultiplier/100);
    }
    for (let x = 0 ; x != game.activeButtonRight.length ; x++){
        game.activeButtonRight[x].data.values.timeEvent.timeScale = 1+(game.speedMultiplier/100);
    }
    for (let x = 0 ; x != game.activeButtonCharacter.length ; x++){
        game.activeButtonCharacter[x].data.values.timeEvent.timeScale = 1+(game.speedMultiplier/100);
    }
    game.statistics.updateMultipliers();
}

function save(game){
    game.saveManager.save(game);
}