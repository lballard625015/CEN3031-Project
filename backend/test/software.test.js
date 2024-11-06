const mongoose = require('mongoose');
const resolvers = require('../graphql/resolvers');
const User = require('../models/User');

beforeAll(async () => {
    await mongoose.connect("mongodb+srv://oscarluisdf21:U0CcRmJqCCTlGCPx@testcluster.i8jfr.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Clear only test-specific documents before each test
beforeEach(async () => {
    await User.deleteMany({ username: /testuser/ }); // Only delete users with "testuser" in the username
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('getUser returns true if user exists', async () => {
    await new User({
        username: "testuser1",
        email: "testuser1@example.com",
        password: "TestPassword123",
        age: 25,
        height: 175,
        goal: "Muscle Gain"
    }).save();

    const result = await resolvers.Query.getUser(null, { username: "testuser1" });
    expect(result).toBe(true);
});

test('getUser returns false if user does not exist', async () => {
    const result = await resolvers.Query.getUser(null, { username: "nonexistent" });
    expect(result).toBe(false);
});

test('getUserData returns user data', async () => {
    await new User({
        username: "testuser2",
        email: "testuser2@example.com",
        password: "TestPassword123",
        age: 25,
        height: 175,
        goal: "Muscle Gain"
    }).save();

    const result = await resolvers.Query.getUserData(null, { username: "testuser2" });
    expect(result).toHaveProperty("username", "testuser2");
    expect(result).toHaveProperty("email", "testuser2@example.com");
});

test('getEmail returns true if email exists', async () => {
    await new User({
        username: "testuser3",
        email: "testuser3@example.com",
        password: "TestPassword123",
        age: 25,
        height: 175,
        goal: "Muscle Gain"
    }).save();

    const result = await resolvers.Query.getEmail(null, { email: "testuser3@example.com" });
    expect(result).toBe(true);
});

test('getEmail returns false if email does not exist', async () => {
    const result = await resolvers.Query.getEmail(null, { email: "nonexistent@example.com" });
    expect(result).toBe(false);
});

test('getPassword returns true if password exists', async () => {
    await new User({
        username: "testuser4",
        email: "testuser4@example.com",
        password: "TestPassword123",
        age: 25,
        height: 175,
        goal: "Muscle Gain"
    }).save();

    const result = await resolvers.Query.getPassword(null, { password: "TestPassword123" });
    expect(result).toBe(true);
});

test('getPassword returns false if password does not exist', async () => {
    const result = await resolvers.Query.getPassword(null, { password: "WrongPassword" });
    expect(result).toBe(false);
});

test('createUser creates a new user and returns it', async () => {
    const newUser = {
        username: "testuser6",
        email: "testuser6@example.com",
        password: "NewPassword123",
        age: 30,
        height: 180,
        goal: "Weight Loss"
    };

    const result = await resolvers.Mutation.createUser(null, newUser);
    expect(result).toHaveProperty("username", "testuser6");
    expect(result).toHaveProperty("email", "testuser6@example.com");
});
