// Prime Factorization using Quadratic Sieve method
var prompt = require("prompt");

prompt.start();
  prompt.message = "Input :"
  prompt.get({
    properties: {
      digits: {
        description: "What integer shall I factor?",
        pattern: /[0-9]+/,
        message: "Input must be numbers only."
      }
    }
  }, function (err, result) {
  	if (parseInt(result.digits) > 0) {
  		console.log("You said to calculate the prime factors of: " + result.digits + ".");
  		var factors = primeFactor(result.digits);
  		console.log("Factors of " + result.digits + ": " + factors);
  	}
  	else{
  		console.log("Error with input. Please try again.");
  	}
  });

function primeFactor(num){
	var factors = [];
	var d = 2;

	while(num > 1){
		while(num % d == 0){
			factors.push(d);
			num = num / d;
		}
		d = d + 1;
		if ((d*d)>num){
			factors.push(num);
		}
	}
	return factors;
}