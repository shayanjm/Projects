// Next Prime number... Stupid implementation.
var prompt = require('prompt');
var first = 0;
var next = 1;
var count = 1;

function prompting(){
  prompt.get({
    properties: {
      answer: {
        description: 'Do you want to see the next prime number?',
        pattern:/(True|False)/,
        message: 'Answer must be True or False only.'
      }
    }
  }, function (err, result){
  // Accounting for the first number using a count. Probably not the best way.
    if (result.answer === 'True'){
      if (next === 1 && count !== 1){
        next++;
      }
      
      // Deciding if the number is prime or not.
      while(next % 2 === 0){
        while(next % 3 === 0){
          next++;
        }
        next++;
      }

      // Grammatical changes because I am apparently OCD while coding.
      if (count === 1){
        console.log('The previously calculated prime number was '+first+'. the next prime number is '+next+'. You have asked to calculate prime numbers ' + count + ' time.');
      }
      else if (count > 1){
        console.log('The previously calculated prime number was '+first+'. the next prime number is '+next+'. You have asked to calculate prime numbers ' + count + ' times.');
      }

      // Tidying up at the end.
      first = next;
      count++;
      next++;

      // Ghetto recursion.
      prompted();
    }
    else{
      // A clean end.
      process.exit(0);
    }
  });
}
// Dat recursion
function prompted(){
  prompting();
}
// Genesis
prompted();