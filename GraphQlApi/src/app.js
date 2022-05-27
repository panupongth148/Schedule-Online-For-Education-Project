import { createServer } from 'http';

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground, gql } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

import './mongoose-connect';
import jsonwebtoken from 'jsonwebtoken'

import schema from './graphql';

const app = express();
app.use(cors({ origin: [process.env.CORS_ORIGIN], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ message: 'Server running' });
});

const startApolloServer = async () => {
  const httpServer = createServer(app);
  const apolloServer = new ApolloServer({
    
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req }) => {
      const { cookies, headers } = req
      let token = null
      if (cookies?.token) {
        token = cookies?.token
      }
      if (headers?.authorization?.split(' ')?.[0] === 'Bearer') {
        // Authorization: Bearer TOKEN
        // Authorization: Basic username:password
        token = headers?.authorization?.split(' ')?.[1]
      }
      if (token) {
        const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        console.log(payload)
        return { userId: payload.userId }
      }
      return { userId: null }
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql', cors: { origin: [process.env.CORS_ORIGIN], credentials: true } });
  httpServer.listen({ port: 3001 });
  console.log("Server running at: http://localhost:3001/graphql");
};

startApolloServer();