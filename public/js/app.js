$(function() {

  var game = new Game();
  var inputParser = new InputParser(game);
  $('.frame input').focusout(function(){
    var kids = $(this).parent().children();
    inputParser.parseFrame($(kids[0]), $(kids[1]));
  });
});
