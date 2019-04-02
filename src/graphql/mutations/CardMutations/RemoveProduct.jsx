import gql from 'graphql-tag';
const DELETE_PRODUCT = gql `
mutation removeProduct($id : ID!){
  removeProduct(id : $id)
}


`;
export default DELETE_PRODUCT;