// Next Prime number... Stupid implementation.
var prompt = require("prompt");
var prompt2 = require("prompt");

prompt.start();
  prompt.message = "Input :"
  prompt.get({
    properties: {
      answer: {
        description: "Do you want to see the first prime number?",
        pattern:/(True|False)/,
        message: "Answer must be True or False only."
      }
    }
  }, function (err, result) {
  	var first = 0;
  	var next = 0;
  	var on;
  	if (result.answer) {
      on = true; // set "on" to True.
      while(next%2==0){ // Calculate next prime number
        next++;
      }
      console.log("The previously calculated prime number was "+ first + ". The next prime number is " + next + ".");
      prompt.start();

  	}
  	while(on){
  		while(next%2==0){
  			next++;
  		}
      console.log("The previously calculated prime number was "+ first + ". The next prime number is " + next + ".");
  	}
  	// console.log("The previously calculated prime number was "+ first + ". The next prime number is " + next + ".");
  });