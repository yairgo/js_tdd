describe("Game", function() {
  var myGame;

  beforeEach(function() {
    myGame = new Game();
  });

  describe("can add a frame", function() {
    var frame;
    beforeEach(function() {
      frame = jasmine.createSpy('frame');
      myGame.addFrame(frame);
    });

    it("adds the frame", function() {
      var actual = myGame.getFrames()[0];
      expect(actual).toBe(frame);
    });
  });
  
  describe("can get the total score", function() {
    var frame;
    beforeEach(function() {
      frame = jasmine.createSpyObj('frame', ['getScore']);
      frame.getScore.and.returnValue(10);
      myGame.addFrame(frame);
    });
    
    it("should score 10 points", function() {
        expect(myGame.getTotalScore()).toEqual(10);
    });
  });
  
  describe("can get the score for the first frame when there are two strikes after it", function() {
    var frame;
    beforeEach(function() {
      frame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'getFirstRoll']);
      frame.getScore.and.returnValue(10);
      frame.isStrike.and.returnValue(true);
      frame.getFirstRoll.and.returnValue(10);
      myGame.addFrame(frame);
      myGame.addFrame(frame);
      myGame.addFrame(frame);
    });

    it("should score 30 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(30);
    });
  });
});
