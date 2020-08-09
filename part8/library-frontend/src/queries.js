import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    id
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const BOOKS_BY_GENRE = gql`
query ($genre: String!) {
  allBooks (genre: $genre) {
    title
    published
    author {
      name
    }
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    id
    born
    bookCount
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
  }
}
`

export const LOGIN = gql`
mutation ($username: String!, $password: String!) {
  login (username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favouriteGenre
    id
  }
}
`