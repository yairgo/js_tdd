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
      var f = this.frames[i];
        score += f.getScore();
    }
    return score;
};

Game.prototype.getFrames = function() {
    return this.frames;
};

Game.prototype.getScoreForFrame = function(frameIndex) {
    var frame = this.frames[frameIndex];
    if (!frame.isFinished()) {
        return 0;
    }
    var score = frame.getCount();
    if (frame.isStrike()) {
        score += this.getScoreForNextTwoRolls(frameIndex + 1);
    } else if (frame.isSpare()) {
        score += this.getScoreForNextRoll(frameIndex + 1);
    }
    return score;
};

Game.prototype.getScoreUpToFrame = function(frameIndex) {
    var score = 0;
    var frame = this.frames[frameIndex];
    if (!frame.isFinished()) {
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
    var score = thisFrame.getCount();
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
    this.view.displayTotal(this.getTotalScore());
};
Game.prototype.prevFrame = function(frame) {
    return this.frames[this.frames.length - 1];
}
Game.prototype.prevPrevFrame = function(frame) {
    return this.frames[this.frames.length - 2];
}
