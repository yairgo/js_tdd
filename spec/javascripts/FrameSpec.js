describe("Frame", function() {
  var myFrame;

  describe("when the first frame is 10 pins", function() {
    beforeEach(function() {
      myFrame = new Frame(10);
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
      myFrame = new Frame(7, 3);
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
      myFrame = new Frame(6, 3);
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
    var strike = new Frame(10);
    var spare = new Frame(8, 2);
    var open = new Frame(4, 3);
    describe('strike with open', function(){
      it('should be 10 plus open total', function() {
        var to = new Frame(10);
        to.nextFrame(open);
        to.nextNextFrame(spare);
        expect(to.getScore()).toEqual(10 + open.getCount());
      });
    });
    describe('strike with strike', function(){
      it('and non strike should be 20 plus first ball', function() {
        var to = new Frame(10);
        to.nextFrame(strike);
        to.nextNextFrame(open);
        expect(to.getScore()).toEqual(20 + open.firstScore);
      });
      it('and no next ball should be 20', function() {
        var to = new Frame(10);
        to.nextFrame(strike);
        expect(to.getScore()).toEqual(20);
      });
    });
    describe('strike with spare', function(){
      it('should be 20', function() {
        var to = new Frame(10);
        to.nextFrame(spare);
        expect(to.getScore()).toEqual(20);
      });
    });
    describe('spare', function(){
      it('should be 10 plus next count', function() {
        var to = new Frame(5, 5);
        to.nextFrame(open);
        expect(to.getScore()).toEqual(10 + open.getCount());
      });
    });
  })
  describe('isFinished', function() {
    describe('when open', function() {
      it('should be correct', function() {
        var to = new Frame(4);

        expect(to.isFinished()).toBeFalsy();

        var to = new Frame(4, 3);

        expect(to.isFinished()).toBeTruthy();
      });
    });
    describe('when spare', function() {
      it('should be correct', function() {
        var to = new Frame(4, 6);
        expect(to.isFinished()).toBeFalsy();
        var next = new Frame(5);
        to.nextFrame(next);
        expect(to.isFinished()).toBeTruthy();
      });
    });
    describe('when strike', function() {
      var to;
      beforeEach(function() {
        to = new Frame(10);
      })
      it('with another strike', function() {
        var strike = new Frame(10);
        to.nextFrame(strike);

        expect(to.isFinished()).toBeFalsy();
        to.nextNextFrame(strike);
        expect(to.isFinished()).toBeTruthy();


      })
      it('with a spare', function() {
        var spare = new Frame(4, 6);
        to.nextFrame(spare);

        expect(to.isFinished()).toBeTruthy();
      });
      it('with an open', function() {
        var open = new Frame(4, 5);
        to.nextFrame(open);

        expect(to.isFinished()).toBeTruthy();
      });
      it('with an unfinished next frame', function() {
        var next = new Frame(3);

        expect(to.isFinished()).toBeFalsy();
      });
    });
  });
});
