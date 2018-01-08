DefenseOfWestfall.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
    this.infoPrompt;
    
}

DefenseOfWestfall.StartMenu.prototype = {
	
	create: function () {
        this.spellSound = this.add.audio('spellSound');
        this.spellSound.play();
        this.spellSound.volume = 0.2;
		startBG = this.add.image(0, 0, 'titlescreen');
		
		
		startPrompt = this.add.bitmapText(this.world.centerX-235, this.world.centerY-30, 'eightbitwonder', 'Play', 50);
        startPrompt.inputEnabled = true;
		startPrompt.events.onInputDown.addOnce(this.startGame, this);
        
        infoPrompt = this.add.bitmapText(this.world.centerX+55, this.world.centerY-30, 'eightbitwonder', 'INFO', 50);
        infoPrompt.inputEnabled = true;
		infoPrompt.events.onInputDown.addOnce(this.startInfo, this);

	},

	startGame: function (pointer) {
        this.spellSound.stop();
		this.state.start('Game');
	},
    startInfo: function (pointer) {
        this.spellSound.stop();
		this.state.start('InfoMenu');
	}
};