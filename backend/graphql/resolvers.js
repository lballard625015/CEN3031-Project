const User = require('../models/User');

const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                return await User.find();
            } catch (error) {
                throw new Error('Failed to fetch users');
            }
        }
    },
    Mutation: {
        createUser: async (_, { username, email, password, age, height, goal }) => {
            const newUser = new User({ username, email, password, age, height, goal });

            console.log(username)
            
            await newUser.save();

            return newUser;
        }
    }
};

module.exports = resolvers;
