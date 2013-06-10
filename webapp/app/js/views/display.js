define(['models/namespace'], function(namespace) {
  var Display;
  return Display = (function() {
    function Display(id, title) {
      this.id = id;
      $('#' + id + ' .title').text(title);
      setInterval(function() {
        $('#' + id + ' .temp').text(namespace.disp.temp);
        $('#' + id + ' .humid').text(namespace.disp.humid);
        return $('#' + id + ' .level').text(namespace.disp.level);
      }, 2000);
    }

    return Display;

  })();
});
