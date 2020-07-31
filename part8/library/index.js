const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const USER_PASSWORD = 'password'
const JWT_SECRET = 'JWT_SECRET'

const MONGO_URI = `mongodb+srv://fullstack:${'sipun'}@cluster0-yrtmu.mongodb.net/${'library'}?retryWrites=true&w=majority`
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB: ', err)
  })

const typeDefs = gql`
  type Genre {
    genre: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
      username: String!
      favouriteGenre: String!
      id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async(root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author._id })
      return books.length
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    
    authorCount: () => Author.collection.countDocuments(),
    
    allBooks: async(root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: author._id, genres: { $in: args.genre } }).populate('author')
      }
      
      if (args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
        return books
      }
      
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: author._id }).populate('author')
      }

      return await Book.find({}).populate('author')
    },

    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },

  Mutation: {
    addBook: async(root, args, context) => {
      
      if (!context.currentUser) {
        throw new UserInputError('Unauthorized access')
      }

      const author = await Author.find({ name: args.author })
      let newAuthor = null
      if (author.length <= 0) {
        newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      } else {
        [ newAuthor ] = author
      }

      const newBook = new Book({ 
        title: args.title,
        published: args.published,
        author: newAuthor,
        genres: args.genres
      })
      
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return newBook.populate('author')
    },

    editAuthor: async(root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('Unauthorized access')
      }

      const authorToChange = await Author.findOne({ name: args.name })
      if (authorToChange) {
        authorToChange.born = args.setBornTo
        try {
          authorToChange.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        return authorToChange
      }
      throw new UserInputError('Author does not exist', {
        invalidArgs: args.author
      })
    },

    createUser: async(root, args) => {
      const newUser = new User({ ...args })
      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return newUser
    },

    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })
      
      if (!user || args.password !== USER_PASSWORD) {
        throw new UserInputError('invalid credentials', {
          invalidArgs: args
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})