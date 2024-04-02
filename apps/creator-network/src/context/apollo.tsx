import "@rainbow-me/rainbowkit/styles.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://3.87.189.32:3000/graphql',
});

export function AppProvider(props: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}