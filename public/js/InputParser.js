function InputParser(game) {
  this.game = game;
}
InputParser.prototype.parseFrame = function(inputs, number) {
  if(parseInt(number) == 10) {

  } else {
    var inp1 = inputs[0];
    var inp2 = inputs[1];
    if(inp1.val() == 'X') {
      var frame = new Frame(10, 0);
      this.game.addFrame(frame);
    } else {
      if(inp2.val() == '/') {
        var first = parseInt(inp1.val())
        var second = 10 - first;

        var frame = new Frame(first, second);
        this.game.addFrame(frame);
      } else if(inp2.val() != '') {
        var frame = new Frame(parseInt(inp1.val()), parseInt(inp2.val()));
        this.game.addFrame(frame);
      }
    }
  }
}
