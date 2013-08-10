  // Calculate fibonacci sequence to nth term.
  // Does not calculate big integers. Will need to fix on "real release"
  var prompt = require("prompt");

  prompt.start();
  prompt.message = "Input :"
  prompt.get({
    properties: {
      digits: {
        description: "To what term should I calculate the Fibonacci sequence?",
        pattern: /[0-9]+/,
        message: "Input must be numbers only."
      }
    }
  }, function (err, result) {
  	if (parseInt(result.digits) == 1) {
      // Passes value to fib() if value is 1. Just grammar value changes.
  		console.log("You said to calculate: " + result.digits + " term");
  		var fibRes = fib(result.digits);
  		console.log("Fibonacci result to " + result.digits + " term: " + fibRes);
  	}
  	else if (parseInt(result.digits) <= 0){
      // You must be tripping if the value is <= 0
  		console.log("You input: " + result.digits + " which is an invalid number. Input must be greater than 0.")
  	}
  	else if (parseInt(result.digits) > 1){
  	  // Passes value to fib() if value is > 1. Just grammar value changes.
  		console.log("You said to calculate: " + result.digits + " terms");
  		var fibRes = fib(result.digits);
  		console.log("Fibonacci result to " + result.digits + " terms: " + fibRes);
  	}
  });

  function fib(num, err){
  	var num1 = 0;
  	var num2 = 1;
  	var resTemp;
  	var resArray = [];
  	resArray.push(num2);
  	for(i = 1; i < num; i++){
  		resTemp = num1 + num2;
  		resArray.push(resTemp);
  		num1 = num2;
  		num2 = resTemp;

  	}
  	return resArray;
  }