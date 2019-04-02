import gql from 'graphql-tag';
export default gql `
query users{
  users{
    firstName
    lastName
    email
    createdAt
  }
}

`;