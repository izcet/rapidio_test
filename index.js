/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: irhett <irhett@student.42.us>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/07/25 22:05:00 by irhett            #+#    #+#             */
/*   Updated: 2017/07/25 22:17:12 by crenfrow         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const rapid = require('rapid-io')

const api = require('./key.json')
const rapidClient = rapid.createClient(api.key)
const userList = rapidClient.collection('user-list')

function createUser (firstName, lastName) {
// Validate input here, also query to see if we have a user by this name/id already

	let id = new Date().getTime() // Lazy ID system
	rapidClient
		.collection(userList.id)
		.newDocument()
		.mutate({
			firstName: firstName,
			lastName: lastName,
			id: id
		})
	.then(
		() => console.log('success'),
		err => {
			if (err) {
				switch (err.type) {
				case 'timeout': break
				case 'permission-denied': break
				}
			}
		})
}

function createTransaction (to, from, amount, tags) {
    // Insert input validation and query logic here
	let transId = new Date().getTime() // Lazy ID system for testing
	return ({
		to: to,
		from: from,
		amount: amount,
		id: transId
	})
}

// createUser('chris', 'renfrow')
// createUser('isaac', 'rhett')

rapidClient
    .collection(userList.id)
    .fetch(users => {
        // TODO: process to-dos
	console.log(users)
})

/*
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
*/
