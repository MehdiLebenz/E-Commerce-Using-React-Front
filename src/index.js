import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import Routers from './router';
import './index.css'



const onError = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
};



console.log('ooooooooooo', process.env);
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  clientState: {
    defaults: {
      isConnected: false,
      basket: [],
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected }});
          return null;
        },
        addToBasket: (_, { item }, { cache }) => {
          const query = gql`
          query basketitems{
            basket @client{
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
          const basketItems = cache.readQuery({ query });
          // console.log('B', basketItems);
          // console.log('item', item);
          basketItems.basket.push(item);
          cache.writeData({data: {basket: basketItems.basket}});
          return null;
        }
      },
    },
  },
  request: (operation) => {
    const token = localStorage.getItem('jwToken');
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
 
  onError
});

ReactDOM.render(
  <ApolloProvider client={client}>
  <BrowserRouter>
    <Routers />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
