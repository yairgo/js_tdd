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

Game.prototype.getScoreForFrame = function(frameIndex) {
    var frame = this.frames[frameIndex];
    var score = frame.getScore();
    if (frame.isStrike()) {
        score += this.getScoreForNextTwoRolls(frameIndex + 1);
    }
    return score;
};

Game.prototype.getScoreForNextTwoRolls = function(frameIndex) {
    var thisFrame = this.frames[frameIndex];
    var score = thisFrame.getScore();
    if (thisFrame.isStrike()) {
        score += this.getScoreForNextRoll(frameIndex + 1);
    }
    
    return score;
}

Game.prototype.getScoreForNextRoll = function(frameIndex) {
    var thisFrame = this.frames[frameIndex];
    
    return thisFrame.getFirstRoll()
}

Game.prototype.addFrame = function(frame) {
    this.frames[this.frames.length] = frame;
};