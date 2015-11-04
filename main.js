$(document).ready(function() {
  var $input = $('#input');
  var $logList = $('#log');

  var respond = function(question){
    var answer  = '';
    var newList = $('<li>');    
    newList.text(answer);
    $logList.append(newList);
  }

  var addItem = function(event) {
    // √ console.log('listening');
    if (event.keyCode===13) {
      // √ console.log('was enter');
      var newList = $('<li>');
      // √ console.log($input.val());
      newList.text($input.val());
      $logList.append(newList);
      respond($input.val());
      $input.val('');
    };
  }



  $input.on('keypress', addItem);
});