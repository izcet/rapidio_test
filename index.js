/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: irhett <irhett@student.42.us>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/07/25 22:05:00 by irhett            #+#    #+#             */
/*   Updated: 2017/07/26 21:24:51 by crenfrow         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const rapid = require('rapid-io')

const api = require('./key.json')
const rapidClient = rapid.createClient(api.key)
const users = rapidClient.collection('user-list')
const transactions = rapidClient.collection('transactions-list')

function createUser (firstName, lastName) {
// Validate input here, also query to see if we have a user by this name/id already

	let id = new Date().getTime() // Lazy ID system
	rapidClient
		.collection(users.id)
		.newDocument()
		.mutate({
			firstName: firstName,
			lastName: lastName,
			userName: firstName[0] + lastName,
			balance: 0,
			id: id
		})
	.then(
		() => console.log(
			'Created user:' +
			'\nFirst: ' + firstName +
			'\nLast: ' + lastName +
			'\nUsername: ' + firstName[0] + lastName +
			'\nBalance: ' + 0,
			'\nid: ' + id
		),
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
	let id = new Date().getTime() // Lazy ID system
	rapidClient
		.collection(transactions.id)
		.newDocument()
		.mutate({
			to: to,
			from: from,
			amount: amount,
			tags: tags,
			id: id
		})
	.then(
		() => console.log(
			'Created transaction:' +
			'\nTo: ' + to +
			'\nFrom: ' + from +
			'\nAmount: ' + amount +
			'\nID: ' + id +
			'\nTags: ' + tags
		),
		err => {
			if (err) {
				switch (err.type) {
				case 'timeout': break
				case 'permission-denied': break
				}
			}
		})
}

function deleteUserByUserName(userName) {
	rapidClient
	.collection(users.id)
	.filter({ userName: userName })
	.fetch(userList => {
		for (let u in userList) {
			rapidClient
			.collection(users.id)
			.document(userList[u].id)
			.delete({ timeout: 10000 })
			.then(
				() => console.log('Deleted: ' + JSON.stringify(userList[u])),
				err => console.log(err.type)
			)
		}
		// console.log(userList)
	})
}

function logAllItemsInCollection(collectionId) {
	rapidClient
	.collection(collectionId)
	.fetch(items => {
		console.log(items)
	})
}

function deleteAllInCollection(collectionId) {
	rapidClient
	.collection(collectionId)
	.fetch(items => {
		for (let i in items) {
			rapidClient
			.collection(collectionId)
			.document(items[i].id)
			.delete({ timeout: 10000 })
			.then(
				() => console.log('Deleted: ' + items[i].id),
				err => console.log(err.type)
			)
		}
		// console.log(items)
	})
}

createUser('chris', 'renfrow')
createUser('isaac', 'rhett')
createTransaction('crenfrow', 'irhett', '1337', ['whut'])
// deleteUserByUserName('crenfrow')
// deleteAllInCollection(transactions.id)
// deleteAllInCollection(users.id)
// logAllItemsInCollection(transactions.id)
// logAllItemsInCollection(users.id)
