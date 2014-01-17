describe("Game", function() {
  var myGame;
  var strikeFrame;
  var spareFrame;
  var viewMock;

  beforeEach(function() {
    viewMock = jasmine.createSpyObj('view', ['reset', 'enableFrame', 'disableFrame', 'displayTotal']);
    myGame = new Game(viewMock);

    strikeFrame = jasmine.createSpyObj('frame', ['getCount', 'isStrike', 'isTurnOver', 'isSpare', 'getFirstRoll', 'isFinished']);
    strikeFrame.getCount.and.returnValue(10);
    strikeFrame.getFirstRoll.and.returnValue(10);
    strikeFrame.isStrike.and.returnValue(true);
    strikeFrame.isTurnOver.and.returnValue(true);
    strikeFrame.isSpare.and.returnValue(false);

    spareFrame = jasmine.createSpyObj('frame', ['getCount', 'isStrike', 'isTurnOver', 'isSpare', 'getFirstRoll', 'nextFrame', 'isFinished']);
    spareFrame.getFirstRoll.and.returnValue(7);
    spareFrame.getCount.and.returnValue(10);
    spareFrame.isTurnOver.and.returnValue(true);
    spareFrame.isStrike.and.returnValue(false);
    spareFrame.isSpare.and.returnValue(true);
  });

  describe('starting a game', function() {
    it('start should reset view and frames', function() {
      myGame.frames = [spareFrame];

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
      frame = jasmine.createSpyObj('frame', ['nextFrame', 'nextNextFrame', 'getScore']);
      prevFrame = jasmine.createSpyObj('previousFrame', ['nextFrame', 'nextNextFrame', 'getScore']);
      prevPrevFrame = jasmine.createSpyObj('2 frames ago', ['nextFrame', 'nextNextFrame', 'getScore']);
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
      normalFrame = jasmine.createSpyObj('frame', ['getScore']);
      normalFrame.getScore.and.returnValue(7);
      myGame.frames = [normalFrame];
    });

    it("should score 7 points", function() {
        expect(myGame.getTotalScore()).toEqual(7);
    });
  });

  describe("getScoreForFrame for the first strike frame when there are two strikes after it", function() {
    beforeEach(function() {
      strikeFrame.isFinished.and.returnValue(true)
      myGame.frames = [strikeFrame, strikeFrame, strikeFrame];
    });

    it("should score 30 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(30);
    });
  });

  describe("getScoreForFrame for the first spare frame when there is a strike after it", function() {
    beforeEach(function() {
      spareFrame.isFinished.and.returnValue(true);
      myGame.frames = [spareFrame, strikeFrame];
    });

    it("should score 20 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(20);
    });
  });

  describe("getScoreForFrame for the first strike frame when there is a spare after it", function() {
    beforeEach(function() {
      strikeFrame.isFinished.and.returnValue(true);
      myGame.frames = [strikeFrame, spareFrame];
    });

    it("should score 20 points", function() {
        expect(myGame.getScoreForFrame(0)).toEqual(20);
    });
  });

  describe("getScoreUpToFrame returns the total score ", function() {
    beforeEach(function() {
      for (var i = 0; i < 5; i++) {
        spareFrame.isFinished.and.returnValue(true);
        myGame.frames[myGame.frames.length] = spareFrame;
      }
      var last = jasmine.createSpyObj('frame', ['getCount', 'isStrike', 'isTurnOver', 'isSpare', 'getFirstRoll', 'nextFrame', 'isFinished']);
      last.getFirstRoll.and.returnValue(7);
      last.isTurnOver.and.returnValue(false);
      myGame.frames[myGame.frames.length] = last
      console.log(myGame.frames.length);
    });

    it("should score the appropriate points", function() {
        expect(myGame.getScoreUpToFrame(0)).toEqual(17);
        expect(myGame.getScoreUpToFrame(1)).toEqual(34);
        expect(myGame.getScoreUpToFrame(2)).toEqual(51);
        expect(myGame.getScoreUpToFrame(3)).toEqual(68);
        expect(myGame.getScoreUpToFrame(4)).toEqual(85);
        expect(myGame.getScoreUpToFrame(5)).toEqual("");
    });
  });

});
