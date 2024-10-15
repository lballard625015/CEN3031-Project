const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!,
        username: String!,
        email: String!,
        password: String!,
        age: Int!,
        height: Int!,
        goal: String!

    }
    type Query {
        getUsers: [User]
    }
    type Mutation {
        createUser(
            username: String!,
            email: String!,
            password: String!,
            age: Int!,
            height: Int!,
            goal: String!
            ): User
    }
`;

module.exports = typeDefs;
