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

    it("should be the end of the turn", function() {
      expect(myFrame.isTurnOver()).toBeTruthy();
    });
    
    it("should not be a spare", function() {
      expect(myFrame.isSpare()).toBeFalsy();
    });
    
    it("should score 10 points", function() {
      expect(myFrame.getScore()).toEqual(10);
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

    it("should be the end of the turn", function() {
      expect(myFrame.isTurnOver()).toBeTruthy();
    });
    
    it("should be a spare", function() {
      expect(myFrame.isSpare()).toBeTruthy();
    });
    
    it("should score 10 points", function() {
      expect(myFrame.getScore()).toEqual(10);
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
    
    it("should score 9 points", function() {
      expect(myFrame.getScore()).toEqual(9);
    });
  });
});
