const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {

    // The user did not provide sufficient parameters.
    console.log('Please provide sufficient parameters.')
    process.exit(1)

}

// Connect to the mongoDB atlas.
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-yrtmu.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

// Define person schema.
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    
    // Fetch the records.
    Person.find({})
    .then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
    .catch(error => {
        console.log(`An error occurred: ${error}`)
    })

} else if (process.argv.length == 5) {
    
    // Add the passed data to the db.
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    newPerson.save()
    .then(result => {
        console.log(`Added ${result.name}, number: ${result.number} to phonebook.`)
        mongoose.connection.close()
    })
    .catch(error => {
        console.log(`An error occurred: ${error}`)
    })

}