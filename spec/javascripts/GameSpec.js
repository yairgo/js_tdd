describe("Game", function() {
  var myGame;
  var strikeFrame;
  var spareFrame;

  beforeEach(function() {
    myGame = new Game();
    
    strikeFrame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'isTurnOver', 'isSpare', 'getFirstRoll']);
    strikeFrame.getScore.and.returnValue(10);
    strikeFrame.getFirstRoll.and.returnValue(10);
    strikeFrame.isStrike.and.returnValue(true);
    strikeFrame.isTurnOver.and.returnValue(true);
    strikeFrame.isSpare.and.returnValue(false);
    
    spareFrame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'isTurnOver', 'isSpare', 'getFirstRoll']);
    spareFrame.getFirstRoll.and.returnValue(7);
    spareFrame.getScore.and.returnValue(10);
    spareFrame.isTurnOver.and.returnValue(true);
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
  
  describe("can get the total score of a game with one completed 9 pin frame", function() {
    var frame
    beforeEach(function() {
      frame = new Frame();
      frame.addScore(7);
      frame.addScore(2);
      myGame.addFrame(frame);
    });
    
    it("should score 9 points", function() {
        expect(myGame.getTotalScore()).toEqual(9);
    });
  });
  
  describe("can get the current total score of an incomplete game", function() {
    var normalFrame
    beforeEach(function() {
      normalFrame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'isTurnOver', 'isSpare', 'getFirstRoll']);
      normalFrame.getFirstRoll.and.returnValue(7);
      normalFrame.getScore.and.returnValue(7);
      normalFrame.isStrike.and.returnValue(false);
      normalFrame.isSpare.and.returnValue(false);
      normalFrame.isTurnOver.and.returnValue(true);
      myGame.addFrame(normalFrame);
    });
    
    it("should score 7 points", function() {
        expect(myGame.getTotalScore()).toEqual(7);
    });
  });
  
  describe("is frame complete for a strike", function() {
    beforeEach(function() {
      myGame.addFrame(strikeFrame);
    });
    
    describe(" with 0 follow up rolls", function() {
        it("should not be complete", function() {
            expect(myGame.isFrameComplete(0)).toBeFalsy();
        }); 
    });
    
    describe(" with 1 follow up roll", function() {
        beforeEach(function() {
          myGame.addFrame(strikeFrame);
        });
        
        it("should not be complete", function() {
            expect(myGame.isFrameComplete(0)).toBeFalsy();
        }); 
    });
    
    
    describe(" with 2 follow up rolls", function() {
        beforeEach(function() {
          myGame.addFrame(strikeFrame);
          myGame.addFrame(strikeFrame);
        });
        
        it("should be complete", function() {
            expect(myGame.isFrameComplete(0)).toBeTruthy();
        }); 
    });
  });
  
  describe("a completed frame", function() {
    var frame;
    beforeEach(function() {
      frame = new Frame();
      frame.addScore(4);
      frame.addScore(4);
      myGame.addFrame(frame);
    });
        
    it("should be complete", function() {
      expect(myGame.isFrameComplete(0)).toBeTruthy();
    }); 
  });
  
  
  describe("getScoreForFrame for the first strike frame when there are two strikes after it", function() {
    beforeEach(function() {
      myGame.addFrame(strikeFrame);
      myGame.addFrame(strikeFrame);
      myGame.addFrame(strikeFrame);
    });

    it("should score 30 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(30);
    });
  });
  
  describe("getScoreForFrame for the first spare frame when there is a strike after it", function() {
    beforeEach(function() {
      myGame.addFrame(spareFrame);
      myGame.addFrame(strikeFrame);
    });

    it("should score 20 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(20);
    });
  });
  
  describe("getScoreForFrame for the first strike frame when there is a spare after it", function() {
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
  
  describe("a full game of spares with 7 pins in the first roll", function() {
    beforeEach(function() {
      for (var i = 0; i < 11; i++) { 
        myGame.addFrame(spareFrame);
      }
    });

    it("should score 170 points", function() {
        expect(myGame.getTotalScore()).toEqual(170);
    });
  });
  
  describe("getTotalScore with one strike frame completed", function() {
    beforeEach(function() {
      myGame.addFrame(strikeFrame);
    });

    it("should score 0 points because it's an incomplete frame", function() {
        expect(myGame.getTotalScore()).toEqual(0);
    });
  });
});
