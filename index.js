// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   index.js                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: irhett <irhett@student.42.us.org>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2017/07/25 22:05:00 by irhett            #+#    #+#             //
//   Updated: 2017/07/25 22:11:42 by irhett           ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const rapid = require("rapid-io");
const api = require("./api.key.json");
const rapidClient = rapid.createClient(api.key);

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

var user = makePerson("current", "user");

var foo = makePerson("billy", "bob");
var bar = makePerson("bobby", "bill");

const transactions = rapidClient.collection('transactions');




var trans = makeTransaction(foo, bar, 100, []);

console.log(foo.toString());
console.log(bar.toString());
console.log(trans.toString());


