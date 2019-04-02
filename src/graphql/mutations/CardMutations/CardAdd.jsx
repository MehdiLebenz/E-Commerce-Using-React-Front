import gql from 'graphql-tag';

export const ADD_CARD = gql`
mutation addProduct($ProductInput: ProductInput){
  addProduct(input: $ProductInput){
    productName
    productPrice
    brand
    description
    createdAt
    image
    quantity
  }
}


`;