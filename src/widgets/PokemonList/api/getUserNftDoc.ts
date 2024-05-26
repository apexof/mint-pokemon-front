import { gql } from 'graphql-request'

export const getUserNftDoc = gql`
  query getUserNft($account: String!) {
    user(id: $account) {
      id
      pokemons {
        id
      }
    }
  }
`
