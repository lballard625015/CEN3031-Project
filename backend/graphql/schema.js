const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!,
        username: String!,
        email: String!,
        password: String!,
        age: Int!,
        height: Int!,
        goal: String!,
        workouts: [Workout]
    }

    type Workout {
        name: String!,
        workout: [Exercise]
    }

    type Exercise {
        name: String!,
        sets: Int!,
        reps: Int!
    }

    type Food {
        foodName: String!,
        amount: Int!,
        calories: Int!,
        protein: Int!,
        fat: Int!,
        carbs: Int!,
        category: String!,
    }

    type Query {
        getUser(username: String!): Boolean,
        getUserData(username: String!): User,
        getEmail(email: String!): Boolean,
        getPassword(password: String!): Boolean,
        getWorkout(username: String!): [Workout]
        getAllFoods: [Food!]!    }

    type Mutation {
        createUser(
            username: String!,
            email: String!,
            password: String!,
            age: Int!,
            height: Int!,
            goal: String!
        ): User,
        createFood(
            foodName: String!,
            amount: Int!,
            calories: Int!,
            protein: Int!,
            fat: Int!,
            carbs: Int!,
            category: String!,
        ):Food
    }
`;

module.exports = typeDefs;
