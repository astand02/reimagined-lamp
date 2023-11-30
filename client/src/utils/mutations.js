import { gql } from "@apollo/client"
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id 
        username
      }
    }
  }`

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }`

export const SAVE_BOOK = gql`
mutation SaveBook($book: BookInput) {
    saveBook(book: $book) {
      username
      savedBooks {
        title
      }
    }
  }`

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      savedBooks {
        title
      }
    }
  }`