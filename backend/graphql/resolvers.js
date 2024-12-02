const User = require('../models/User');
const Workouts = require('../data/Workouts');
const Food = require('../models/food');
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
        },

        getAllFoods: async() => {
            const food = await Food.find();
            console.log(food.foodName);
            return food;
        }

    },
    Mutation: {
        createUser: async (_, { username, email, password, age, height, goal }) => {
            const newUser = new User({ username, email, password, age, height, goal });

            console.log(username)

            newUser.workouts = Workouts[goal];
            await newUser.save();

            return newUser;
        },

        createFood: async (_, { foodName, amount, calories, protein, fat, carbs, category }) => {
            const newFood = new Food({ foodName, amount, calories, protein, fat, carbs, category });

            console.log(foodName)

            await newFood.save();

            return newFood;
        }
    }
};

module.exports = resolvers;
