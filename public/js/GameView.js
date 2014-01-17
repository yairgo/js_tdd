function GameView() {
  this.frames = '.frame input';
}
GameView.prototype.reset = function() {
  $(this.frames).prop('disabled', true).val('');

  this.enableFrame('1');
}
GameView.prototype.enableFrame = function(number) {
  var selector = this.frameInputSelector(number);
  $(selector).removeAttr('disabled');
  $($(selector)[0]).focus();
}
GameView.prototype.displayTotal = function(value) {
  $('#total').html(value);
}
GameView.prototype.disableFrame = function(number) {
  $(this.frameInputSelector(number)).prop('disabled', true);
}
GameView.prototype.frameInputSelector = function(number) {
  return '#frame' + number + ' input';
}
