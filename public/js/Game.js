function Game() {
    this.frames = [];
}
Game.prototype.getTotalScore = function() {
    var score = 0;
    for(var i = 0; i < this.frames.length; i++) {
        score += this.frames[i].getScore();
    }
    return score;
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