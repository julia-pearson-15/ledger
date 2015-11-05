$(document).ready(function() {
  var $input = $('#input');
  var $logList = $('#log');

  var allTransactions = {
    purse: 1000,  
    interestRate: 15,
  }
  var debters= []; //to be filled with objects of debters  

  var Debter = function Debter() {
    this.name = '';
    this.amount = '';
  }
  Debter.prototype.inDebt = function(name, amount){
    this.name=name;
    this.amount=amount;
  }
  var getLedger = function() {
    //creat empty srting that will be response
    var ledgerPrintOut = '';
    //for each debter, detail their debts
    for (var i = 0 ; i< debters.length; i++) {
      ledgerPrintOut += debters[i].name+' owes '+debters[i].amount+' ducats'+'\n'
    };
    //send back for response
    return ledgerPrintOut;
  }
  var addInterestLedger = function() {
    for (var i = 0 ; i< debters.length; i++) {
      var inNums = parseInt(debters[i].amount);
      console.log('got here');
      inNums+=inNums*allTransactions.interestRate*.01;
      debters[i].amount=inNums;
    };  
  }
  var makeStringArray = function() {
    var sentence = $input.val();
    var words = sentence.split(' ');
    return words;
  }
  var respond = function(question){
    //setting to empty first
    var answer  = '';
    //making item I will append with answer as text
    var $answerEl = $('<li>'); 

    //this is the input made into a string  
    var prompt = makeStringArray();

    if(prompt[0]==='purse'){
      //make into class action
      $answerEl.addClass('action');
      // √ prints out balance
      answer='ShylockBot pulls out his purse containing '+allTransactions.purse+' ducats';
    }else if(prompt[0]==='loan'){
      $answerEl.addClass('action');
      //setting answer = to new info
      answer='ShylockBot gives '+prompt[1]+' '+prompt[2]+' ducats';

      //adjusting the purse
      allTransactions.purse-=prompt[2];
      
      //creating new debter object
      var newDebter = new Debter();
      //adding name and debt to their object
      newDebter.inDebt(prompt[1], prompt[2]);
      //add the new debter to the array of debters
      debters.push(newDebter);
    }else if(prompt[0]==='ledger'){
      $answerEl.addClass('response');
      answer = getLedger();
    }else if(prompt[0]==='collect' && prompt[1]==='interest'){
      $answerEl.addClass('response');
      addInterestLedger();
      answer=getLedger();
      for (var i = 0 ; i < debters.length; i++) {
        if(debters[i].name===prompt[4]){
          debters[i].amount+=debters[i].amount*allTransactions.interestRate*.01;
        }
      }      
    }else if(prompt[0]==='set'){
      $answerEl.addClass('action');
      //place holder for current interest rate
      var oldInt = allTransactions.interestRate;
      //grab interest rate from prompt
      allTransactions.interestRate=(parseInt(prompt[3]));
      answer='Shylock adjusts his interest rate from '+oldInt+'% to '+allTransactions.interestRate+'%';
    }else{
      $answerEl.addClass('action');
      //add loan back into purse
      allTransactions.purse+=prompt[1];
      //display action
      answer='Shylock opens his purse';
      //search for debter and remove this portion of their debt
      for (var i = 0 ; i < debters.length; i++) {
        if(debters[i].name===prompt[4]){
          debters[i].amount-=prompt[1];
        }
      }
    }
    $answerEl.text(answer);
    $logList.append($answerEl);
  }
  var addItem = function(event) {
    // √ console.log('listening');
    if (event.keyCode===13) {
      // √ console.log('was enter');
      var newListItem = $('<li>');
      // √ console.log($input.val());
      newListItem.text($input.val());
      newListItem.addClass('command')
      $logList.append(newListItem);
      respond($input.val());
      $input.val('');
    };
  }

  $input.on('keypress', addItem);
});
