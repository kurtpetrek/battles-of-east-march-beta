DefenseOfWestfall.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

DefenseOfWestfall.Preloader.prototype = {
	
	preload: function () {
        this.titleText = this.add.image(this.world.centerX, this.world.centerY, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);
		this.preloadBar = this.add.sprite(this.world.centerX - 230, this.world.centerY + 230, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		
        this.load.image('titlescreen', 'images/startScene.png');
        this.load.image('infoPic', 'images/infoPic.png');
        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        this.load.image('wall', 'images/wall.png');
        this.load.atlasXML('cavalry', 'images/spritesheets/cavalry.png', 'images/spritesheets/cavalry.xml');
        this.load.atlasXML('knightSaluting', 'images/spritesheets/knightSaluting.png', 'images/spritesheets/knightSaluting.xml');
        this.load.atlasXML('dwarfRunningEast', 'images/spritesheets/dwarfRunningEast.png', 'images/spritesheets/dwarfRunningEast.xml');
        this.load.atlasXML('skeleton', 'images/spritesheets/skeleton.png', 'images/spritesheets/skeleton.xml');
        this.load.atlasXML('troll', 'images/spritesheets/troll.png', 'images/spritesheets/troll.xml');
        this.load.atlasXML('shadowKnight', 'images/spritesheets/shadowknight.png', 'images/spritesheets/shadowknight.xml');
        this.load.atlasXML('wizard', 'images/spritesheets/wizard.png', 'images/spritesheets/wizard.xml');
        
        this.load.audio('explosionSound', 'audio/explosion.mp3');
        this.load.audio('shieldSound', 'audio/shield.mp3');
        this.load.audio('horseSound', 'audio/horse.mp3');
        this.load.audio('spellSound', 'audio/spellSound.mp3');
        this.load.audio('trollSound', 'audio/troll.mp3');
        this.load.audio('dwarfSound', 'audio/dwarf.mp3');
 //       this.load.audio('gameMusic', 'audio/gameMusic1.mp3');
        
// !!!!!!!!!!!!!!!!! Load Game Board Tiles !!!!!!!!!!!!!!!!!
        this.load.image('gameBoard1', 'images/gameBoard1.png');
        this.load.image('grass', 'images/tiles/grass.png');
        this.load.image('grassWithSand', 'images/tiles/grassWithSand.png');
        this.load.image('grassWithSoil', 'images/tiles/grassWithSoil.png');
        this.load.image('shrub1', 'images/tiles/shrub1.png');
        this.load.image('shrub2', 'images/tiles/shrub2.png');
        this.load.image('shrub3', 'images/tiles/shrub3.png');
        this.load.image('warPanel', 'images/woodPanel.jpg');
        
// !!!!!!!!!!!!!!!!!  Load Character Images !!!!!!!!!!!!!!!!!!
        this.load.atlasXML('knight', 'images/spritesheets/knightAll.png', 'images/spritesheets/knightAll.xml');
        this.load.atlasXML('archer', 'images/spritesheets/archer.png', 'images/spritesheets/archer.xml');
        this.load.atlasXML('archerStandingSouth', 'images/spritesheets/archerStandingSouth.png', 'images/spritesheets/archerStandingSouth.xml');
        this.load.atlasXML('skeletonArcher', 'images/spritesheets/skeletonArcher.png', 'images/spritesheets/skeletonArcher.xml');
        this.load.atlasXML('orc', 'images/spritesheets/orc.png', 'images/spritesheets/orc.xml');
        this.load.atlasXML('shadowMageSpelling', 'images/spritesheets/shadowMageSpelling.png', 'images/spritesheets/shadowMageSpelling.xml');
        
// !!!!!!!!!!!!!!!!!!!! Load other assets !!!!!!!!!!!!!!!!!!!!!!!!
        this.load.atlasXML('arrow', 'images/spritesheets/arrowNorth.png', 'images/spritesheets/arrowNorth.xml');
        this.load.atlasXML('fireball', 'images/spritesheets/fireball.png', 'images/spritesheets/fireball.xml');
        this.load.atlasXML('iceball', 'images/spritesheets/iceball.png', 'images/spritesheets/iceball.xml');
        this.load.atlasXML('explosionA', 'images/spritesheets/explosionA.png', 'images/spritesheets/explosionA.xml');
        this.load.atlasXML('goodIn', 'images/spritesheets/goodIn.png', 'images/spritesheets/goodIn.xml');
        this.load.atlasXML('badIn', 'images/spritesheets/badIn.png', 'images/spritesheets/badIn.xml');
        this.load.atlasXML('mageIn', 'images/spritesheets/mageIn.png', 'images/spritesheets/mageIn.xml');
        this.load.atlasXML('rain', 'images/spritesheets/rain.png', 'images/spritesheets/rain.xml');
	},

	create: function () {
		
	},

	update: function () {
   //     if(this.cache.isSoundDecoded('gameMusic') && this.ready == false){
            this.preloadBar.cropEnabled = false;
            this.ready = true;
            this.state.start('StartMenu');
   //     }
        
	}
};

