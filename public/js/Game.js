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
    if (!this.isFrameComplete(frameIndex)) {
        return 0;
    }
    var score = frame.getScore();
    if (frame.isStrike()) {
        score += this.getScoreForNextTwoRolls(frameIndex + 1);
    } else if (frame.isSpare()) {
        score += this.getScoreForNextRoll(frameIndex + 1);
    }
    return score;
};

Game.prototype.frameExists = function(frameIndex) {
    return !!this.frames[frameIndex]; 
}

Game.prototype.isFrameComplete = function(frameIndex) {
    if(!this.frameExists(frameIndex)) { 
        return false; 
    }

    var thisFrame = this.frames[frameIndex];
    if (thisFrame.isStrike()) {
        if(!this.frameExists(frameIndex + 1)) { 
            return false; 
        }
        var nextFrame = this.frames[frameIndex + 1];
        if (nextFrame.isStrike()) { 
            return this.frameExists(frameIndex + 2);
        }
        return true;
    } else if (thisFrame.isSpare()) {
        return this.frameExists(frameIndex + 1);
    } else {
        return thisFrame.isTurnOver();
    }
    return false;
};


Game.prototype.getScoreForNextTwoRolls = function(frameIndex) {
    var thisFrame = this.frames[frameIndex];
    if(!thisFrame) {
        return 0; 
    }
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