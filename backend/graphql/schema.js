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

    type Exercise {
        name: String!,
        sets: Int!,
        reps: Int!
    }

    type Workout {
        name: String!,
        workout: [Exercise]
    }

    input ExerciseInput {
        name: String!,
        sets: Int!,
        reps: Int!
    }

    type Query {
        getUser(username: String!): Boolean,
        getEmail(email: String!): Boolean,
        getPassword(password: String!): Boolean,
        getExercises: [Exercise],
        getWorkouts: [Workout]
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

        createExercise(
            name: String!,
            sets: Int!,
            reps: Int!
        ): Exercise

        createWorkout(
            name: String!,
            workout: [ExerciseInput]
        ): Workout
    }
`;

module.exports = typeDefs;
