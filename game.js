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
    // if (_game.currentBuffCharacter){
    //     if (_game.currentBuffCharacter.buffDuration){
    //         if (_game.currentBuffCharacter.buffDuration.delay > _game.currentBuffCharacter.buffDuration.elapsed+elapseTime){
    //             _game.currentBuffCharacter.buffDuration.elapsed += elapseTime;
    //         }
    //         else{
    //             _game.currentBuffCharacter.deactivate();
    //         }
    //     }
    // }
    // if (_game.currentBuffLeft){
    //     if (_game.currentBuffLeft.buffDuration){
    //         if (_game.currentBuffLeft.buffDuration.delay > _game.currentBuffLeft.buffDuration.elapsed+elapseTime){
    //             _game.currentBuffLeft.buffDuration.elapsed += elapseTime;
    //         }
    //         else{
    //             _game.currentBuffLeft.deactivate();
    //         }
    //     }
    // }
    // if (_game.currentBuffRight){
    //     if (_game.currentBuffRight.buffDuration){
    //         if (_game.currentBuffRight.buffDuration.delay > _game.currentBuffRight.buffDuration.elapsed+elapseTime){
    //             _game.currentBuffRight.buffDuration.elapsed += elapseTime;
    //         }
    //         else{
    //             _game.currentBuffRight.deactivate();
    //         }
    //     }
    // }
    if (expAmount.data.values.amount >= 120 && _game.currentStageCounter == 0){
        _game.currentStageCounter = 1;
    }
    if (expAmount.data.values.amount >= 1500 && _game.currentStage == 4){
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
    this.load.spritesheet('smallBed','assets/props/small_bed.png',{ frameWidth: 64, frameHeight: 96 });
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
    this.load.spritesheet('fatherPortraitBase','assets/characters/father portraits/base.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('motherPortraitBase','assets/characters/mother portraits/base.png',{ frameWidth: 32, frameHeight: 32 });
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
    this.load.bitmapFont('mainFont', 'assets/ui/font.png','assets/ui/font.fnt');
    this.load.bitmapFont('mainFont2', 'assets/ui/font2.png','assets/ui/font2.fnt');
    this.load.bitmapFont('mainFont8', 'assets/ui/font8.png','assets/ui/font8.fnt');

    this.player;
    this.nextStage;
    this.popupEvent;
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
    this.speedMultiplier = 1;
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

    this.buttonLeftSelected = false;
    this.buttonRightSelected = false;
    this.buttonCharacterSelected = false;
    this.allButtonCharacterUnlock = false;
    this.activeButtonNonCharacterCount = [2,1,1,1,1];

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
    this.nextStage.data.values.popupEvent = new function(){
        this.popupBG = _this.add.nineslice(0,0,16,16,'descriptionPopup',4);
        this.isPointed = false;
        this.popupText = _this.add.bitmapText(0,0,'mainFont2','');
        this.popupBG.setScale(2);
        
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
                this.popupText.text = 'Required: \nExp: '+(200+((_this.tier-1)*(200*.25)))+'\nA Bed';
            }
            else if (_this.currentStage == 1){
                this.popupText.text = 'Required: \nExp: '+(500+((500*.25)*(_this.tier-1)));
            }
            else if (_this.currentStage == 2){
                this.popupText.text = 'Required: \nExp: '+(800+((800*.25)*(_this.tier-1)));
            }
            else if (_this.currentStage == 3){
                this.popupText.text = 'Required: \nExp: '+(1250+((1250*.25)*(_this.tier-1)));
            }
            else if (_this.currentStage == 4){
                this.popupText.text = 'Required: \nExp: '+(1750+((1750*.25)*(_this.tier-1)));
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
            this.nextStage.data.values.popupEvent.show();
        }
    }, this);
    this.nextStage.on('pointerout', function(){
        if (!this.nextStageLocked){
            this.nextStage.setFrame(0);
            if ( this.currentStage >= 5 ){
                this.nextStage.setFrame(3);
            }
        }
        this.nextStage.data.values.popupEvent.hide();
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
            this.nextStage.setFrame(1);
            this.currentStage++;
            if (this.currentStage+1 >= 6){
                this.nextStage.data.values.text.setText('TRIAL');
                this.nextStage.setFrame(3);
            }
            if ( this.currentStage >= 6){
                if (!this.nextStage.data.values.popupEvent){
                    this.nextStage.data.values.popupEvent = new this.popupEvent(this).createTwoChoiceEvent('Are you sure you want to ascend?\nEverything will be reset',{
                        text: 'Yes',
                        event: function(){
                            _this.cutscene.setTextIndexQueue([0]);
                            _this.ascend.run();
                        }
                    },{
                        text: 'No',
                        event: function(){},
                    },
                    );
                }
                this.nextStage.data.values.popupEvent.show();
            }
            else {
                this.player.anims.play(characterIdle[this.currentStage+this.currentStageCounter],true);
                
                this.isCareSelected = false;
                if (this.currentStage+this.currentStageCounter == 2){
                    this.bg.data.values.tierCounter = 1;
                    this.bg.setFrame((this.tier-1)+this.bg.data.values.tierCounter);
                    this.buyMenuCategories[1].data.values.itemRender.setVisible(false);
                    this.player.setPosition(400,416);
                }
                if (this.currentStage+this.currentStageCounter == 3){
                    this.player.setPosition(400,384);
                }
                if (this.currentStage+this.currentStageCounter >= 3){
                    this.isCareSelected = true;
                }

                //get work cycles
                let leftButton = {}, rightButton = {};
                if (this.currentStage-1 <= 1){
                    leftButton['gain'] = activeButtonLeft[1].data.values.gain+(activeButtonLeft[1].data.values.cycleCount*.75);
                    rightButton['gain'] = activeButtonRight[1].data.values.gain+(activeButtonRight[1].data.values.cycleCount*.75);
                    leftButton['cycle'] = activeButtonLeft[1].data.values.cycleCount;
                    rightButton['cycle'] = activeButtonRight[1].data.values.cycleCount;
                    leftButton['workData'] = activeButtonLeft[1].data.values.work.getData();
                    rightButton['workData'] = activeButtonRight[1].data.values.work.getData();
                }
                else {
                    leftButton['gain'] = activeButtonLeft[0].data.values.gain+(activeButtonLeft[0].data.values.cycleCount*.75);
                    rightButton['gain'] = activeButtonRight[0].data.values.gain+(activeButtonRight[0].data.values.cycleCount*.75);
                    leftButton['cycle'] = activeButtonLeft[0].data.values.cycleCount;
                    rightButton['cycle'] = activeButtonRight[0].data.values.cycleCount;
                    leftButton['workData'] = activeButtonLeft[0].data.values.work.getData();
                    rightButton['workData'] = activeButtonRight[0].data.values.work.getData();
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
                putAllActiveButtonEvent(this);

                //recheck all items
                let buyMenuCategorySelectHolder = this.buyMenuCategorySelect;
                for (let x = 0 ; x != this.buyMenuCategories.length ; x++){
                    this.buyMenuCategorySelect = this.buyMenuCategories[x];
                    renderBuyMenuItem(this);
                }
                this.buyMenuCategorySelect = buyMenuCategorySelectHolder;

                //apply work cycle promotion
                if (this.currentStage <= 1){
                    activeButtonLeft[1].data.values.cycleCount = leftButton.cycle;
                    activeButtonLeft[1].data.values.work.jobSelection.finished = leftButton.workData.jobSelectionFinished;
                    if (leftButton.workData.jobSelectionFinished){
                        activeButtonLeft[1].data.values.work.acceptedWorkName = leftButton.workData.workName;
                        activeButtonLeft[1].data.values.work.acceptJob();
                    }
                    activeButtonLeft[1].data.values.gain = leftButton.gain;
                    activeButtonLeft[1].data.values.timeEvent.args = [activeButtonLeft[1].data.values.gain, activeButtonLeft[1]];

                    activeButtonRight[1].data.values.cycleCount = rightButton.cycle;
                    activeButtonRight[1].data.values.work.jobSelection.finished = rightButton.workData.jobSelectionFinished;
                    if (rightButton.workData.jobSelectionFinished){
                        activeButtonRight[1].data.values.work.acceptedWorkName = leftButton.workData.workName;
                        activeButtonRight[1].data.values.work.acceptJob();
                    }
                    activeButtonRight[1].data.values.gain = rightButton.gain;
                    activeButtonRight[1].data.values.timeEvent.args = [activeButtonRight[1].data.values.gain, activeButtonRight[1]];
                    money.setData('promotionEventPopup', 
                    new popupEvent(this).createAcknowledgeEvent('Your mother now have '+activeButtonLeft[1].data.values.gain+
                        '\ncash per cycle,'+
                        '\nwhile you father \nhave '+
                        activeButtonRight[1].data.values.gain+' cash per cycle \nas a promotion \nto their work'));
                    money.data.values.promotionEventPopup.approveButton.y += 24;
                    money.data.values.promotionEventPopup.approveButton.data.values.text.y += 24;
                }
                else {
                    activeButtonLeft[0].data.values.cycleCount = leftButton.cycle;
                    activeButtonLeft[0].data.values.work.jobSelection.finished = leftButton.workData.jobSelectionFinished;
                    if (leftButton.workData.jobSelectionFinished){
                        activeButtonLeft[0].data.values.work.acceptedWorkName = leftButton.workData.workName;
                        activeButtonLeft[0].data.values.work.acceptJob();
                    }
                    activeButtonLeft[0].data.values.gain = leftButton.gain;
                    activeButtonLeft[0].data.values.timeEvent.args = [activeButtonLeft[0].data.values.gain, activeButtonLeft[0]];

                    activeButtonRight[0].data.values.cycleCount = rightButton.cycle;
                    activeButtonRight[0].data.values.work.jobSelection.finished = rightButton.workData.jobSelectionFinished;
                    if (rightButton.workData.jobSelectionFinished){
                        activeButtonRight[0].data.values.work.acceptedWorkName = leftButton.workData.workName;
                        activeButtonRight[0].data.values.work.acceptJob();
                    }
                    activeButtonRight[0].data.values.gain = rightButton.gain;
                    activeButtonRight[0].data.values.timeEvent.args = [activeButtonRight[0].data.values.gain, activeButtonRight[0]];
                    money.setData('promotionEventPopup', 
                    new popupEvent(this).createAcknowledgeEvent('Your mother gain '+activeButtonLeft[0].data.values.gain+
                        '\ncash per cycle,'+
                        '\nwhile you father \ngain '+
                        activeButtonRight[0].data.values.gain+' cash per cycle \nas a promotion \nto their work'));
                    money.data.values.promotionEventPopup.approveButton.y += 24;
                    money.data.values.promotionEventPopup.approveButton.data.values.text.y += 24;
                }
                console.log(rightButton);
                console.log(leftButton);

                this.nextStageLocked = true;
                this.nextStage.setTexture('lockedButton',0);
                this.allButtonCharacterUnlock = false;
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

    this.fatherPortrait = this.add.image(62,164,'fatherPortraitBase').setOrigin(0.5).setScale(2);
    this.fatherPortrait.depth = 1;

    this.motherPortrait = this.add.image(742,164,'motherPortraitBase').setOrigin(0.5).setScale(2);
    this.motherPortrait.depth = 1;

    this.buyMenu = new buyMenu(this);
    this.buyMenu.close();

    this.saveManager = new saveManager(this);
    this.saveManager.load(this);
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
    expAmount.setText(expAmount.data.values.amount += Math.trunc(gain*this.expMultiplier));
    let buttonData = button.data.values;

    if (expAmount.data.values.amount >= 120 && this.currentStageCounter == 0){
        this.currentStageCounter = 1;
        this.player.anims.play(characterIdle[this.currentStage+this.currentStageCounter],true);
    }
    if (expAmount.data.values.amount >= 1500 && this.currentStage == 4){
        this.currentStageCounter += 1;
        this.player.anims.play(characterIdle[this.currentStage+this.currentStageCounter],true);
    }
    if (buttonData.requiredTurnsToUnlock){
        if (buttonData.requiredTurnsToUnlock > 0){
            buttonData.requiredTurnsToUnlock -= 1;
        }
    }

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

    createBuyMenuCategory(game, 'SMALL BED', 0, true);
    createBuyMenuCategory(game, 'CRIB', 0);
    createBuyMenuCategory(game, 'DESK', 1, false, false);
    createBuyMenuCategory(game, 'BEDSIDE TABLE', 1, false, false);
    createBuyMenuCategory(game, 'TOYS', 1);
    createBuyMenuCategory(game, 'SCHOOL SUPPLIES', 2, false, true,2);
    createBuyMenuCategory(game, 'GADGETS', 3, false, true,3);
    createBuyMenuCategory(game, 'COMPUTERS', 3, false, true,2);
    
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
            console.log(game.buyMenuCamera.scrollY+'>='+(600+(Math.trunc(game.buyMenuCategorySelect.data.values.itemList.length/3)*192)));
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

function createBuyMenuCategory(game, name, stageAvailable, selected = false, needPrimaryItem=false, primaryItemPointer = ''){
    let button = game.add.image(66,130+(32*(game.buyMenuCategories.length+1)),'buyMenuCategories',0).setOrigin(0);
    button.setInteractive();
    button.setData({
        isSelected: selected,
        stageAvailable: stageAvailable,
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
    }
    button.on('pointerout',function() {
        if (!button.data.values.isSelected && button.data.values.stageAvailable <= game.currentStage){
            button.setFrame(0);
        }
    });
    button.on('pointerover',function() {
        if (!button.data.values.isSelected && button.data.values.stageAvailable <= game.currentStage){
            button.setFrame(2);
        }
    });
    button.on('pointerup',function(){
        console.log(button.data.values.number);
        if (!button.isSelected && button.data.values.stageAvailable <= game.currentStage){
            game.buyMenuCamera.scrollX = 416*button.data.values.number;
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

function renderBuyMenuItem(game){
    if(game.buyMenuCategorySelect.data.values.itemSelect){
        let data = game.buyMenuCategorySelect.data.values.itemSelect.data.values;
        if (data.position-1 == 0){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(432,192, 'smallBed',data.itemNumber).setScale(2).setVisible(false).setOrigin(0);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
            if (game.currentStage+game.currentStageCounter >= 2){
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(true);
            }
            else{
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(false);
            }
        }
        if (data.position-1 == 1){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(400,310,'crib',data.itemNumber).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
            console.log(game.currentStage+game.currentStageCounter);
            if (game.currentStage+game.currentStageCounter <= 1){
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(true);
            }
            else {
                game.buyMenuCategorySelect.data.values.itemRender.setVisible(false);
            }
        }
        if (data.position-1 == 2){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(176,194,'desk',data.itemNumber).setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
        }
        if (data.position-1 == 3){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(400,250,'bedsideTable',data.itemNumber).setOrigin(0.5).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
        }
        if (data.position-1 == 4){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(200,400,'buyMenuIcons',data.iconItemNumber).setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.iconItemNumber);
        }
        if (data.position-1 == 5){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(242,208,'buyMenuIcons',data.iconItemNumber).setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.iconItemNumber);
            if (game.currentStage <= 2){
                game.buyMenuCategorySelect.data.values.itemRender.x = 242;
            }
            else if (game.currentStage >= 3){
                game.buyMenuCategorySelect.data.values.itemRender.x = 292;
            }
        }  
        if (data.position-1 == 6){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(400,236,'buyMenuIcons',data.iconItemNumber).setOrigin(0.5).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.iconItemNumber);
        }
        if (data.position-1 == 7){
            if (!game.buyMenuCategorySelect.data.values.itemRender){
                game.buyMenuCategorySelect.data.values.itemRender = game.add.image(176,164,'computer',data.itemNumber).setOrigin(0).setScale(2);
            }
            game.buyMenuCategorySelect.data.values.itemRender.setFrame(data.itemNumber);
        }    
    }
}

function saveManager(game){
    game.saveGame = window.localStorage;
    game.time.addEvent({
            delay:60000, loop:true, callback: save,
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
        game.saveGame.setItem('buttonSelected',JSON.stringify({
            buttonLeftSelected: game.buttonLeftSelected,
            buttonRightSelected: game.buttonRightSelected,
            buttonCharacterSelected: game.buttonCharacterSelected,
        }));
        game.saveGame.setItem('tier', 1);
        game.saveGame.setItem('tierCounter', 0);
        game.tier = 1;
        
        let defaultBuyItemData = game.buyMenuCategories[1].data.values.itemList[0].data.values;
        defaultBuyItemData.buyButton.setFrame(2);
        defaultBuyItemData.isBrought = true;
        defaultBuyItemData.canBeBrought = true;
        defaultBuyItemData.isUsed = true;
        defaultBuyItemData.buyButtonText.setText('USED');
        defaultBuyItemData.descriptionPopup.popupText.setText(defaultBuyItemData.desc);
        defaultBuyItemData.descriptionPopup.popupBG.resize((defaultBuyItemData.descriptionPopup.popupText.getTextBounds().local.width/2)+8, (defaultBuyItemData.descriptionPopup.popupText.getTextBounds().local.height/2)+8);
        game.buyMenuCategorySelect = game.buyMenuCategories[1];
        game.buyMenuCategorySelect.data.values.itemSelect = game.buyMenuCategories[1].data.values.itemList[0];
        renderBuyMenuItem(game);
        game.buyMenuCategorySelect = game.buyMenuCategories[0];

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
        buttonData.gain = 15;
        buttonData.timeEvent.args[0] = 15;

        buttonData = game.activeButtonRight[1].data.values;
        buttonData.work.generateJob(game);
        buttonData.work.acceptJob();
        buttonData.gain = 15;
        buttonData.timeEvent.args[0] = 15;
        putAllActiveButtonEvent(game);

        game.cutscene.setTextIndexQueue([0,1]);
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
        game.saveGame.setItem('buttonSelected',JSON.stringify({
            buttonLeftSelected: game.buttonLeftSelected,
            buttonRightSelected: game.buttonRightSelected,
            buttonCharacterSelected: game.buttonCharacterSelected,
        }));
        game.saveGame.setItem('stage', game.currentStage);
        game.saveGame.setItem('stageCounter', game.currentStageCounter);
        game.saveGame.setItem('isCareSelected',game.isCareSelected);
        game.saveGame.setItem('tier',game.tier);
        game.saveGame.setItem('tierCounter', game.bg.data.values.tierCounter);

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
                buff: {},
            };
            if(typeof buttons.runOneWithLoop !== 'undefined'){
                activeLeft[x].runOneWithLoop = buttons.runOneWithLoop;
            }
            if (buttons.popupEvent){
                activeLeft[x].popupEventFinished = buttons.popupEvent.finished;
            }
            if (buttons.work){
                activeLeft[x].workJobSelectionFinished = buttons.work.jobSelection.finished;
                activeLeft[x].workName = buttons.work.acceptedWorkName;
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
                buff: {},
            };
            if(typeof buttons.runOneWithLoop !== 'undefined'){
                activeRight[x].runOneWithLoop = buttons.runOneWithLoop;
            }
            if (buttons.popupEvent){
                activeRight[x].popupEventFinished = buttons.popupEvent.finished;
            }
            if (buttons.work){
                activeRight[x].workJobSelectionFinished = buttons.work.jobSelection.finished;
                activeRight[x].workName = buttons.work.acceptedWorkName;
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
                buff: {},
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
        let buttonSelected = JSON.parse(loadGame.getItem('buttonSelected'));
        game.buttonLeftSelected = buttonSelected.buttonLeftSelected;
        game.buttonRightSelected = buttonSelected.buttonRightSelected;
        game.buttonCharacterSelected = buttonSelected.buttonCharacterSelected;
        game.currentStage = parseInt(loadGame.getItem('stage'));
        game.currentStageCounter = parseInt(loadGame.getItem('stageCounter'));
        game.tier = parseInt(loadGame.getItem('tier'));
        game.bg.data.values.tierCounter = parseInt(loadGame.getItem('tierCounter'));
        game.bg.setFrame(game.tier-1 + game.bg.data.values.tierCounter);
        var accumulate = {money: 0 , exp: 0};

        for (let x in JSON.parse(loadGame.getItem('achievements'))){
            game.achievements.unlock(x);
        }

        let elapseTime = loadGame.getItem('time');
        if (elapseTime){
            elapseTime = Date.now() - elapseTime;
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
            let currentIndex = 0;
            for (let x = 0 ; x != game.buyMenuCategories.length ; x++){
                let data = game.buyMenuCategories[x].data.values.itemList;
                game.buyMenuCategorySelect = game.buyMenuCategories[x];
                for (let y = 0 ; y != data.length ; y++){
                    let data2 = data[y].data.values;
                    data2.isBrought = buyItems[currentIndex].isBrought;
                    data2.canBeBrought = buyItems[currentIndex].canBeBrought;
                    data2.isUsed = buyItems[currentIndex].isUsed;
                    if (data2.isBrought){
                        data2.buyButtonText.setText('USE');
                        data2.descriptionPopup.popupText.setText(data2.desc);
                        data2.descriptionPopup.popupBG.resize((data2.descriptionPopup.popupText.getTextBounds().local.width/2)+8, (data2.descriptionPopup.popupText.getTextBounds().local.height/2)+8);
                    }
                    if (data2.isUsed){
                        data2.buyButton.setFrame(2);
                        game.buyMenuCategories[x].data.values.itemSelect = data[y];
                        data2.buyButtonText.setText('USED');
                    }
                    currentIndex++;
                }
                renderBuyMenuItem(game);
            }
            checkItemEquip(game);
            game.buyMenuCategorySelect = game.buyMenuCategories[0];
        }

        if (expAmount.data.values.amount >= 120 && game.currentStageCounter == 0){
            game.currentStageCounter = 1;
        }
        if (expAmount.data.values.amount >= 1500 && game.currentStage == 4){
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
        game.nextStage.data.values.popupEvent.reinitialize();
        if (game.saveGame.getItem('wasSaved')){
            moneyAmount.setData('offlineEvent', new popupEvent(game).createAcknowledgeEvent(
                'While you\'re gone,\nYou gain '+Math.trunc(accumulate.money)+' cash \nand '+ Math.trunc(accumulate.exp)+' exp'));            
        }
    }
}

function loadActiveButton(game,position,x,Button,elapseTime, accumulateList){
    let button = Button;
    let event;
    if (button.event == 'gainGold'){
        event = gainGold;
    }
    else if (button.event == 'expGain'){
        event = expGain;
    }
    let buttonElapseTime = button.elapseTime;
    let delay = 1*button.delay;

    if (!button.pause){
        if (delay < ((elapseTime)+(buttonElapseTime*delay))){
            buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
            let accumulate = Math.trunc(buttonElapseTime/delay);
            if (button.event == 'gainGold'){
                moneyAmount.data.values.amount += Math.trunc((button.gain*accumulate)*.50);
                moneyAmount.setText(moneyAmount.data.values.amount);
                accumulateList.money += (button.gain*accumulate)*.50;
            }
            else if (button.event == 'expGain'){
                expAmount.data.values.amount += Math.trunc((button.gain*accumulate)*.50);
                expAmount.setText(expAmount.data.values.amount);
                accumulateList.exp += (button.gain*accumulate)*.50;
            }
            buttonElapseTime = buttonElapseTime-(delay*accumulate);
        }
        else {
            buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
        }
    }
    else{
        buttonElapseTime = buttonElapseTime*delay;
    }

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
    if (buttonData.work){
        buttonData.work.jobSelection.finished = button.workJobSelectionFinished;
        if (buttonData.work.jobSelection.finished){
            buttonData.work.acceptedWorkGain = button.gain;
            buttonData.work.acceptedWorkName = button.workName;
            buttonData.work.acceptJob();
        }
    }
    buttonData.timeEvent.elapsed = buttonElapseTime;
    buttonData.timeEvent.paused = button.pause;
    buttonData.default.pause = button.pause;
    buttonData.unlocked = button.unlocked;
    buttonData.default.pausedMidway = button.pausedMidway;
    buttonData.gain = button.gain;
    if (typeof buttonData.runOneWithLoop !== 'undefined'){
        buttonData.runOneWithLoop = button.runOneWithLoop;
    }
    if (buttonData.popupEvent){
        buttonData.popupEvent.finished = button.popupEventFinished;
    }
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
    if (button.unlocked){
        activeButtonPosition.setFrame(1);
    }
}

function reloadActiveButton(button,elapseTime){
    let delay = button.data.values.timeEvent.delay;
    let buttonElapseTime = button.data.values.timeEvent.getProgress();
    if (!button.data.values.timeEvent.paused){
        if (delay < ((elapseTime)+(buttonElapseTime*delay))){
            buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
            let accumulate = Math.trunc(buttonElapseTime/delay);
            if (button.data.values.timeEvent.callback == gainGold){
                moneyAmount.data.values.amount += button.data.values.timeEvent.args[0]*accumulate;
                moneyAmount.setText(moneyAmount.data.values.amount);
            }
            else if (button.data.values.timeEvent.callback == expGain){
                expAmount.data.values.amount += button.data.values.timeEvent.args[0]*accumulate;
                expAmount.setText(expAmount.data.values.amount);
            }
            buttonElapseTime = buttonElapseTime-(delay*accumulate);
        }
        else {
            buttonElapseTime = ((elapseTime)+(buttonElapseTime*delay));
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

    if (button.requiredExpToUnlock <= expAmount.data.values.amount && !game.allButtonCharacterUnlock && turnsUnlocked){
        game.activeButtonCharacter[x].setFrame(1);
        button.unlocked = true;
        if (getActiveButtonStats(game, 'character', button.default.stage, button.default.number+1, buffList) === true){
            if (button.requiredTurnsToUnlock == 0){
                game.allButtonCharacterUnlock = true;
            }
        }
        else{
            activeButton(game,activeButtonCharacter,'character',
                getActiveButtonStats(game, 'character', button.default.stage, button.default.number+1, buffList));
            game.inputs.push(activeButtonCharacter[x+1]);
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
                    data.gain = itemData.gainMoney;
                }
                else if (data.event == 'expGain'){
                    data.gain = itemData.gainExp;
                }
                data.timeEvent.args[0] = data.gain;
            }
        }
    }
}

function applySpeedMultiplier(game){
    for (let x = 0 ; x != game.activeButtonLeft.length ; x++){
        game.activeButtonLeft[x].data.values.timeEvent.timeScale += game.speedMultiplier/10;
    }
    for (let x = 0 ; x != game.activeButtonRight.length ; x++){
        game.activeButtonRight[x].data.values.timeEvent.timeScale += game.speedMultiplier/10;
    }
    for (let x = 0 ; x != game.activeButtonCharacter.length ; x++){
        game.activeButtonCharacter[x].data.values.timeEvent.timeScale += game.speedMultiplier/10;
    }
}

function save(game){
    game.saveManager.save(game);
}