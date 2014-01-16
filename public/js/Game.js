function Game() {
    this.frames = [];
}
Game.prototype.getTotalScore = function() {
    return 0;
};

Game.prototype.getFrames = function() {
    return this.frames;
};

Game.prototype.getScoreForFrame = function() {
    return 0;
};

Game.prototype.addFrame = function(frame) {
    this.frames[this.frames.length] = frame;
};