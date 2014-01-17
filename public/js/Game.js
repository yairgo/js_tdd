function Game(numberOfFrames) {
    this.maxFrames = (numberOfFrames) ? numberOfFrames : 10;
        
    this.frames = [];
}
Game.prototype.getTotalScore = function() {
    var score = 0;
    for(var i = 0; i < this.maxFrames; i++) {
        if (i >= this.frames.length) { 
            break;
        }
        score += this.getScoreForFrame(i);
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
    } else if (frame.isSpare()) {
        score += this.getScoreForNextRoll(frameIndex + 1);
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
    if(!thisFrame) {
        return 0; 
    }
    
    return thisFrame.getFirstRoll()
}

Game.prototype.addFrame = function(frame) {
    this.frames[this.frames.length] = frame;
};