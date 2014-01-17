describe("Game", function() {
  var myGame;
  var strikeFrame;
  var spareFrame;
  var viewMock;

  beforeEach(function() {
    viewMock = jasmine.createSpyObj('view', ['reset', 'enableFrame', 'disableFrame']);
    myGame = new Game(viewMock);

    strikeFrame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'isTurnOver', 'isSpare', 'getFirstRoll']);
    strikeFrame.getScore.and.returnValue(10);
    strikeFrame.getFirstRoll.and.returnValue(10);
    strikeFrame.isStrike.and.returnValue(true);
    strikeFrame.isTurnOver.and.returnValue(true);
    strikeFrame.isSpare.and.returnValue(false);

    spareFrame = jasmine.createSpyObj('frame', ['getScore', 'isStrike', 'isTurnOver', 'isSpare', 'getFirstRoll', 'nextFrame']);
    spareFrame.getFirstRoll.and.returnValue(7);
    spareFrame.getScore.and.returnValue(10);
    spareFrame.isTurnOver.and.returnValue(true);
    spareFrame.isStrike.and.returnValue(false);
    spareFrame.isSpare.and.returnValue(true);
  });

  describe('starting a game', function() {
    it('start should reset view and frames', function() {
      myGame.addFrame(spareFrame);

      myGame.start();
      expect(viewMock.reset).toHaveBeenCalled();
      expect(myGame.getFrames().length).toBe(0);
    });
  });
  describe("can add a frame", function() {
    var frame;
    var prevFrame;
    var prevPrevFrame;
    beforeEach(function() {
      frame = jasmine.createSpyObj('frame', ['nextFrame', 'nextNextFrame']);
      prevFrame = jasmine.createSpyObj('previousFrame', ['nextFrame', 'nextNextFrame']);
      prevPrevFrame = jasmine.createSpyObj('2 frames ago', ['nextFrame', 'nextNextFrame']);
    });

    it("adds the frame", function() {
      myGame.addFrame(frame);
      var actual = myGame.getFrames()[0];
      expect(actual).toBe(frame);
    });
    describe('notifies the view', function() {
      beforeEach(function() {
        myGame.frames = [frame, frame, frame]
      });
      it("to enable and disable", function() {
        myGame.addFrame(frame);

        expect(viewMock.disableFrame).toHaveBeenCalledWith(4);
        expect(viewMock.enableFrame).toHaveBeenCalledWith(5);
      });
    });
    describe('notifies previous frame', function() {
      beforeEach(function() {
        myGame.frames = [prevFrame]
      });
      it("of next frame", function() {
        myGame.addFrame(frame);

        expect(prevFrame.nextFrame).toHaveBeenCalledWith(frame);
      });

    });
    describe('notifies previous two frame', function() {
      beforeEach(function() {
        myGame.frames = [prevPrevFrame, prevFrame]
      });
      it("of next frames", function() {
        myGame.addFrame(frame);

        expect(prevFrame.nextFrame).toHaveBeenCalledWith(frame);
        expect(prevPrevFrame.nextNextFrame).toHaveBeenCalledWith(frame);
      });
    });
  });

  describe("can get the total score of a game with one completed 9 pin frame", function() {
    var frame
    beforeEach(function() {
      frame = new Frame();
      frame.addScore(7);
      frame.addScore(2);
      myGame.frames = [frame];
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
      myGame.frames = [normalFrame];
    });

    it("should score 7 points", function() {
        expect(myGame.getTotalScore()).toEqual(7);
    });
  });

  describe("is frame complete for a strike", function() {
    beforeEach(function() {
      myGame.frames = [strikeFrame];
    });

    describe(" with 0 follow up rolls", function() {
        it("should not be complete", function() {
            expect(myGame.isFrameComplete(0)).toBeFalsy();
        });
    });

    describe(" with 1 follow up roll", function() {
        beforeEach(function() {
          myGame.frames[myGame.frames.length] = strikeFrame;
        });

        it("should not be complete", function() {
            expect(myGame.isFrameComplete(0)).toBeFalsy();
        });
    });


    describe(" with 2 follow up rolls", function() {
        beforeEach(function() {
          myGame.frames[myGame.frames.length] = strikeFrame;
          myGame.frames[myGame.frames.length] = strikeFrame;
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
      myGame.frames = [frame];
    });

    it("should be complete", function() {
      expect(myGame.isFrameComplete(0)).toBeTruthy();
    });
  });


  describe("getScoreForFrame for the first strike frame when there are two strikes after it", function() {
    beforeEach(function() {
      myGame.frames = [strikeFrame, strikeFrame, strikeFrame];
    });

    it("should score 30 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(30);
    });
  });

  describe("getScoreForFrame for the first spare frame when there is a strike after it", function() {
    beforeEach(function() {
      myGame.frames = [spareFrame, strikeFrame];
    });

    it("should score 20 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(20);
    });
  });

  describe("getScoreForFrame for the first strike frame when there is a spare after it", function() {
    beforeEach(function() {
      myGame.frames = [strikeFrame, spareFrame];
    });

    it("should score 20 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(20);
    });
  });

  describe("a full game of strikes", function() {
    beforeEach(function() {
      for (var i = 0; i < 12; i++) {
        myGame.frames[myGame.frames.length] = strikeFrame;
      }
    });

    it("should score 300 points", function() {
        expect(myGame.getTotalScore()).toEqual(300);
    });
  });

  describe("a full game of spares with 7 pins in the first roll", function() {
    beforeEach(function() {
      for (var i = 0; i < 11; i++) {
        myGame.frames[myGame.frames.length] = spareFrame;
      }
    });

    it("should score 170 points", function() {
        expect(myGame.getTotalScore()).toEqual(170);
    });
  });

  describe("getScoreUpToFrame returns the total score ", function() {
    beforeEach(function() {
      for (var i = 0; i < 6; i++) {
        myGame.frames[myGame.frames.length] = spareFrame;
      }
    });

    it("should score the appropriate points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(17);
        expect(myGame.getScoreUpToFrame(0)).toEqual(17);
        expect(myGame.getScoreUpToFrame(1)).toEqual(34);
        expect(myGame.getScoreUpToFrame(2)).toEqual(51);
        expect(myGame.getScoreUpToFrame(3)).toEqual(68);
        expect(myGame.getScoreUpToFrame(4)).toEqual(85);
        expect(myGame.getScoreUpToFrame(5)).toEqual("");
    });
  });

  describe("getTotalScore with one strike frame completed", function() {
    beforeEach(function() {
      myGame.frames = [strikeFrame];
    });

    it("should score 0 points because it's an incomplete frame", function() {
        expect(myGame.getTotalScore()).toEqual(0);
    });
  });
});
