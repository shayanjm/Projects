// Next Prime number... Stupid implementation.
var prompt = require("prompt");
var async = require("async");
var first = 0;
var next = 1;
var on = true;

prompt.start();
async.whilst(
  function () { return on; },
  function (callback) {
    async.series(
      function (callback){
        prompt.get({
          properties: {
            answer: {
              description: "Do you want to see the next prime number?",
              pattern:/(True|False)/,
              message: "Answer must be True or False only."
            }
          }
        }, function (err, result){
          if (!(result.answer)){
            process.exit(0);
          }
          while(next%2==0){
            next++;
          }
          console.log("The previously calculated prime number was "+first+". The next prime number is"+next+".");
        });
        callback(null, next);
      }
      );
    setTimeout(callback, 1);
    },
  function (err) {

  }
);