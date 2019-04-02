import gql from 'graphql-tag';

export const ADD_USER = gql`
  mutation addUser($UserInput: UserInput){
    addUser(input: $UserInput){
      firstName
      lastName
      email
      password
      createdAt
    }
  }
`;
export const UPDATE_USER = gql`
  mutation addUser($UserInput: UserInput){
    addUser(input: $UserInput){
      firstName
      lastName
      email
      password
      createdAt
    }
  }
`;
export const USER_INFO = gql`
query users($UserInput: UserInput){
  users(input: $UserInput){
    firstName
    lastName
    email
    password
    createdAt
}
}
`;