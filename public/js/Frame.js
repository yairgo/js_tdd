function Frame() {
    this.firstScore;
    this.secondScore;
}
Frame.prototype.isSpare = function() {
    return this.getScore() == 10 && !this.isStrike();
};
Frame.prototype.isStrike = function() {
    return this.firstScore == 10;
};
Frame.prototype.getScore = function() {
    var total = 0;
    if(this.firstScore) {
        total += this.firstScore; 
    }
    if(this.secondScore) {
        total += this.secondScore; 
    }
    return total;
};
Frame.prototype.isTurnOver = function() {
    return this.isStrike() || this.secondScore;
};
Frame.prototype.addScore = function(value) {
    if (!this.firstScore) {
        this.firstScore = value;
    } else { 
        this.secondScore = value;
    }
};
