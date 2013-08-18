  // Calculate Pi to x digits using Chudnovsky Algo. Fast as holy hell.
var prompt = require('prompt');
var mpz = require('bigint');
var bignum = require('bigint');
var _ = require('underscore');
var microtime = require('microtime');

// Basic debug boolean. If true, debug mode.
var app_opt = {
    debug: false
};

// Prompt set up. Prompts the user for an input for # of digits
prompt.start();
prompt.message = 'Input :'
prompt.get({
  properties: {
    digits: {
      description: 'How many digits of Pi should I calculate?',
      pattern: /[0-9]+/,
      message: "Input must be numbers only."
      }
    }
  }, function (err, result) {
    if (parseInt(result.digits) == 1) {
      // Passes value to pi_chudnovsky_bs if value is 1
      console.log("You said to calculate: " + result.digits + " digit");
      var num = pi_chudnovsky_bs(result.digits - 1);
      console.log("Pi result to " + result.digits + " digit: " + num);
    }
    else if (parseInt(result.digits) > 1 && parseInt(result.digits) <= 15){
      // If value is <= 15, we could get away with being "accurate" (putting a decimal in)
      console.log("You said to calculate: " + result.digits + " digits");
      var rawNum = pi_chudnovsky_bs(result.digits - 1);
      var num = rawNum / Math.pow(10,result.digits-1);
      console.log("Pi result to " + result.digits + " digits: " + num);
    }
    else if (parseInt(result.digits) <= 0){
      // You must be triping if the value is <= 0
      console.log("You input: " + result.digits + " which is an invalid number. Input must be greater than 0.")
    }
    else if (parseInt(result.digits) > 15){
      // If the value is > 15, we have to remove the decimal. Why? Because any spec. over 15 concats. 
      // We have to remove the decimal and make it an int in order to print ALL of the values specified (max digits for int is +/- 9007199254740992)
      console.log("You said to calculate: " + result.digits + " digits");
      var num = pi_chudnovsky_bs(result.digits - 1);
      console.log("Pi result to " + result.digits + " digits: " + num);
    }
  });

function log() {
    "use strict";
    if (app_opt.debug) {
        console.log.apply(this, ["[DEBUG] - ".concat(arguments[0])]);
    }
}

function logError() {
    "use strict";
    var new_args = arguments;
    new_args[0] = "[ERROR] - ".concat(arguments[0]);
    console.log.apply(this, new_args);
}

function pi_chudnovsky_bs(digits) {
    var C = 640320;
    var C3_OVER_24 = bignum(Math.floor(Math.pow(C, 3) / 24));

    log('C: %s', C);
    log('C3_OVER_24: %s', C3_OVER_24);

    var bs = function(a, b) {
        log(' bs ==> %s, %s', a, b);
        var Pab, Qab, Tab;
        var Pam, Qam, Tam;
        var Pmb, Qmb, Tmb;

        if ( (b - a) == 1) {
            if (a == 0) {
                Qab = mpz(1);
                Pab = Qab;
            }
            else {
                log('else');
                //Pab = mpz((6*a-5)*(2*a-1)*(6*a-1))
                //Qab = mpz(a*a*a*C3_OVER_24)

                var a1 = bignum(6).mul( bignum(a)).sub(5);
                var a2 = bignum(2).mul( bignum(a)).sub(1);
                var a3 = bignum(6).mul( bignum(a)).sub(1);

                log('a[1-3] set');

                Pab = a1.mul(a2).mul(a3);
                Qab = bignum(a).pow(3).mul(C3_OVER_24);
            }

            log('Pab:[%s]', Pab);
            log('Qab:[%s]', Qab);

            Tab = Pab.mul( bignum(13591409).add( bignum(545140134).mul(a) ));
            log('Tab:[%s]', Tab);

            log('inverse??? %s', a);
            if ( a & 1 ) {
                log('Doing inverse');
                log('Tab pre:[%s]:', Tab);
                Tab = Tab.mul(-1);
                log('Tab inv:[%s]:', Tab);
            }
        }
        else {
            var tempMab = bignum(a).add(b);
            var m = tempMab.div(2);
            log('m:[%s]', m);

            log('----z1---- %s, %s', a, m);
            var z1 = bs(a, m);
            log('z1(%s, %s) aka array1:[%s]', a,m,z1);
            Pam = z1[0];
            Qam = z1[1];
            Tam = z1[2];

            log('----z2---- %s, %s', m, b);
            var z2 = bs(m, b);
            log('z2(%s, %s) aka array1:[%s]', m,b,z2);
            Pmb = z2[0];
            Qmb = z2[1];
            Tmb = z2[2];

            //Pab = Pam * Pmb
            //Qab = Qam * Qmb
            //Tab = Qmb * Tam + Pam * Tmb
            Pab = bignum(Pam).mul(Pmb);
            Qab = bignum(Qam).mul(Qmb);
            var tempQT = Qmb.mul(Tam);
            var tempPT = Pam.mul(Tmb);
            //Tab = bignum(bignum(Qmb).mul(Tam)).add(  );
            log('----- POSSIBLE -----');
            log('Qmb * Tam = %s', tempQT);
            log('Qmb was: %s', Qmb);
            log('Tam was: %s', Tam);

            log('Pam * Tmb = %s', tempPT);
            log('Pam was: %s', Pam);
            log('Tmb was: %s', Tmb);
            Tab = tempPT.add(tempQT);
        }

        log('about to return array %s', [Pab, Qab, Tab]);
        return [Pab, Qab, Tab];
    };

    var DIGITS_PER_TERM = Math.log( ((C3_OVER_24/6)/2)/6) / Math.LN10;
    log('DIGITS Per Term set %s', DIGITS_PER_TERM);

    //var N = bignum(digits).div(DIGITS_PER_TERM);//.add(1);
    var N = Math.floor(digits/DIGITS_PER_TERM) + 1;
    log('N is set %s', N);

    var P, Q, T;
    var initialBS = bs(0, N);
    log('Initial BS set');

    P = initialBS[0];
    log('P=%s', P);

    Q = initialBS[1];
    log('Q=%s', Q);

    T = initialBS[2];
    log('T=%s', T);

    var one_squared = mpz(10).pow(2*digits);
    log('one_squared set');

    var sqrtC = bignum(10005).mul(one_squared).sqrt();
    log('sqrtC found %s', sqrtC);

    var retVal = bignum(Q).mul(426880);
    log('retVal [0] = %s', retVal);

    retVal = retVal.mul(sqrtC);
    log('retVal [1] = %s', retVal);

    //retVal = retVal.div(T);
    retVal = retVal.sub(retVal.mod(1)).div(T);
    log('retVal [2] = %s', retVal);
    
    log('retVal set');

    return retVal;
}