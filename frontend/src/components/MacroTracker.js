import React, { useEffect, useState } from "react";
import '../css/MacroTracker.css';
import { useQuery, gql, useMutation } from "@apollo/client";
import { Chart } from "react-google-charts";

function MacroTracker() {
    // stating variables for tracking user macros and their totals
    let [calories, setCalories] = useState(0);
    let [protein, setProtein] = useState(0);
    let [fat, setFat] = useState(0);
    let [carbs, setCarbs] = useState(0);
    //tracks if data has been loaded from the local storage to prevent the website reloading unnecessarily
    let [firstLoaded, setFirstLoaded] = useState(false);
    if (localStorage.getItem("calories") != null && !firstLoaded) {
        //load the previously saved macros from the local storage
        setCalories(JSON.parse(localStorage.getItem("calories")));
        setProtein(JSON.parse(localStorage.getItem("protein")));
        setFat(JSON.parse(localStorage.getItem("fat")));
        setCarbs(JSON.parse(localStorage.getItem("carbs")));

        setFirstLoaded(true);
    }
    //state for modal visibility and new food form inputs, keeps track of window
    const [showModal, setShowModal] = useState(false);
    const [newFood, setNewFood] = useState({
        foodName: "",
        amount: 0,
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        category: "",
    });
    //graphql query to fetch all food items
    const GET_FOODS = gql`
        query {
            getAllFoods {
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
    //graphql mutation to create a new food item
    const CREATE_FOOD = gql`
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
            }
        }
    `;
    //fetching data using query then using mutation hook to create new food item
    
    const { data, loading, error } = useQuery(GET_FOODS);
    const [createFood] = useMutation(CREATE_FOOD, {
        refetchQueries: [{ query: GET_FOODS }], //automatically refreshed food list here
    });
    //add the selected food's macros and info to user total
    function addCalories(index) {
        setCalories(calories + data.getAllFoods[index].calories);
        setProtein(protein + data.getAllFoods[index].protein);
        setFat(fat + data.getAllFoods[index].fat);
        setCarbs(carbs + data.getAllFoods[index].carbs);
    }
    //allow reset for new day
    function newDay() {
        setCalories(0);
        setProtein(0);
        setFat(0);
        setCarbs(0);
    }

    useEffect(() => {
        localStorage.setItem("calories", JSON.stringify(calories));
        localStorage.setItem("protein", JSON.stringify(protein));
        localStorage.setItem("fat", JSON.stringify(fat));
        localStorage.setItem("carbs", JSON.stringify(carbs));
    });

    //update state for new food form inputs
    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewFood({
            ...newFood,
            [name]: name === "amount" || name === "calories" || name === "protein" || name === "fat" || name === "carbs"
                ? parseInt(value, 10) || 0 // parsing integers to ensure custom created foods have valid type
                : value,
        });
    }

    async function handleCreateFood() {
        try {
            console.log(newFood);
            let {amount,calories,carbs,category,foodName,fat,protein} = newFood;
            console.log(calories);
            calories = parseInt(calories);
            carbs = parseInt(carbs);
            fat = parseInt(fat);
            protein = parseInt(protein);
            amount = parseInt(amount);
            await createFood({ variables: { amount, calories,carbs,category,foodName,fat,protein } });

            setShowModal(false);
        } catch (err) {
            console.error("Error creating food:", err);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    //data for macro pie chart
    const graphData = [
        ["Food", "Proportion"],
        ["Protein", protein],
        ["Fat", fat],
        ["Carbs", carbs],
    ];

    const options = {
        title: "Your Macro Chart for Today:",  //chart title
    };


    //rendering macro tracker component
    return (
        <div className="macro-tracker">
            <div className="leftside">
                <h1>-Foods-</h1>
                <ul>
                    {data.getAllFoods.map((food, index) => (
                        <div className="foodItem" key={index} onClick={() => addCalories(index)}>
                            <strong>{food.foodName}</strong> - {food.amount}g, {food.calories} calories
                            <br />
                            Protein: {food.protein}g, Fat: {food.fat}g, Carbs: {food.carbs}g, Category: {food.category}
                        </div>
                    ))}
                </ul>
            </div>
            <div className="rightside">
                <h1>-Your Nutrition Breakdown-</h1>
                <p>Current Calories: {calories}</p>
                <p>Current Protein: {protein}</p>
                <p>Current Fat: {fat}</p>
                <p>Current Carbs: {carbs}</p>
                <Chart
                    chartType="PieChart"
                    data={graphData}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                />
                <button onClick={newDay}>New Day</button>
                <button onClick={() => setShowModal(true)}>Add Food</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create New Food</h2>
                        <form>
                            <input
                                type="text"
                                name="foodName"
                                placeholder="Food Name"
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount (g)"
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="calories"
                                placeholder="Calories"
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="protein"
                                placeholder="Protein (g)"
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="fat"
                                placeholder="Fat (g)"
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="carbs"
                                placeholder="Carbs (g)"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                onChange={handleInputChange}
                            />
                            <button type="button" onClick={handleCreateFood}>
                                Submit
                            </button>
                            <button type="button" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MacroTracker;
