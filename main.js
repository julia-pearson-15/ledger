$(document).ready(function() {
  var $input = $('#input');
  var $logList = $('#log');
  var purseBal = 1000;
  var ledgerList = '';
  var interestRate = .15;


  var makeStringArray = function() {
    var stringed = $input.val();
    var words = stringed.split(' ');
    return words;
  }

  var makeString = function(arrayTime) {
    var toString ='';
    for (var i = 0; i<arrayTime.length; i++) {
      toString+=' '+arrayTime[i];
    };
    return toString;
  }

  var getInterest = function() {
    var addingI = ledgerList.split(' ');
    for (var i = 3; i<addingI.length; i=i+5) {
      console.log(addingI[i]);
      addingI[i]=parseInt(addingI[i])+parseInt(addingI[i])*interestRate;
      console.log(addingI[i]);
    };
    return makeString(addingI);
  }


  var respond = function(question){
    var answer  = '';
    var newList = $('<li>');    
    var questions = makeStringArray();
    if(questions[0]==='purse'){
      newList.addClass('action');
      answer='ShylockBot pulls out his purse containing '+purseBal+' ducats';
    }else if(questions[0]==='loan'){
      newList.addClass('action');
      answer='ShylockBot gives '+questions[1]+' '+questions[2]+' ducats';
      purseBal-=questions[2];
      ledgerList +=questions[1]+' owes me '+questions[2]+' ducats, ';
    }else if(questions[0]==='ledger'){
      newList.addClass('response');
      answer = ledgerList;
      console.log(ledgerList);
    }else if(questions[0]==='collect' && questions[1]==='interest'){
      newList.addClass('response');
      answer = getInterest();
      //ledgerList = answer;
    }else if(questions[0]==='set'){
      var oldInt = interestRate;
      interestRate=(.01*parseInt(questions[3]));
      newList.addClass('action');
      answer='Shylock adjusts his interest rate from '+oldInt+'% to '+interestRate+'%';
    }else{
      purseBal+=questions[1];
      newList.addClass('action');
      answer='Shylock opens his purse';
      var adjustDebt = function(){
        for (var i = 0 ; i < ledgerList.length; i++) {
          if (ledgerList[i]===questions[4]){
            ledgerList[i+3];
          }
        };
      };
      adjustDebt();
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