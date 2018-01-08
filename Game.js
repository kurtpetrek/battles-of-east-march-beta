DefenseOfWestfall.Game = function(game) {
    this.goodDefenderGroup;
    this.badDefenderGroup;
    this.warPanel;
    this.warPanelPrompt;
    this.healthBar;
    this.levelCompleteText;
  //  this.physics.startSystem(Phaser.Physics.ARCADE);
    

};

DefenseOfWestfall.Game.prototype = {
    
    create: function() {
        this.gameOver = false;
        this.level = 1;
        this.warPanelHealth = 250;
        this.knightPrompt;
        this.archerPrompt;
        this.cavalryPrompt;
        this.dwarfPrompt;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.updateLaunch = 0;
        this.updateRate = 200;
        this.buildWorld();
        this.gameOver = false;
        this.specialGroup = this.add.group();
        this.specialGroup.enableBody = true;
        this.cavalryLaunch = 0;
        this.cavalryRate = 15000;
        this.dwarfLaunch = 0;
        this.dwarfRate = 11000;
        this.knightGroup = this.add.group();
        this.knightGroup.enableBody = true;
        this.goodMageAttackGroup = this.add.group();
        this.goodMageAttackGroup.enableBody = true;
        this.goodMageLaunch = 0;
        this.goodMageRate = 60000;
        this.knightLaunch = 0;
        this.knightRate = 200;
        this.knightBuildLaunch = 0;
        this.knightBuildRate = 3000;
        this.maxKnights =  5;
        this.knightsReady = 0;
        this.archerGroup = this.add.group();
        this.archerGroup.enableBody = true;
        this.archerLaunch = 0;
        this.archerRate = 400;
        this.archerBuildLaunch = 0;
        this.archerBuildRate = 5000;
        this.maxArchers =  3;
        this.archersReady = 0;
        this.goodArrow = this.add.group();
        this.goodArrow.enableBody = true;
        this.skeletonGroup = this.add.group();
        this.skeletonGroup.enableBody = true;
        this.skeletonArcherGroup = this.add.group();
        this.skeletonArcherGroup.enableBody = true;
        this.trollGroup = this.add.group();
        this.trollGroup.enableBody = true;
        this.shadowMageAttackGroup = this.add.group();
        this.shadowMageAttackGroup.enableBody = true;
        this.shadowMageLaunch = 0;
        this.shadowMageRate = 25000;
        this.badArrow = this.add.group();
        this.badArrow.enableBody = true;
        this.buildSkeletons();
        this.buildSkeletonArchers();
        this.placingKnight = false;
        this.placingArcher = false;
        this.moreSkeletonLaunch = this.time.now +9000;
        this.moreSkeletonRate = 9000;
        this.moreTrollLaunch = this.time.now +14000;
        this.moreTrollRate = 14000;
        this.moreOrcLaunch = this.time.now +15000;
        this.moreOrcRate = 15000;
        
        this.cavalryKeyLaunch = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.archerKeyLaunch = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.knightKeyLaunch = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.dwarfKeyLaunch = this.input.keyboard.addKey(Phaser.Keyboard.F);
        
        if(this.level > 2){
            this.buildDwarfSection();
        }
        
    },
    
    buildWorld: function() {
            var gameBackground = this.add.image(0,0,'gameBoard1')
// !!!!!!!!!!! Build Game Board !!!!!!!!!!!!!!!!!!
        this.treeCount = this.rnd.integerInRange(1, 10);
        for(var i = 0; i < this.treeCount; i++){
            this.treePicker = this.rnd.integerInRange(1, 3);
            var scale = this.rnd.integerInRange(5, 10)/10;
            if(this.treePicker == 1) {
                var tree = this.add.image(this.rnd.integerInRange(200, 650), this.rnd.integerInRange(0, 545), 'shrub1');
                tree.scale.x *= scale;
                tree.scale.y *= scale;
            }
            if(this.treePicker == 2) {
                var tree = this.add.image(this.rnd.integerInRange(200, 650), this.rnd.integerInRange(0, 545), 'shrub2');
                tree.scale.x *= scale;
                tree.scale.y *= scale;
             }
            if(this.treePicker == 3) {
                var tree = this.add.image(this.rnd.integerInRange(200, 650), this.rnd.integerInRange(0, 545), 'shrub3');
                tree.scale.x *= scale;
                tree.scale.y *= scale;
            }
        }
            this.buildWarPanel();
            this.buildKnightSection();
            this.buildArcherSection();
            this.buildGoodDefenders();
            this.buildBadDefenders();
        
        this.levelCompleteText = this.add.bitmapText(70, 200, 'eightbitwonder', '', 45);
        this.levelCompleteText.align = 'center';
    },
    
    buildWarPanel:function(){
        this.warPanel = this.add.sprite(0,810,'warPanel');
        this.warPanel.enableBody = true;
        this.physics.enable(this.warPanel, Phaser.Physics.ARCADE);
        this.warPanel.body.immovable = true;
        
        this.healthBar =  this.add.graphics(0, 0);
        this.healthBar.beginFill(0xFF2211, 0.7);
        this.healthBar.drawRect(20, 770, this.warPanelHealth * 2, 30);
    },
    
    buildGoodDefenders: function(){
        this.goodDefenderGroup = this.add.group();
        this.goodDefenderGroup.enableBody = true;
        for(var i=17; i<545; i += 45) {
         //   for(var y = 650; y<710; y+=50){
                var goodDefender = this.goodDefenderGroup.create(i, 710, 'knight', 'knightAttackingNorth01');
                goodDefender.anchor.setTo(0.5, 0.5);
         //       goodDefender.body.moves = false;
                goodDefender.body.immovable = true;
                goodDefender.hp = 60;
                goodDefender.scale.x *= 1.5;
                goodDefender.scale.y *= 1.5;
                goodDefender.fighting = false;
                goodDefender.animations.add('stand', [1]);
                goodDefender.animations.add('fight', this.game.math.numberArray(1, 12));
                goodDefender.animations.add('fall', this.game.math.numberArray(13, 25));
                goodDefender.animations.play('stand', 1, true);
       //     }
        }
    },
    
    buildCavalrySection: function(){
        this.cavalryButton = this.add.button(10,820, 'cavalry', this.buildCavalry, this, 2, 1, 0);
        this.cavalryButton.scale.x *= 1.5;
        this.cavalryButton.scale.y *= 1.5;
        this.cavalryPrompt = this.add.bitmapText(20, 870, 'eightbitwonder', '', 25);
    },

    buildDwarfSection: function(){
        this.dwarfButton = this.add.button(420,820, 'dwarfRunningEast', this.buildDwarves, this, 2, 1, 0);
        this.dwarfButton.scale.x *= 1.8;
        this.dwarfButton.scale.y *= 1.8;
        this.dwarfPrompt = this.add.bitmapText(400, 870, 'eightbitwonder', '', 25);
    },
    
    buildKnightSection: function(){
        this.knightButton = this.add.button(305,820, 'knight', this.knightActive, this, 27, 28, 9);
        this.knightButton.scale.x *= 1.8;
        this.knightButton.scale.y *= 1.8;
        this.knightPrompt = this.add.bitmapText(330, 870, 'eightbitwonder', '', 40);
    },
    
    buildArcherSection: function(){
        this.archerButton = this.add.button(200,820, 'archerStandingSouth', this.archerActive, this, 1, 2, 3);
        this.archerButton.scale.x *= 1.8;
        this.archerButton.scale.y *= 1.8;
        this.archerPrompt = this.add.bitmapText(215, 870, 'eightbitwonder', '', 40);
    },
    
    buildCavalry: function(){
        if(this.cavalryLaunch < this.time.now){
            this.cavalryLaunch = this.time.now + this.cavalryRate;    
        
            this.physics.enable(this.specialGroup, Phaser.Physics.ARCADE);
            for(var i=0; i<5; i++) {
                    var cavalry = this.specialGroup.create(this.rnd.integerInRange(-300, this.world.width-700), this.rnd.integerInRange(this.world.height-750, this.world.height-330), 'cavalry', 'slice01_01.png');
                    this.physics.enable(cavalry, Phaser.Physics.ARCADE);
                    cavalry.enableBody = true;
                    cavalry.anchor.setTo(0.5, 0.5);
                    cavalry.body.moves = true;
                    cavalry.scale.x *= 1.5;
                    cavalry.scale.y *= 1.5;
                    cavalry.animations.add('Walk', this.game.math.numberArray(1,12));
                    cavalry.animations.play('Walk', this.rnd.integerInRange(22, 26), true);
                    cavalry.body.velocity.x = this.rnd.integerInRange(500, 600);  
                    cavalry.body.immovable = true;
                    cavalry.checkWorldBounds = true;
                    cavalry.events.onOutOfBounds.add(this.cavalryOut, this);
            }
        }
    },
    
    cavalryOut: function(cavalry){
        if(cavalry.body.y > 600) {
            cavalry.kill();
        }
    },
    
    buildDwarves: function(){
        if (this.time.now > this.dwarfLaunch){
            this.dwarfLaunch = this.time.now + this.dwarfRate;
            var dwarfLeft = this.specialGroup.create(-100, 620, 'dwarfRunningEast', 'dwarfRunningEast01.png');
            this.physics.enable(dwarfLeft, Phaser.Physics.ARCADE);
            dwarfLeft.enableBody = true;
            dwarfLeft.anchor.setTo(0.5, 0.5);
            dwarfLeft.body.moves = true;
            dwarfLeft.animations.add('Walk', this.game.math.numberArray(1,8));
            dwarfLeft.animations.play('Walk', 15, true);
            dwarfLeft.body.velocity.x = 400;
            dwarfLeft.body.ySpeedMax = 0;
            dwarfLeft.scale.x *= 1.5;
            dwarfLeft.scale.y *= 1.5;
            dwarfLeft.body.immovable = true;
            dwarfLeft.checkWorldBounds = true;
            dwarfLeft.events.onOutOfBounds.add(this.dwarfLeftOut, this);

            var dwarfRight = this.specialGroup.create(600, 600, 'dwarfRunningEast', 'dwarfRunningEast01.png');
            this.physics.enable(dwarfRight, Phaser.Physics.ARCADE);
            dwarfRight.enableBody = true;
            dwarfRight.anchor.setTo(0.5, 0.5);
            dwarfRight.scale.x *= -1;
            dwarfRight.body.moves = true;
            dwarfRight.animations.add('Walk', this.game.math.numberArray(1,8));
            dwarfRight.animations.play('Walk', 15, true);
            dwarfRight.body.velocity.x = -400;
            dwarfRight.scale.x *= 1.5;
            dwarfRight.scale.y *= 1.5;
            dwarfRight.body.immovable = true;
            dwarfRight.checkWorldBounds = true;
            dwarfRight.events.onOutOfBounds.add(this.dwarfRightOut, this);
            }
    },
    
    dwarfLeftOut: function(dwarfLeft) {
        if(dwarfLeft.body.x > 600) {
            dwarfLeft.kill();
        }
    },
    
    dwarfRightOut: function(dwarfRight) {
        if(dwarfRight.x < -10) {
            dwarfRight.kill();
        }
    },
    
    knightActive:function() {
        this.placingKnight = true;
        this.placingArcher = false;
        this.buildKnight();
    },
    
    archerActive:function() {
        this.placingKnight = false;
        this.placingArcher = true;
        this.buildArcher();
    },
    
    buildKnight: function(pointer) {
        if(this.placingKnight == true && this.gameOver == false) {
            this.input.onDown.add(this.placeKnight, this);   
        }   
    },
    
    placeKnight: function(pointer) {
        if(pointer.y < 730 && this.placingKnight === true && this.knightLaunch <= this.time.now && this.knightsReady > 0) {
            this.knightLaunch = this.time.now + this.knightRate;
            this.knightsReady--;
            
            var knight = this.knightGroup.create( pointer.x , this.world.height-210, 'knight', 'knightRunningSouth01.png');
            this.physics.enable(knight, Phaser.Physics.ARCADE);
            knight.enableBody = true;
            knight.anchor.setTo(0.5, 0.5);
      //      knight.body.moves = true;
            knight.animations.add('walk', this.game.math.numberArray(50, 61));
            knight.animations.add('run', this.game.math.numberArray(26, 37));
            knight.animations.add('fight', this.game.math.numberArray(1, 12));
            knight.animations.add('fall', this.game.math.numberArray(13, 25));
            knight.animations.play('walk', 24, true);
            knight.checkWorldBounds = true;
            knight.body.velocity.y = -200;
            knight.hp = 50;
            knight.scale.x *= 1.5;
            knight.scale.y *= 1.5;
            knight.fighting = false;
            knight.events.onOutOfBounds.add(this.thingDied, this);
            
            var goodIn = this.add.sprite( knight.x, knight.y + 20, 'goodIn','goodIn01.png');
            goodIn.anchor.setTo(0.5, 0.5);
            goodIn.animations.add('bam', this.game.math.numberArray(1, 4));
            goodIn.animations.play('bam', 20, true);
            goodIn.scale.y *= 0.5;
            goodIn.scale.x *= 0.5;
            goodIn.events.onAnimationLoop.add(this.thingDied, this);
            
        }
    },
      
    buildArcher: function(pointer) {
        if(this.placingArcher == true && this.gameOver == false ) {
            this.input.onDown.add(this.placeArcher, this);       
        }   
    },
    
    placeArcher: function(pointer) {
        if(pointer.y < 700 && pointer.y > 320 && this.placingArcher === true && this.archerLaunch <= this.time.now && this.archersReady > 0) { 
            
            this.archerLaunch = this.time.now + this.archerRate;
            this.archersReady--;
            
            var archer = this.archerGroup.create( pointer.x , pointer.y, 'archer', 'Archer-Attacking-North01.png');
            this.physics.enable(archer, Phaser.Physics.ARCADE);
            archer.enableBody = true;
            archer.anchor.setTo(0.5, 0.5);
            archer.animations.add('stand', this.game.math.numberArray(30, 38));
            archer.animations.add('fire', [6,7,8,9,10,11,12,13,1,2,3,4,5]);
            archer.animations.add('fall', this.game.math.numberArray(14, 29));
            archer.animations.play('fire', 20, true);
            archer.events.onAnimationLoop.add(this.archerFiring, this);
            archer.checkWorldBounds = true;
            archer.events.onOutOfBounds.add(this.thingDied, this);
            archer.fireMarker = 0;
            archer.body.immovable = true;
            archer.hp = 50;
            archer.scale.x *= 1.5;
            archer.scale.y *= 1.5;
            archer.fighting = false;
            
            
            var arrow = this.goodArrow.create( archer.x, archer.y - 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = -200;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.checkWorldBounds = true;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            arrow.events.onOutOfBounds.add(this.thingDied, this);
            
            var goodIn = this.add.sprite( archer.x, archer.y + 20, 'goodIn','goodIn01.png');
            goodIn.anchor.setTo(0.5, 0.5);
            goodIn.animations.add('bam', this.game.math.numberArray(1, 4));
            goodIn.animations.play('bam', 10, true);
            goodIn.scale.y *= 0.5;
            goodIn.scale.x *= 0.5;
            goodIn.events.onAnimationLoop.add(this.thingDied, this);
            
            }
        
    },
    
    buildGoodMage(){
        var mage = this.add.sprite(this.world.width/2, 770, 'wizard','wizard01');
        mage.anchor.setTo(0.5, 0.5);
        mage.animations.add('spell', this.game.math.numberArray(1,13));
        mage.animations.play('spell', 20, true);
        mage.goEvents = 0;
        mage.scale.y *= 1.6;
        mage.scale.x *= 1.6;
        mage.events.onAnimationLoop.add(this.shadowMageGo, this);
        
        var mageIn = this.add.sprite( mage.x, mage.y, 'mageIn','mageIn01');
            mageIn.anchor.setTo(0.5, 0.5);
            mageIn.animations.add('bam', this.game.math.numberArray(1, 11));
            mageIn.animations.play('bam', 20, true);
            mageIn.scale.y *= 0.8;
            mageIn.scale.x *= 0.8;
            mageIn.events.onAnimationLoop.add(this.thingDied, this);
        
        for(var y= 0; y<20; y++){
                var fire = this.goodMageAttackGroup.create(mage.x, mage.y, 'fireball', 'fireball.png');
                this.physics.enable(fire, Phaser.Physics.ARCADE);
                fire.animations.add('go', this.game.math.numberArray(1,4));
                fire.animations.play('go', this.rnd.integerInRange(10, 20), true);
                fire.hp = 100;
                fire.fighting = false;
                fire.anchor.setTo(0.5, 0.5);
                fire.body.velocity.y -= this.rnd.integerInRange(100, 300);
                fire.body.velocity.x = this.rnd.integerInRange(-300, 300);
                fire.scale.x *= this.rnd.integerInRange(1, 2); 
                fire.scale.y *= this.rnd.integerInRange(1, 2);
                fire.checkWorldBounds = true;
                fire.events.onOutOfBounds.add(this.thingDied, this);
                //ice.body.immovable = true;
            }
        
    },
    
    buildBadDefenders: function() {
        this.badDefenderGroup = this.add.group();
        this.badDefenderGroup.enableBody = true;
        for(var i=17; i<545; i += 45) {
       //     for(var y= 150; y<210; y+=50){
                var badDefender = this.badDefenderGroup.create(i, 160, 'skeleton', 'skeletonRunningSouth01.png');
                badDefender.animations.add('stand', [3]);
                badDefender.animations.add('fight', [1,3,7,9,10,11,12,13,14]);
                badDefender.animations.add('fall', this.game.math.numberArray(18,28));
                badDefender.animations.play('stand', 1, true);
                badDefender.hp = 100;
                badDefender.scale.x *= 1.5;
                badDefender.scale.y *= 1.5;
                badDefender.fighting = false;
                badDefender.anchor.setTo(0.5, 0.5);
                badDefender.body.immovable = true;  
       //     }
        }
    },
    
    buildSkeletons: function() {        
        for(var i = 0; i<2; i++) {
            var skeleton = this.skeletonGroup.create(this.rnd.integerInRange(10, this.world.width-10), 70, 'skeleton', 'skeletonAttackSouth01.png');
            this.physics.enable(skeleton, Phaser.Physics.ARCADE);
            skeleton.enableBody = true;
            skeleton.anchor.setTo(0.5, 0.5);
            skeleton.animations.add('Walk', this.game.math.numberArray(31,39));
            skeleton.animations.add('fight', [1,3,7,9,10,11,12,13,14]);
            skeleton.animations.add('fall', this.game.math.numberArray(18,28));
            skeleton.animations.play('Walk', 10, true);
            skeleton.body.velocity.y = this.rnd.integerInRange(100, 200);
            skeleton.hp = 50;
            skeleton.scale.x *= 1.5;
            skeleton.scale.y *= 1.5;
            skeleton.fighting = false;
            skeleton.checkWorldBounds = true;
            skeleton.events.onOutOfBounds.add(this.thingDied, this);
            
            var badIn = this.add.sprite( skeleton.x, skeleton.y - 20, 'badIn','badIn01.png');
            badIn.anchor.setTo(0.5, 0.5);
            badIn.animations.add('bam', this.game.math.numberArray(1, 5));
            badIn.animations.play('bam', 15, true);
            badIn.scale.y *= 0.5;
            badIn.scale.x *= 0.5;
            badIn.events.onAnimationLoop.add(this.thingDied, this);
        }
    },
    
    buildSkeletonArchers: function(){
        for(var i = 0; i<1; i++) {
            var skeletonArcher = this.skeletonArcherGroup.create(this.rnd.integerInRange(10, this.world.width-10), 70, 'skeletonArcher', 'Skeleton-Archer-Attack-South01.png');
            this.physics.enable(skeletonArcher, Phaser.Physics.ARCADE);
            skeletonArcher.enableBody = true;
            skeletonArcher.anchor.setTo(0.5, 0.5);
            skeletonArcher.body.moves = true;
            skeletonArcher.animations.add('walk', this.game.math.numberArray(25,32));
            skeletonArcher.animations.add('fire', [6,7,8,10,11,1,2,3,4,5]);
            skeletonArcher.animations.add('fall', this.game.math.numberArray(12,24));
            skeletonArcher.animations.play('walk', this.rnd.integerInRange(8,12), true);
            skeletonArcher.body.velocity.y = this.rnd.integerInRange(70, 150);
            skeletonArcher.hp = 50;
            skeletonArcher.scale.x *= 1.5;
            skeletonArcher.scale.y *= 1.5;
            skeletonArcher.fighting = false;
            skeletonArcher.goEvents = 0;
            skeletonArcher.events.onAnimationLoop.add(this.skeletonArcherGo, this);
            skeletonArcher.checkWorldBounds = true;
            skeletonArcher.events.onOutOfBounds.add(skeletonArcher.kill, this);
            
            var badIn = this.add.sprite( skeletonArcher.x, skeletonArcher.y - 20, 'badIn','badIn01.png');
            badIn.anchor.setTo(0.5, 0.5);
            badIn.animations.add('bam', this.game.math.numberArray(1, 5));
            badIn.animations.play('bam', 15, true);
            badIn.scale.y *= 0.5;
            badIn.scale.x *= 0.5;
            badIn.events.onAnimationLoop.add(this.thingDied, this);
        }
    },
    
    skeletonArcherGo:function(skeletonArcher) {
        if(skeletonArcher.goEvents === 7){
            skeletonArcher.body.velocity.y = this.rnd.integerInRange(50, 150);
            skeletonArcher.animations.play('walk', this.rnd.integerInRange(8,12), true);
            skeletonArcher.goEvents = 0;
            skeletonArcher.events.onAnimationLoop.add(this.skeletonArcherGo, this);
        }
        if(skeletonArcher.goEvents === 6){
            var arrow = this.badArrow.create( skeletonArcher.x, skeletonArcher.y + 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = 200;
            arrow.body.velocity.x = 100;
            arrow.angle = -20;
            arrow.scale.y *= -1;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            skeletonArcher.goEvents++;
        }
        if(skeletonArcher.goEvents === 5){
            var arrow = this.badArrow.create( skeletonArcher.x, skeletonArcher.y + 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = 200;
            arrow.body.velocity.x = 50;
            arrow.angle = -10;
            arrow.scale.y *= -1;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            skeletonArcher.goEvents++;
        }
        if(skeletonArcher.goEvents === 4){
            var arrow = this.badArrow.create( skeletonArcher.x, skeletonArcher.y + 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = 200;
            arrow.body.velocity.x = 0;
            arrow.angle = 0;
            arrow.scale.y *= -1;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            skeletonArcher.goEvents++;
        }
        if(skeletonArcher.goEvents === 3){
            var arrow = this.badArrow.create( skeletonArcher.x, skeletonArcher.y + 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = 200;
            arrow.body.velocity.x = -50;
            arrow.angle = 10;
            arrow.scale.y *= -1;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            skeletonArcher.goEvents++;
        }
        if(skeletonArcher.goEvents === 2){
            var arrow = this.badArrow.create( skeletonArcher.x, skeletonArcher.y + 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = 200;
            arrow.body.velocity.x = -100;
            arrow.angle = 20;
            arrow.scale.y *= -1;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            skeletonArcher.goEvents++;
        }
        if(skeletonArcher.goEvents === 1){
            skeletonArcher.body.velocity.y = 0;
            skeletonArcher.animations.play('fire', this.rnd.integerInRange(8,12), true);
            
            var arrow = this.badArrow.create( skeletonArcher.x, skeletonArcher.y + 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = 200;
            arrow.scale.y *= -1;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            skeletonArcher.goEvents++;
        }
        if(skeletonArcher.goEvents === 0){
            skeletonArcher.goEvents++;
        }
    },
    
    buildTroll: function(){
        var troll = this.skeletonGroup.create(this.rnd.integerInRange(10, this.world.width-10), 70, 'troll', 'Troll-Attack-South01.png');
        this.physics.enable(troll, Phaser.Physics.ARCADE);
        troll.enableBody = true;
        troll.anchor.setTo(0.5, 0.5);
        troll.animations.add('Walk', this.game.math.numberArray(24,31));
        troll.animations.add('fight', this.game.math.numberArray(1,11));
        troll.animations.add('fall', this.game.math.numberArray(12,20));
        troll.animations.play('Walk', 10, true);
        troll.body.velocity.y = this.rnd.integerInRange(100, 200);
        troll.hp = 300;
        troll.fighting = false;
        troll.checkWorldBounds = true;
        troll.scale.x *= 2.5;
        troll.scale.y *= 2.5;
        troll.events.onOutOfBounds.add(this.thingDied, this);
        
        var badIn = this.add.sprite( troll.x, troll.y - 20, 'badIn','badIn01.png');
            badIn.anchor.setTo(0.5, 0.5);
            badIn.animations.add('bam', this.game.math.numberArray(1, 5));
            badIn.animations.play('bam', 15, true);
            badIn.scale.y *= 1;
            badIn.scale.x *= 1;
            badIn.events.onAnimationLoop.add(this.thingDied, this);
    },
    
    buildOrc: function(){
        var orc = this.skeletonGroup.create(this.rnd.integerInRange(10, this.world.width-10), 70, 'orc', 'orcAttackSouth01.png');
        this.physics.enable(orc, Phaser.Physics.ARCADE);
        orc.enableBody = true;
        orc.anchor.setTo(0.5, 0.5);
        orc.goEvents = 0;
        orc.animations.add('Walk', this.game.math.numberArray(30,36));
        orc.animations.add('fight', this.game.math.numberArray(1,13));
        orc.animations.add('fall', this.game.math.numberArray(14,29));
        orc.animations.play('Walk', 12, true);
        orc.events.onAnimationLoop.add(this.orcGo, this);
        orc.body.velocity.y = this.rnd.integerInRange(80, 180);
        orc.body.velocity.x = this.rnd.integerInRange(10, 100);
        orc.hp = 150;
        
        orc.fighting = false;
        orc.checkWorldBounds = true;
        orc.scale.x *= 1.9;
        orc.scale.y *= 1.9;
        orc.events.onOutOfBounds.add(this.thingDied, this);
        
        var badIn = this.add.sprite( orc.x, orc.y - 20, 'badIn','badIn01.png');
            badIn.anchor.setTo(0.5, 0.5);
            badIn.animations.add('bam', this.game.math.numberArray(1, 5));
            badIn.animations.play('bam', 15, true);
            badIn.scale.y *= 0.5;
            badIn.scale.x *= 0.5;
            badIn.events.onAnimationLoop.add(this.thingDied, this);
    },
    
    orcGo: function(orc){
        if(orc.goEvents === 2){orc.goEvents = 0;}
        if(orc.goEvents === 1){
            orc.body.velocity.x = this.rnd.integerInRange(10, 200);
            orc.body.velocity.y = this.rnd.integerInRange(80, 180);
            orc.goEvents++;
        }
        if(orc.goEvents === 0){
            orc.body.velocity.x = -this.rnd.integerInRange(10, 200);
            orc.body.velocity.y = this.rnd.integerInRange(80, 180);
            orc.goEvents++;
        }
    },
    
    buildShadowMage(){
        var shadowMage = this.add.sprite(this.world.width/2, 60, 'shadowMageSpelling','shadowMageSpelling01.png');
        shadowMage.anchor.setTo(0.5, 0.5);
        shadowMage.animations.add('spell', this.game.math.numberArray(1,13));
        shadowMage.animations.play('spell', 20, true);
        shadowMage.goEvents = 0;
        shadowMage.scale.y *= 1.6;
        shadowMage.scale.x *= 1.6;
        shadowMage.events.onAnimationLoop.add(this.shadowMageGo, this);
        
        var mageIn = this.add.sprite( shadowMage.x, shadowMage.y, 'mageIn','mageIn01');
            mageIn.anchor.setTo(0.5, 0.5);
            mageIn.animations.add('bam', this.game.math.numberArray(1, 11));
            mageIn.animations.play('bam', 20, true);
            mageIn.scale.y *= 0.8;
            mageIn.scale.x *= 0.8;
            mageIn.events.onAnimationLoop.add(this.thingDied, this);
        
        for(var y= 0; y<20; y++){
                var ice = this.shadowMageAttackGroup.create(shadowMage.x, shadowMage.y, 'iceball', 'iceball01.png');
                this.physics.enable(ice, Phaser.Physics.ARCADE);
                ice.animations.add('go', this.game.math.numberArray(1,8));
                ice.animations.play('go', this.rnd.integerInRange(10, 20), true);
                ice.hp = 100;
                ice.fighting = false;
                ice.anchor.setTo(0.5, 0.5);
                ice.body.velocity.y = this.rnd.integerInRange(100, 300);
                ice.body.velocity.x = this.rnd.integerInRange(-300, 300);
                ice.scale.x *= this.rnd.integerInRange(2, 5) * 0.1;
                ice.scale.y *= this.rnd.integerInRange(2, 5) * 0.1;
                ice.checkWorldBounds = true;
                ice.events.onOutOfBounds.add(this.thingDied, this);
            }
        
    },
    
    shadowMageGo:function(shadowMage){
        shadowMage.goEvents++;
        if(shadowMage.goEvents > 3){
            var mageIn = this.add.sprite( shadowMage.x, shadowMage.y, 'mageIn','mageIn01');
            mageIn.anchor.setTo(0.5, 0.5);
            mageIn.animations.add('bam', this.game.math.numberArray(1, 11));
            mageIn.animations.play('bam', 20, true);
            mageIn.scale.y *= 0.8;
            mageIn.scale.x *= 0.8;
            mageIn.events.onAnimationLoop.add(this.thingDied, this);
            shadowMage.kill();
        }
    },
    
    runGameOver:function(){
        this.state.start('StartMenu');  
    },
    
    levelComplete: function(){
        
        this.levelCompleteText.text = 'Level\nComplete\n\n\n\nClick for \nNext Level';
        this.levelCompleteText.inputEnabled = true;
        this.levelCompleteText.events.onInputDown.addOnce(this.nextLevel, this);
        
        this.skeletonArcherGroup.removeAll();
        this.skeletonGroup.removeAll();
        this.knightGroup.removeAll();
        this.archerGroup.removeAll();
        this.goodDefenderGroup.removeAll();
        this.badDefenderGroup.removeAll();
        this.shadowMageAttackGroup.removeAll();
        this.goodMageAttackGroup.removeAll();
        this.specialGroup.removeAll();
        this.goodArrow.removeAll();
        this.badArrow.removeAll();
        
        
    },
    
    nextLevel: function(pointer){
        this.levelCompleteText.text = '';
        this.level++;
        this.warPanelHealth = 250;
        this.knightsReady = 2;
        this.archersReady = 1;
        this.buildBadDefenders();
        this.buildGoodDefenders();
        if(this.level == 3){
            this.buildDwarfSection();
        }
        if(this.level == 4){
            this.buildCavalrySection();
        }
        this.healthBar.destroy();
        this.healthBar =  this.add.graphics(0, 0);
        this.healthBar.beginFill(0xFF2211, 0.7);
        this.healthBar.drawRect(20, 770, this.warPanelHealth * 2, 30);
        
    },
    
    arrowMoving: function(arrow){
        arrow.moving++
        if(arrow.moving > 2){
            arrow.kill();
        }
    },
    
    archerFiring: function(archer){
        if(archer.fireMarker == 9){
            archer.fireMarker = 0;
            archer.inputEnabled = false;
            archer.animations.play('fire', 20, true);
        }
        if(archer.fireMarker > 4 && archer.fireMarker < 9){
            archer.fireMarker++;
           // archer.inputEnabled = true;
           // archer.input.enableDrag(true);
        }
        if(archer.fireMarker == 4){
            var arrow = this.goodArrow.create( archer.x, archer.y - 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = -200;
            arrow.checkWorldBounds = true;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.events.onOutOfBounds.add(arrow.kill, this);
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            archer.fireMarker = 5;
            archer.animations.play('stand', 10, true);
        }
        if(archer.fireMarker == 3){
            var arrow = this.goodArrow.create( archer.x, archer.y - 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = -200;
            arrow.body.velocity.x = 100;
            arrow.angle = 20;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.checkWorldBounds = true;
            arrow.events.onOutOfBounds.add(arrow.kill, this);
            archer.fireMarker = 4;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
        }
        if(archer.fireMarker == 2) {
            var arrow = this.goodArrow.create( archer.x, archer.y - 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = -200;
            arrow.body.velocity.x = 50;
            arrow.angle = 10;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.checkWorldBounds = true;
            arrow.events.onOutOfBounds.add(arrow.kill, this);
            archer.fireMarker = 3;
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
        }
        if(archer.fireMarker == 1) {
            var arrow = this.goodArrow.create( archer.x, archer.y - 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = -200;
            arrow.body.velocity.x = -50;
            arrow.angle = -10;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.checkWorldBounds = true;
            arrow.events.onOutOfBounds.add(arrow.kill, this);
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            archer.fireMarker = 2;
        }
        if(archer.fireMarker == 0) {
            var arrow = this.goodArrow.create( archer.x, archer.y - 10, 'arrow','arrowNorth');
            this.physics.enable(arrow, Phaser.Physics.ARCADE);
            arrow.enableBody = true;
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.moves = true;
            arrow.body.velocity.y = -200;
            arrow.body.velocity.x = -100;
            arrow.angle = -20;
            arrow.animations.add('go', this.game.math.numberArray(1, 2));
            arrow.animations.play('go', 5, true);
            arrow.moving = 0;
            arrow.checkWorldBounds = true;
            arrow.events.onOutOfBounds.add(arrow.kill, this);
            arrow.events.onAnimationLoop.add(this.arrowMoving, this);
            archer.fireMarker = 1;
        }
    },
    
    strikeAndGo: function(thing){
        thing.animations.play('walk', 20, true);
    },
    
    strikeAndStop: function(thing){
        thing.animations.play('stand', 2, true);
    },
    
    thingDied: function(thing){
        thing.kill();
    },
    
    fightLoop: function(bam, thing){
        thing.fighting = false;
        bam.kill();
    },
    
    killGlitch: function(thing1, thing2){
        if(thing1.hp < -1){
            thing1.kill();
        
        }
        if(thing2.hp < -1){
            thing2.kill();
        }
    },
    
    killGlitch2: function(thing1, thing2){
        if(thing1.hp < -1){
            thing1.kill();
        
        }
        if(thing2.hp < -1){
            thing2.kill();
        }
    },
    
    smallBamIt: function(thing){
        var bam = this.add.sprite( thing.x, thing.y, 'explosionA','explosion01.png');
        bam.anchor.setTo(0.5, 0.5);
        bam.animations.add('bam', this.game.math.numberArray(1, 19));
        bam.animations.play('bam', 30, true);
        bam.scale.y *= 0.5;
        bam.scale.x *= 0.5;
        bam.events.onAnimationLoop.add(this.thingDied, this);
    },
    
    medBamIt: function(thing){
        var bam = this.add.sprite( thing.x, thing.y, 'explosionA','explosion01.png');
        bam.anchor.setTo(0.5, 0.5);
        bam.animations.add('bam', this.game.math.numberArray(1, 19));
        bam.animations.play('bam', 30, true);
        bam.scale.y *= 1;
        bam.scale.x *= 1;
        bam.events.onAnimationLoop.add(this.thingDied, this);
    },
    
    bigBamIt: function(thing){
        var bam = this.add.sprite( thing.x, thing.y, 'explosionA','explosion01.png');
        bam.anchor.setTo(0.5, 0.5);
        bam.animations.add('bam', this.game.math.numberArray(1, 19));
        bam.animations.play('bam', 30, true);
        bam.scale.y *= 1.5;
        bam.scale.x *= 1.5;
        bam.events.onAnimationLoop.add(this.thingDied, this);
    },
    
    smallContact: function(thing1, thing2){
        if(thing1.fighting == false && thing1.hp > 0){
            var bam = this.add.sprite( thing1.x, thing1.y, 'explosionA','explosion01.png');
            bam.anchor.setTo(0.5, 0.5);
            bam.animations.add('bam', this.game.math.numberArray(1, 19));
            bam.animations.play('bam', 30, true);
            bam.events.onAnimationLoop.add(this.fightLoop, this, thing1);
            bam.scale.y *= 0.5;
            bam.scale.x *= 0.5;
        }
        thing1.fighting = true;
        if(thing1.hp<=0 || thing2.hp<=0){
            var bam = this.add.sprite( thing1.x, thing1.y, 'explosionA','explosion01.png');
            bam.anchor.setTo(0.5, 0.5);
            bam.animations.add('bam', this.game.math.numberArray(1, 19));
            bam.animations.play('bam', 30, true);
            bam.events.onAnimationLoop.add(this.thingDied, this);
            bam.scale.y *= 0.5;
            bam.scale.x *= 0.5;
            thing1.fighting = false;
            thing2.fighting = false;
        }
    },
    
    skeletonHitArcher: function(skeleton, archer){
        if(skeleton.hp>0){
            archer.animations.play('fall', 20, true);
            archer.events.onAnimationLoop.add(this.thingDied, this);
            skeleton.body.velocity.y = this.rnd.integerInRange(100, 200);
            archer.body.velocity.y = 0;
            this.smallContact(archer,skeleton);
        }
    },
    
    shadowMageHitGoodDefender: function(ice, goodDefender){
        goodDefender.animations.play('stand', 2, true);
        if(goodDefender.hp < 0){
            goodDefender.kill();
        }
        ice.kill();
    },
    
    shadowMageHitKnight: function(ice, knight){
        ice.kill();
        knight.animations.play('walk', 24, true);
        knight.hp -= 20;
        knight.body.velocity.y = -100;
        knight.body.velocity.x = 0;
        if(knight.hp < 0){
            knight.kill();
        }
        this.medBamIt(knight);
    },
    
    skeletonHitArrow: function(skeleton, arrow){
        skeleton.hp -= 25;
        if(skeleton.hp <= 0){
            skeleton.animations.play('fall', 20, true);
            skeleton.events.onAnimationLoop.add(this.thingDied, this);
        }
        skeleton.body.velocity.y = this.rnd.integerInRange(100, 200);
        arrow.kill();
        this.smallBamIt(skeleton);
    },
    
    skeletonHitKnight: function(skeleton, knight){
        if(knight.hp > 0 && skeleton.hp > 0){
            knight.animations.play('fight', 24, true);
            knight.body.velocity.y = -100;
            skeleton.animations.play('fight', 10, true);
            skeleton.body.velocity.y = 100;
            knight.hp -= Math.random(0.01,0.05);
            skeleton.hp -= Math.random(0.01,0.05);
            this.smallContact(knight,skeleton);
            this.smallContact(skeleton,knight);
        }
        if(knight.hp <= 0){
            this.knightsOnField--;
            knight.animations.play('fall', 24, true);
            knight.events.onAnimationLoop.add(this.thingDied, this);
            skeleton.animations.play('Walk', 10, true);
            skeleton.body.velocity.y = 100;
        
        }
        if(skeleton.hp <= 0){
            skeleton.animations.play('fall', 20, true);
            skeleton.events.onAnimationLoop.add(this.thingDied, this);
            knight.animations.play('walk', 24, true);
            knight.body.velocity.y = -100;
        }
        this.killGlitch2(skeleton, knight);
    },
    
    skeletonHitGoodDefender: function(skeleton, goodDefender){
        if(goodDefender.hp > 0 && skeleton.hp > 0){
            goodDefender.animations.play('fight', 24, true);
            skeleton.animations.play('fight', 10, true);
            skeleton.body.velocity.y = 100;
            goodDefender.hp -= Math.random(0.01,0.05);
            skeleton.hp -= Math.random(0.01,0.05);
            this.smallContact(goodDefender,skeleton);
            this.smallContact(skeleton,goodDefender);
        }
        if(goodDefender.hp <= 0){
            goodDefender.animations.play('fall', 24, true);
            goodDefender.events.onAnimationLoop.add(this.thingDied, this);
            skeleton.animations.play('Walk', 10, true);
            skeleton.body.velocity.y = 100;
        
        }
        if(skeleton.hp <= 0){
            skeleton.animations.play('fall', 20, true);
            skeleton.events.onAnimationLoop.add(this.thingDied, this);
            goodDefender.animations.play('stand', 1, true);
        }
        this.killGlitch(skeleton, goodDefender);
    },
    
    skeletonArcherHitGoodDefender: function(skeletonArcher, goodDefender){
        skeletonArcher.animations.play('fall', 20, true);
        skeletonArcher.events.onAnimationLoop.add(this.thingDied, this);
        goodDefender.animations.play('fight', 30, true);
        goodDefender.events.onAnimationLoop.add(this.strikeAndStop, this);
        this.smallBamIt(skeletonArcher);
    },
    
    skeletonArcherHitKnight: function(skeletonArcher, knight){
        if(knight.hp > 0){
            skeletonArcher.animations.play('fall', 20, true);
            skeletonArcher.events.onAnimationLoop.add(this.thingDied, this);
            knight.body.velocity.y = - 100;
            knight.animations.play('fight', 10, true);
            knight.events.onAnimationLoop.add(this.strikeAndGo, this);
            this.smallContact(skeletonArcher,knight);
        } else{skeletonArcher.body.velocity.y = 0;}
    },
    
    arrowHitGoodDefender: function(arrow, goodDefender){
        if(goodDefender.hp > 10){
            goodDefender.hp -= this.rnd.integerInRange(7, 10);
            arrow.kill();
        } else {goodDefender.hp = 0;}
        
        if(goodDefender.hp <= 0){
            goodDefender.animations.play('fall', 24, true);
            goodDefender.events.onAnimationLoop.add(this.thingDied, this);
        }
        this.smallBamIt(goodDefender);
    },
    
    arrowHitKnight: function(arrow, knight){
        knight.hp -= this.rnd.integerInRange(20, 30);
        arrow.kill();
        knight.body.velocity.y = -100;
        knight.body.velocity.x = 0;
        if(knight.hp <= 0){
            this.knightsOnField--;
            knight.animations.play('fall', 24, true);
            knight.events.onAnimationLoop.add(this.thingDied, this);
        }
        this.smallBamIt(knight);
        
    },
    
    arrowHitArcher: function(arrow, archer){
        archer.hp -= this.rnd.integerInRange(20, 30);
        arrow.kill();
        archer.body.velocity.y = 0;
        archer.body.velocity.x = 0;
        
        if(archer.hp <= 0){
            archer.animations.play('fall', 24, true);
            archer.events.onAnimationLoop.add(this.thingDied, this);
        }
        this.smallBamIt(archer);
    },
    
    knightHitBadDefender: function(knight, badDefender){
        if(badDefender.hp > 0 && knight.hp > 0){
            badDefender.animations.play('fight', 24, true);
            knight.animations.play('fight', 10, true);
            knight.body.velocity.y = -100;
            badDefender.hp -= Math.random(0.01,0.05);
            knight.hp -= Math.random(0.01,0.05);
            this.smallContact(knight,badDefender);
            this.smallContact(badDefender,knight);
        }
        if(badDefender.hp <= 0){
            badDefender.animations.play('fall', 24, true);
            knight.animations.play('walk', 10, true);
            knight.body.velocity.y = -300;
            badDefender.events.onAnimationLoop.add(this.thingDied, this);
        }
        if(knight.hp <= 0){
            this.knightsOnField--;
            knight.animations.play('fall', 20, true);
            knight.events.onAnimationLoop.add(this.thingDied, this);
            badDefender.animations.play('stand', 1, true);
        }
        this.killGlitch(knight, badDefender);
    },
    
    arrowHitBadDefender: function(arrow, badDefender){
        badDefender.hp -= this.rnd.integerInRange(2, 3);
        arrow.kill();
        
        if(badDefender.hp <= 0){
            badDefender.animations.play('fall', 24, true);
            badDefender.events.onAnimationLoop.add(this.thingDied, this);
        }
        this.smallBamIt(badDefender);
    },
    
    arrowHitSkeletonArcher: function(arrow, skeletonArcher){
        skeletonArcher.hp -= this.rnd.integerInRange(20, 30);
        arrow.kill();
        skeletonArcher.body.velocity.y = 0;
        skeletonArcher.body.velocity.x = 0;
        
        if(skeletonArcher.hp <= 0){
            skeletonArcher.animations.play('fall', 24, true);
            skeletonArcher.events.onAnimationLoop.add(this.thingDied, this);
        }
        this.smallBamIt(skeletonArcher);
    },
    
    specialHitSkeleton: function(special, thing){    
        this.bigBamIt(thing);
        thing.kill();
    },
    
    goodMageHitSkeleton: function(ice, skeleton){
        ice.kill();
        skeleton.animations.play('walk', 24, true);
        skeleton.hp -= 20;
        skeleton.body.velocity.y = 100;
        skeleton.body.velocity.x = 0;
        if(skeleton.hp < 0){
            skeleton.kill();
        }
        this.medBamIt(skeleton);
    },
    
    mageHitArcher: function(spell, archer){
        spell.kill();
        archer.animations.play('fall', 24, true);
        archer.events.onAnimationLoop.add(this.thingDied, this);
        this.medBamIt(archer);
    },
    
    skeletonHitPanel: function(warPanel, skeleton){
        this.bigBamIt(skeleton);
        this.warPanelHealth -= skeleton.hp;
        skeleton.kill();
        
        this.healthBar.destroy();
        this.healthBar =  this.add.graphics(0, 0);
        this.healthBar.beginFill(0xFF2211, 0.7);
        this.healthBar.drawRect(20, 770, this.warPanelHealth * 2, 30);
        
        if(this.warPanelHealth < 0){this.runGameOver();}
    },
    
    moreEnemies: function(){
        if(this.time.now > this.moreSkeletonLaunch){
            this.moreSkeletonLaunch = this.time.now + this.moreSkeletonRate;
            this.buildSkeletons();
            this.buildSkeletonArchers();
        }
        if(this.time.now > this.moreTrollLaunch  && this.level > 3){
            this.moreTrollLaunch = this.time.now + this.moreTrollRate;
            this.buildTroll();
        }
        if(this.time.now > this.moreOrcLaunch && this.level > 2){
            this.moreOrcLaunch = this.time.now + this.moreOrcRate;
            this.buildOrc();
        }
        if(this.time.now > this.shadowMageLaunch){
            this.shadowMageLaunch = this.time.now + this.shadowMageRate;
            this.buildShadowMage();

        }
        if(this.time.now > this.goodMageLaunch && this.level > 4){
            this.goodMageLaunch = this.time.now + this.goodMageRate;
            this.buildGoodMage();

        }
    },
    
    rainUpdate: function(){
        if(this.updateLaunch < this.time.now){
            this.updateLaunch = this.time.now + this.updateRate;
            this.updatesGroup = this.add.group();
            this.updatesGroup.enableBody = true;
            for(var i = 0; i < 5; i++){
                var scale = this.rnd.integerInRange(3, 5)/10
                var rain = this.updatesGroup.create(this.rnd.integerInRange(0, 545), this.rnd.integerInRange(100, 740), 'rain','rain01.png');
                this.physics.enable(rain, Phaser.Physics.ARCADE);
                rain.anchor.setTo(0.5, 0.5);
                rain.animations.add('rain', this.game.math.numberArray(1, 5));
                rain.animations.play('rain', this.rnd.integerInRange(15, 30), true);
                rain.scale.y *= scale;
                rain.scale.x *= scale;
                rain.alpha = 0.6;
          //      rain.body.mass *= 0;
          //      rain.body.velocity.y = this.rnd.integerInRange(1, 4);
                rain.events.onAnimationLoop.add(this.thingDied, this);
            }
        } 
    },
    
    updateDefender: function(board, defender){
            defender.animations.play('stand', 2, true);
            if(defender.hp < 0){
                defender.kill();
            }
    },
    
    updateMover: function(board, thing){
        if(thing.hp < -1){
                thing.kill();
            }
 //       thing.animations.play('walk', 24, true);
    },
    
    buildUpdates: function(){
        if(this.time.now > this.knightBuildLaunch){
            if(this.knightsReady < this.maxKnights){
                this.knightsReady++;
            }
            this.knightBuildLaunch = this.time.now + this.knightBuildRate;
        }
        this.knightPrompt.text = this.knightsReady;
        
        if(this.time.now > this.archerBuildLaunch){
            if(this.archersReady < this.maxArchers){
                this.archersReady++;
            }
            this.archerBuildLaunch = this.time.now + this.archerBuildRate;
        }
        this.archerPrompt.text = this.archersReady;
        
        if(this.level > 3){
            if(this.time.now>this.cavalryLaunch){
                this.cavalryPrompt.text = 'Ready';
            } else{this.cavalryPrompt.text = '';}
        }
        if(this.level > 2) {
            if(this.time.now>this.dwarfLaunch){
                this.dwarfPrompt.text = 'Ready';
            } else{this.dwarfPrompt.text = '';}
        }
    },
    
    levelUpdate:function(){
        var badDefenders = this.badDefenderGroup.countLiving();
        if(badDefenders <= 0){
            this.levelComplete();
        }
    },
    
    update: function() {
// !!!!!!!!!! Updates !!!!!!!!!!!!!!            
        this.moreEnemies();
        this.rainUpdate();
        this.buildUpdates();
        this.levelUpdate();
        this.physics.arcade.overlap(this.updatesGroup, this.goodDefenderGroup, this.updateDefender, null, this);
        this.physics.arcade.overlap(this.updatesGroup, this.badDefenderGroup, this.updateDefender, null, this);
        this.physics.arcade.overlap(this.updatesGroup, this.knightGroup, this.updateMover, null, this);
        this.physics.arcade.overlap(this.updatesGroup, this.skeletonGroup, this.updateMover, null, this);
        
//!!!!!!!!!!!!!! Collisions !!!!!!!!!!!!!!!        
        this.physics.arcade.collide(this.skeletonGroup, this.archerGroup, this.skeletonHitArcher, null, this);
        this.physics.arcade.collide(this.skeletonGroup, this.goodArrow, this.skeletonHitArrow, null, this);
        this.physics.arcade.collide(this.skeletonGroup, this.knightGroup, this.skeletonHitKnight, null, this);
        this.physics.arcade.collide(this.skeletonGroup, this.goodDefenderGroup, this.skeletonHitGoodDefender, null, this);
        this.physics.arcade.collide(this.skeletonArcherGroup, this.goodDefenderGroup, this.skeletonArcherHitGoodDefender, null, this);
        this.physics.arcade.collide(this.skeletonArcherGroup, this.knightGroup, this.skeletonArcherHitKnight, null, this);
        this.physics.arcade.collide(this.shadowMageAttackGroup, this.goodDefenderGroup, this.shadowMageHitGoodDefender, null, this);
        this.physics.arcade.collide(this.shadowMageAttackGroup, this.knightGroup, this.shadowMageHitKnight, null, this);
        this.physics.arcade.collide(this.shadowMageAttackGroup, this.archerGroup, this.mageHitArcher, null, this);
        this.physics.arcade.collide(this.badArrow, this.goodDefenderGroup, this.arrowHitGoodDefender, null, this);
        this.physics.arcade.collide(this.badArrow, this.knightGroup, this.arrowHitKnight, null, this);
        this.physics.arcade.collide(this.badArrow, this.archerGroup, this.arrowHitArcher, null, this);
        this.physics.arcade.collide(this.knightGroup, this.badDefenderGroup, this.knightHitBadDefender, null, this);
        this.physics.arcade.collide(this.specialGroup, this.skeletonGroup, this.specialHitSkeleton, null, this);
        this.physics.arcade.collide(this.specialGroup, this.skeletonArcherGroup, this.specialHitSkeleton, null, this);
        this.physics.arcade.collide(this.goodArrow, this.badDefenderGroup, this.arrowHitBadDefender, null, this);
        this.physics.arcade.collide(this.goodArrow, this.skeletonArcherGroup, this.arrowHitSkeletonArcher, null, this);
        this.physics.arcade.collide(this.goodMageAttackGroup, this.badDefenderGroup, this.shadowMageHitGoodDefender, null, this);
        this.physics.arcade.collide(this.goodMageAttackGroup, this.skeletonGroup, this.goodMageHitSkeleton, null, this);
        this.physics.arcade.collide(this.goodMageAttackGroup, this.skeletonArcherGroup, this.mageHitArcher, null, this);
        this.physics.arcade.collide(this.warPanel, this.skeletonGroup, this.skeletonHitPanel, null, this);
        
//!!!!!!!!!!!!!!!!! Keyboard Controls !!!!!!!!!!!!!!!1        
        if(this.level > 3){if (this.cavalryKeyLaunch.isDown){ this.buildCavalry();}}
        
        if(this.level > 2){if (this.dwarfKeyLaunch.isDown){this.buildDwarves();}}
        
        if (this.knightKeyLaunch.isDown){this.knightActive();}
        
        if (this.archerKeyLaunch.isDown){this.archerActive();}
        
        if(this.warPanelHealth < 0){
            this.gameOver = true;
        }
        
    }

};