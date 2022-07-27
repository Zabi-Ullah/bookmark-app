import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch'
const Client= new ApolloClient({
    link:new HttpLink({
        uri: '/.netlify/functions/mybookmarklist',
        fetch,
    }),
    cache: new InMemoryCache(),
  });
  export default Client