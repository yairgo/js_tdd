describe("Frame", function() {
  var myFrame;

  beforeEach(function() {
    myFrame = new Frame();
  });

  describe("when the first frame is 10 pins", function() {
    beforeEach(function() {
      myFrame.addScore(10);
    });

    it("should be a strike", function() {
      expect(myFrame.isStrike()).toBeTruthy();
    });
    it("should not be an open", function() {
      expect(myFrame.isOpen()).toBeFalsy();
    });

    it("should be able to return the first roll of the frame", function() {
      expect(myFrame.getFirstRoll()).toEqual(10);
    });

    it("should be the end of the turn", function() {
      expect(myFrame.isTurnOver()).toBeTruthy();
    });

    it("should not be a spare", function() {
      expect(myFrame.isSpare()).toBeFalsy();
    });

    it("should count 10 points", function() {
      expect(myFrame.getCount()).toEqual(10);
    });
  });

  describe("when the first two frames equal 10 pins", function() {
    beforeEach(function() {
      myFrame.addScore(7);
      myFrame.addScore(3);
    });

    it("should not be a strike", function() {
      expect(myFrame.isStrike()).toBeFalsy();
    });

    it("should be able to return the first roll of the frame", function() {
      expect(myFrame.getFirstRoll()).toEqual(7);
    });

    it("should be the end of the turn", function() {
      expect(myFrame.isTurnOver()).toBeTruthy();
    });

    it("should be a spare", function() {
      expect(myFrame.isSpare()).toBeTruthy();
    });

    it("should count 10 points", function() {
      expect(myFrame.getCount()).toEqual(10);
    });
  });

  describe("when the first two frames equal 9 pins", function() {
    beforeEach(function() {
      myFrame.addScore(6);
      myFrame.addScore(3);
    });

    it("should not be a strike", function() {
      expect(myFrame.isStrike()).toBeFalsy();
    });

    it("should be the end of the turn", function() {
      expect(myFrame.isTurnOver()).toBeTruthy();
    });

    it("should be a spare", function() {
      expect(myFrame.isSpare()).toBeFalsy();
    });

    it("should be an open", function() {
      expect(myFrame.isOpen()).toBeTruthy();
    });

    it("should count 9 points", function() {
      expect(myFrame.getCount()).toEqual(9);
    });
  });
  describe('getScore', function() {
    var strike = new Frame();
    strike.addScore(10);
    var spare = new Frame();
    spare.addScore(8);
    spare.addScore(2);
    var open = new Frame();
    open.addScore(4);
    open.addScore(3);
    describe('strike with open', function(){
      it('should be 10 plus open total', function() {
        var to = new Frame();
        to.addScore(10);
        to.nextFrame(open);
        to.nextNextFrame(spare);
        expect(to.getScore()).toEqual(10 + open.getCount());
      });
    });
    describe('strike with strike', function(){
      it('and non strike should be 20 plus first ball', function() {
        var to = new Frame();
        to.addScore(10);
        to.nextFrame(strike);
        to.nextNextFrame(open);
        expect(to.getScore()).toEqual(20 + open.firstScore);
      });
      it('and no next ball should be 20', function() {
        var to = new Frame();
        to.addScore(10);
        to.nextFrame(strike);
        expect(to.getScore()).toEqual(20);
      });
    });
    describe('strike with spare', function(){
      it('should be 20', function() {
        var to = new Frame();
        to.addScore(10);
        to.nextFrame(spare);
        expect(to.getScore()).toEqual(20);
      });
    });
    describe('spare', function(){
      it('should be 10 plus next count', function() {
        var to = new Frame();
        to.addScore(5); to.addScore(5);
        to.nextFrame(open);
        expect(to.getScore()).toEqual(10 + open.getCount());
      });
    });
  })
});
