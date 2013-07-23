  // Calculate Pi to x digits using Leibniz formula.
  var prompt = require("prompt");
  prompt.start();
  prompt.message = "Input :"
  prompt.get({
    properties: {
      digits: {
        description: "How many digits of Pi should I calculate?"
      }
    }
  }, function (err, result) {
  	if (parseInt(result.digits) == 1) {
  		console.log("You said to calculate: " + result.digits + " digit");
  	}
  	else if (parseInt(result.digits) <= 0){
  		console.log("You input: " + result.digits + " which is an invalid number. Input must be greater than 0.")
  	}
  	else {
  		console.log("You said to calculate: " + result.digits + " digits");
  	}
  });