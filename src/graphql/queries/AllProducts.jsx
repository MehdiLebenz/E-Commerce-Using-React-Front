import gql from 'graphql-tag';
export default gql`
query allProducts{
  products{
    id
    productName
    productPrice
    image
    description
    createdAt
    brand
    quantity

  }
}
`;