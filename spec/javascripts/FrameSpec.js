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
      expect(myFrame.isSpare).toBeFalsy();
    });
  });
});
