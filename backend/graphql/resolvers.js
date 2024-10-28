const User = require('../models/User');

const resolvers = {
    Query: {
        getUser: async (_, {username}) => {
            const user = await User.findOne({username});
            return !!user;
        },

        getEmail: async(_, {email}) => {
            const emailExists = await User.findOne({email});
            return !!emailExists;
        },

        getPassword: async(_, {password}) => {
            const passwordExists = await User.findOne({password});
            return !!passwordExists;
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
