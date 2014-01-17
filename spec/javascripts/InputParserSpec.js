describe("InputParser", function() {
  var inputParser;
  var gameMock;
  var firstInput;
  var secondInput;
  var frameMock;
  var makeInput;

  beforeEach(function() {
    makeInput = function(ex) {
      return { val: function(v){return ex;} };
    }
    frameMock = jasmine.createSpyObj('frame', ['addScore']);
    spyOn(window, 'Frame').and.returnValue(frameMock);
    gameMock = jasmine.createSpyObj('Game', ['addFrame']);
    inputParser = new InputParser(gameMock);
  });

  describe("when event is from first input and input is X", function() {
    it("should create a frame with 10 pins and add to the game", function() {
      var firstInput = makeInput('X');
      inputParser.parseFrame([firstInput], '1');
      expect(gameMock.addFrame).toHaveBeenCalledWith(frameMock);
      expect(window.Frame).toHaveBeenCalledWith(10, 0);
    });
  });

  describe("first input is not x and second input is /", function() {
    it("sould mark correct pins for the rest", function() {
      var firstInput = makeInput('4');
      var secondInput = makeInput('/');
      inputParser.parseFrame([firstInput, secondInput], '1');

      expect(gameMock.addFrame).toHaveBeenCalledWith(frameMock);
      expect(window.Frame).toHaveBeenCalledWith(4, 6);
    });
  });
  describe("first input is not x and second input is number", function() {
    it("add both values", function() {
      var firstInput = makeInput('4');
      var secondInput = makeInput('3');
      inputParser.parseFrame([firstInput, secondInput], '1');

      expect(gameMock.addFrame).toHaveBeenCalledWith(frameMock);
      expect(window.Frame).toHaveBeenCalledWith(4, 3);
    });
  });
});
