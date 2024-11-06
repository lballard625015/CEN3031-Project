import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ExerciseCard from './ExerciseCard'; 
import '../css/Home.css' // Import the ExerciseCard component

const GET_WORKOUT = gql`
    query GetWorkout($username: String!) {
        getWorkout(username: $username) {
            name
            workout {
                name
                sets
                reps
            }
        }
    }
`;

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Home() {
    const username = localStorage.getItem("username");
    const { data, loading, error } = useQuery(GET_WORKOUT, { variables: { username } });
    const [weeklyExercises, setWeeklyExercises] = useState({
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
    });

    useEffect(() => {
        if (data) {
            // Distribute exercises across the days of the week
            const exercisesByDay = { Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] };
            data.getWorkout.forEach(workout => {
                workout.workout.forEach(exercise => {
                    // Assign each exercise to a random day of the week
                    const randomDay = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)];
                    exercisesByDay[randomDay].push(exercise);
                });
            });
            setWeeklyExercises(exercisesByDay);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <div className="calendar">
                {daysOfWeek.map(day => (
                    <div key={day} className="day-column">
                        <h2>{day}</h2>
                        {weeklyExercises[day].map((exercise, index) => (
                            <ExerciseCard
                                key={index}
                                name={exercise.name}
                                sets={exercise.sets}
                                reps={exercise.reps}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
