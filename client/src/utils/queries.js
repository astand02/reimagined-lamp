import { gql } from "@apollo/client"
export const QUERY_ME = gql`
query Me {
    me {
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }`

