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

function createTransaction (to, from, amount) {
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
