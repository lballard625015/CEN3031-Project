const User = require('../models/User');
const Workouts = require('../data/Workouts');

const resolvers = {
    Query: {
        getUser: async (_, {username}) => {
            const user = await User.findOne({username});
            return !!user;
        },

        getUserData: async (_, {username}) => {
            const user = await User.findOne({username});
            return user;
        },

        getEmail: async(_, {email}) => {
            const emailExists = await User.findOne({email});
            return !!emailExists;
        },

        getPassword: async(_, {password}) => {
            const passwordExists = await User.findOne({password});
            return !!passwordExists;
        },

        getWorkout: async(_, {username}) => {
            const user = await User.findOne({username});
            console.log(user.workouts);
            return user.workouts;
        }
    },
    Mutation: {
        createUser: async (_, { username, email, password, age, height, goal }) => {
            const newUser = new User({ username, email, password, age, height, goal });

            console.log(username)

            newUser.workouts = Workouts[goal];
            await newUser.save();

            return newUser;
        }
    }
};

module.exports = resolvers;
