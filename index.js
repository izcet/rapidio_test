const rapid = require("rapid-io");
const api = require("./api.key.json");
const rapidClient = rapid.createClient(api.key);
//console.log(api.key);

function makePerson(fname, lname) {
	var person = {
		"firstName" : fname,
		"lastName" : lname,
		"toString" : function(){
			return (this.firstName + " " + this.lastName);
		}
	};
	return person;
}

function makeTransaction(person1, person2, amount, tags) {
	var transaction = {
		"from" : person1,
		"to" : person2,
		"value" : amount,
		"tags" : tags,
		toString : function() {
			return (this.from.toString() + " sent " + this.to.toString() + " $" + this.value);
		}
	};
	return transaction;
}

var foo = makePerson("billy", "bob");

var bar = makePerson("bobby", "bill");

var trans = makeTransaction(foo, bar, 100, []);

console.log(foo.toString());
console.log(bar.toString());
console.log(trans.toString());
		
