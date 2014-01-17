function Game(view) {
    this.view = view;
    this.frames = [];
}

Game.prototype.start = function() {
  this.frames = [];
  this.view.reset();

}
Game.prototype.getTotalScore = function() {
    var score = 0;
    for(var i = 0; i < this.frames.length; i++) {
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


Game.prototype.getScoreUpToFrame = function(frameIndex) {
    var score = 0;
    if (!this.isFrameComplete(frameIndex)) {
        return "";
    }

    for(var i = 0; i <= frameIndex; i++) {
        if (i >= this.frames.length) {
            break;
        }
        score += this.getScoreForFrame(i);
    }
    return score;
}
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
    if(this.prevFrame()) {
      this.prevFrame().nextFrame(frame);
    }
    if(this.prevPrevFrame()) {
      this.prevPrevFrame().nextNextFrame(frame);
    }
    this.frames[this.frames.length] = frame;
    this.view.disableFrame(this.frames.length);
    this.view.enableFrame(this.frames.length + 1);
};
Game.prototype.prevFrame = function(frame) {
    return this.frames[this.frames.length - 1];
}
Game.prototype.prevPrevFrame = function(frame) {
    return this.frames[this.frames.length - 2];
}
