function InputParser(game) {
  this.game = game;
}
InputParser.prototype.parseFrame = function(inputs, number) {
  if(parseInt(number) == 10) {

  } else {
    var inp1 = inputs[0];
    var inp2 = inputs[1];
    if(inp1.val() == 'X') {
      var frame = new Frame();
      frame.addScore(10);
      this.game.addFrame(frame);
    } else {
      if(inp2.val() == '/') {
        var frame = new Frame();
        var first = parseInt(inp1.val())
        frame.addScore(first);
        frame.addScore(10 - first);
        this.game.addFrame(frame);
      } else if(inp2.val() != '') {
        var frame = new Frame();

        frame.addScore(parseInt(inp1.val()));
        frame.addScore(parseInt(inp2.val()));
        this.game.addFrame(frame);
      }
    }
  }
}
