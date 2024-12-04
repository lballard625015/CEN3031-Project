const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
        console.error(err); // Log detailed error
        return err;
    }
});

mongoose.connect("mongodb+srv://oscarluisdf21:U0CcRmJqCCTlGCPx@testcluster.i8jfr.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster", { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });
