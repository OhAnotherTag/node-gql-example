import { ApolloServer, PubSub } from "apollo-server";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils/jwt";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import Link from "./resolvers/Link";
import User from "./resolvers/User";

const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf-8"
);

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
};

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
