// This seems way too easy. I'm probably not accounting for something.
var prompt = require('prompt');

prompt.start();
var schema = {
	properties: {
		length: {
			description: 'How long is the room (in feet)?',
			pattern: /[0-9]/, // RegEx selection for feet + decimal.
			message: 'Input must be in format xx.yy (feet)'
		},
		width: {
			description: 'How wide is the room (in feet)?',
			pattern: /[0-9]/, //RegEx selection for feet + decimal.
			message: 'Input must be in format xx.yy (feet)'
		},
		price: {
			description: 'How much does each tile cost per square ft.?',
			pattern: /[0-9]/, // RegEx selection for price
			message: 'Input must be in format $xx.yy (a price)'
		}

	}
}
prompt.get(schema, function (err, result) {
	var length = result.length;
	var width = result.width;
	var price = result.price;

	var area = length * width;
	var total = area * price;
	
	console.log('The total cost to tile a room of dimensions ' + length + ' ft. long & '+ width + ' ft. wide is $'+ total +'.')
});