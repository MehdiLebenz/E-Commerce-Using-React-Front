import gql from 'graphql-tag';

export const UPDATE_CARD = gql`
mutation updateProduct($ProductInput: ProductInput){
  updateProduct(input: $ProductInput){
    productName: String
    productPrice: String 
    brand: String
    description: String
    createdAt: String
    image: String
    quantity: String
  }
}


`;