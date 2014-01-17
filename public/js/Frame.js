function Frame(firstScore, secondScore) {
    this.firstScore = firstScore;
    this.secondScore = secondScore;
    this._nextFrame = undefined;
    this._nextNextFrame = undefined;
    this.nextFrame = function(frame) {
      this._nextFrame = frame;
    };
    this.nextNextFrame = function(frame) {
      this._nextNextFrame = frame;
    };

    this.isSpare = function() {
        return this.getCount() == 10 && !this.isStrike();
    };
    this.isStrike = function() {
        return this.firstScore == 10;
    };

    this.isOpen = function() {
        return this.getCount() != 10;
    };

    this.getFirstRoll = function() {
        return this.firstScore ? this.firstScore : 0;
    };
    this.getScore = function() {
      if(this.isStrike()) {
        if(this._nextFrame) {
          if(this._nextFrame.isOpen()) {
            return 10 + this._nextFrame.getCount()
          } else if(this._nextFrame.isSpare()) {
            return 20;
          } else {
            if(this._nextNextFrame) {
              return 20 + this._nextNextFrame.firstScore;
            } else {
              return 20;
            }
          }
        }
      } else if(this.isSpare()) {
        if(this._nextFrame) {
          return 10 + this._nextFrame.getCount();
        }
          }
      return this.getCount();
    };
    this.getCount = function() {
        var total = 0;
        if(this.firstScore) {
            total += this.firstScore;
        }
        if(this.secondScore) {
            total += this.secondScore;
        }
        return total;
    }
    this.isTurnOver = function() {
        return this.isStrike() || this.secondScore;
    };
    this.isFinished = function() {
      if(this.isOpen()) {
        return this.secondScore != undefined;
      } else if(this.isSpare()) {
        return this._nextFrame != undefined;
      } else if(this.isStrike()) {
        if(this._nextFrame) {
          if(this._nextFrame.isStrike()) {
            return this._nextNextFrame != undefined;
          }
          return this._nextFrame.isTurnOver();
        }
      }
    }
}
function Strike() {
  Frame.apply(this, [10, 0]);
}
