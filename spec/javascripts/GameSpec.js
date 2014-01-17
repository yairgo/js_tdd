describe("Game", function() {
  var myGame;
  var strikeFrame;
  var spareFrame;

  beforeEach(function() {
    myGame = new Game();
    
    strikeFrame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'isSpare', 'getFirstRoll']);
    strikeFrame.getScore.and.returnValue(10);
    strikeFrame.getFirstRoll.and.returnValue(10);
    strikeFrame.isStrike.and.returnValue(true);
    strikeFrame.isSpare.and.returnValue(false);
    
    spareFrame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'isSpare', 'getFirstRoll']);
    spareFrame.getFirstRoll.and.returnValue(7);
    spareFrame.getScore.and.returnValue(10);
    spareFrame.isStrike.and.returnValue(false);
    spareFrame.isSpare.and.returnValue(true);
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
  
  describe("can get the score for the first spare frame when there is a strike after it", function() {
    beforeEach(function() {
      myGame.addFrame(spareFrame);
      myGame.addFrame(strikeFrame);
      
    });

    it("should score 20 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(20);
    });
  });
});
