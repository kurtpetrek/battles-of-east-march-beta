DefenseOfWestfall.InfoMenu = function(game) {
    this.infoBG;
    
}

DefenseOfWestfall.InfoMenu.prototype = {
	
	create: function () {
        this.trollSound = this.add.audio('trollSound');
        this.trollSound.play();
        this.trollSound.volume = 0.2;
		infoBG = this.add.image(0, 0, 'infoPic');
        infoBG.inputEnabled = true;
		infoBG.events.onInputDown.addOnce(this.startMenu, this);

	},

	startMenu: function (pointer) {
        this.trollSound.stop();
		this.state.start('StartMenu');
	}
};