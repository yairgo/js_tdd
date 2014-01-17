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
    beforeEach(function() {
      myGame.addFrame(spareFrame);
    });
    
    it("should score 10 points", function() {
        expect(myGame.getTotalScore()).toEqual(10);
    });
  });
  
  describe("can get the current total score of an incomplete game", function() {
    var normalFrame
    beforeEach(function() {
      normalFrame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'isSpare', 'getFirstRoll']);
      normalFrame.getFirstRoll.and.returnValue(7);
      normalFrame.getScore.and.returnValue(7);
      normalFrame.isStrike.and.returnValue(false);
      normalFrame.isSpare.and.returnValue(false);
      myGame.addFrame(normalFrame);
    });
    
    it("should score 7 points", function() {
        expect(myGame.getTotalScore()).toEqual(7);
    });
  });
  
  describe("can get the score for the first frame when there are two strikes after it", function() {
    var frame;
    beforeEach(function() {
      myGame.addFrame(strikeFrame);
      myGame.addFrame(strikeFrame);
      myGame.addFrame(strikeFrame);
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
  
  describe("can get the score for the first strike frame when there is a spare after it", function() {
    beforeEach(function() {
      myGame.addFrame(strikeFrame);
      myGame.addFrame(spareFrame);
    });

    it("should score 20 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(20);
    });
  });
  
  describe("a full game of strikes", function() {
    beforeEach(function() {
      for (var i = 0; i < 12; i++) { 
        myGame.addFrame(strikeFrame);
      }
    });

    it("should score 300 points", function() {
        expect(myGame.getTotalScore()).toEqual(300);
    });
  });
});
