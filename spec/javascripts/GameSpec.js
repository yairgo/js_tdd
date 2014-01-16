describe("Game", function() {
  var myGame;

  beforeEach(function() {
    myGame = new Game();
  });

  describe("can add a frame", function() {
    var frame;
    beforeEach(function() {
      frame = new Frame();
      frame.addScore(10);
      myGame.addFrame(frame);
    });

    it("adds the frame", function() {
      var actual = myGame.getFrames()[0];
      expect(actual).toEqual(frame);
    });
  });
  
  describe("can get the total score", function() {
    var frame;
    beforeEach(function() {
      frame = new Frame();
      frame.addScore(10);
      myGame.addFrame(frame);
    });
    
    it("should score 10 points", function() {
        expect(myGame.getTotalScore()).toEqual(10);
    });
  });
  
  describe("can get the score for a frame", function() {
    beforeEach(function() {
      
    });

    it("should score 10 points", function() {
    });
  });
});
