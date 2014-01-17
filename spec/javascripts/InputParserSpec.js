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
    gameMock = jasmine.createSpyObj('Game', ['addFrame']);
    window.Frame = function() {
      return frameMock;
    };
    inputParser = new InputParser(gameMock);
  });

  describe("when event is from first input and input is X", function() {
    it("should create a frame with 10 pins and add to the game", function() {
      var firstInput = makeInput('X');
      inputParser.parseFrame(firstInput);
      expect(frameMock.addScore).toHaveBeenCalledWith(10);
      expect(gameMock.addFrame).toHaveBeenCalledWith(frameMock);
    });
  });

  describe("first input is not x and second input is /", function() {
    it("sould mark correct pins for the rest", function() {
      var firstInput = makeInput('4');
      var secondInput = makeInput('/');
      inputParser.parseFrame(firstInput, secondInput);
      expect(frameMock.addScore).toHaveBeenCalledWith(4);
      expect(frameMock.addScore).toHaveBeenCalledWith(6);
      expect(gameMock.addFrame).toHaveBeenCalledWith(frameMock);
    });
  });
  describe("first input is not x and second input is number", function() {
    it("add both values", function() {
      var firstInput = makeInput('4');
      var secondInput = makeInput('3');
      inputParser.parseFrame(firstInput, secondInput);
      expect(frameMock.addScore).toHaveBeenCalledWith(4);
      expect(frameMock.addScore).toHaveBeenCalledWith(3);
      expect(gameMock.addFrame).toHaveBeenCalledWith(frameMock);
    });
  });
});
