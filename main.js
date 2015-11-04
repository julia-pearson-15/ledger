$(document).ready(function() {
  var $input = $('#input');
  var $logList = $('#log');
  var purseBal = 1000;

  var makeStringArray = function() {
    var stringed = $input.val();
    var words = stringed.split(' ');
    return words;
  }
  // var checkIfLoan = function() {
  //   if ($input.val().charAt(0)==='l') {
  //     if ($input.val().charAt(0)==='o') {
  //       if ($input.val().charAt(0)==='a') {
  //         if ($input.val().charAt(0)==='n') {
  //           return true;
  //         }; 
  //       };  
  //     };  
  //   };
  // }

  var respond = function(question){
    var answer  = '';
    var newList = $('<li>');    
    var questions = makeStringArray();
    if(questions[0]==='purse'){
      newList.addClass('action');
      answer='ShylockBot pulls out his purse containing '+purseBal+' ducats';
    }else if(questions[0]==='loan'){
      newList.addClass('action');
      answer='ShylockBot gives'+questions[1]+' '+questions[2]+' ducats';
      purseBal-=questions[2];
    }else{

    }
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
      newList.addClass('command')
      $logList.append(newList);
      respond($input.val());
      $input.val('');
    };
  }



  $input.on('keypress', addItem);
});