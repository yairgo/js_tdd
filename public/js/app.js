var game;
$(function() {

  game = new Game(new GameView());
  game.start();
  var inputParser = new InputParser(game);
  $('.frame input').focusout(function(){
    var parent = $(this).parent();
    var kids = parent.children();
    inputParser.parseFrame([$(kids[0]), $(kids[1]), $(kids[2])], parent.data('number'));
  });
  $('#clearer').click(function() {
    game.start();
  });
});
