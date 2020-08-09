import { ALL_BOOKS, ALL_AUTHORS } from '../queries'

const updateCacheWith = (client, bookAdded) => {
    const booksInStore = client.readQuery({ query: ALL_BOOKS })
    const bookTitles = booksInStore.allBooks.map(b => b.title)

    if (!bookTitles.includes(bookAdded.title)) {
        // Update only if book is not there already
        client.writeQuery({
            query: ALL_BOOKS,
            data: { allBooks: booksInStore.allBooks.concat(bookAdded) }
        })

        const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
        const authorNames = authorsInStore.allAuthors.map(a => a.name)
        if (!authorNames.includes(bookAdded.author.name)) {
            // If author does not exist already.
            client.writeQuery({
            query: ALL_AUTHORS,
            data: { allAuthors: authorsInStore.allAuthors.concat(bookAdded.author) }
            })
        } else {
        // If author exists.
            client.writeQuery({
            query: ALL_AUTHORS,
            data: { allAuthors: authorsInStore.allAuthors.map(a => {
                if (a.name === bookAdded.author.name) {
                    return { ...a, bookCount: a.bookCount + 1 }
                } else {
                    return a
                }
                })
            }
            })
        }
      
    }
}

export default updateCacheWith