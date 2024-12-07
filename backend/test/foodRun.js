const fetch = require('node-fetch');

const API_URL = 'http://localhost:3050';

async function graphqlRequest(query, variables) {
    const response = await fetch(API_URL, {
        method: 'POST',   // HTTP POST method used to send GraphQL request
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    return response.json();  // this parses then return the response as JSON
}

//defines graphql mutation for creating food entry
async function createFood(userData) {
    const mutation = `
        mutation CreateFood(
            $foodName: String!,
            $amount: Int!,
            $calories: Int!,
            $protein: Int!,
            $fat: Int!,
            $carbs: Int!,
            $category: String!
        ) {
            createFood(
                foodName: $foodName,
                amount: $amount,
                calories: $calories,
                protein: $protein,
                fat: $fat,
                carbs: $carbs,
                category: $category
        
            ) {
                foodName
                amount
                calories
                protein
                fat
                carbs
                category
            }
        }
    `;
    //send mutation request and store result
    const result = await graphqlRequest(mutation, userData);
    console.log("result:"+result.data); //debugging
    return result;
}

//create food entry with provided details given
async function makeFood(foodName, amount, calories, protein, fat, carbs,category) {
    const errors = [];
    try {
        const newFood = await createFood({
            foodName,
            amount,
            calories,
            protein,
            fat,
            carbs,
            category
        });
        console.log("Food created successfully:",foodName);
    } catch (error) {
        console.error("An error occurred while creating the user:", error);
    }
}

//additional pre-made entries that will be added to database if user runs this file
makeFood("Cow's Milk", 976, 660, 32, 40, 48, "Dairy Products")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Cheese", 225, 240, 30, 11, 1, "Dairy Products")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Egg", 100, 150, 12, 12, 0, "Animal Products")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Butter", 14, 102, 0, 12, 0, "Dairy Products")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Chicken Breast", 140, 231, 43, 5, 0, "Animal Products")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Ground Beef 80% Lean", 113, 287, 19, 23, 0, "Animal Products")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Broccoli", 150, 45, 5, 0, 8, "Vegetables")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Brussel Sprouts", 130, 60, 6, 0, 12, "Vegetables")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Wheat Bread", 30, 79, 3, 1, 15, "Carbs")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Nonfat Greek Yogurt", 170, 100, 17, 0, 6, "Dairy Products")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Rice", 158, 206, 4, 0, 45, "Carbs")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Pasta", 57, 75, 3, 1, 14, "Carbs")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Banana", 118, 110, 1, 0, 28, "Fruit")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Peanut Butter", 32, 188, 8, 16, 6, "Condiments")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Cheat Meal (Aldi Chocolate Molten Lava Cake)", 90, 345, 6, 19, 36, "Heaven")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));

makeFood("Peanuts", 146, 828, 38, 72, 24, "Legumes")
    .then(() => console.log("Registration process completed."))
    .catch(error => console.error("Error in registration process:", error));



module.exports = makeFood;
