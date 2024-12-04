import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import ExerciseCard from './ExerciseCard'; 
import '../css/Home.css';

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

const MARK_WORKOUT_COMPLETE = gql`
    mutation MarkWorkoutComplete($username: String!, $day: String!, $workoutName: String!) {
        markWorkoutComplete(username: $username, day: $day, workoutName: $workoutName) {
            streak
        }
    }
`;

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Home() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const { data, loading, error } = useQuery(GET_WORKOUT, { variables: { username } });
    const [markWorkoutComplete] = useMutation(MARK_WORKOUT_COMPLETE);
    const [weeklyExercises, setWeeklyExercises] = useState({});
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        if (data) {
            const exercisesByDay = daysOfWeek.reduce((acc, day) => {
                acc[day] = [];
                return acc;
            }, {});

            // Collect all exercises from all workouts
            let allExercises = [];
            data.getWorkout.forEach(workout => {
                allExercises = allExercises.concat(
                    workout.workout.map(exercise => ({ ...exercise, completed: false }))
                );
            });

            // Start assigning exercises from Monday (index 1)
            let dayIndex = 1; // Index of "Monday" in daysOfWeek
            const numDays = daysOfWeek.length;

            allExercises.forEach((exercise) => {
                const day = daysOfWeek[dayIndex];
                exercisesByDay[day].push(exercise);

                dayIndex++;
                if (dayIndex >= numDays) {
                    dayIndex = 1; // Reset to Monday after Saturday
                }
            });

            setWeeklyExercises(exercisesByDay);
        }
    }, [data]);

    const handleComplete = async (day, workoutName) => {
        console.log("Variables being passed to mutation:", { username, day, workoutName });
        const { data: mutationData } = await markWorkoutComplete({ variables: { username, day, workoutName } });

        setWeeklyExercises(prev => ({
            ...prev,
            [day]: prev[day].map(workout =>
                workout.name === workoutName ? { ...workout, completed: true } : workout
            )
        }));

        setStreak(mutationData?.markWorkoutComplete?.streak || 0);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="home-container">
            <button className="macro-button" onClick={() => navigate('/macro-tracker')}>
                Macro Tracker
            </button>
            <h1>Welcome, {username}!</h1>
            <p>Current Streak: {streak} weeks</p>
            <div className="calendar">
                {daysOfWeek.map(day => (
                    <div key={day} className="day-column">
                        <h2>{day}</h2>
                        {weeklyExercises[day]?.map((exercise, index) => (
                            <ExerciseCard
                                key={index}
                                name={exercise.name}
                                sets={exercise.sets}
                                reps={exercise.reps}
                            >
                                <button
                                    onClick={() => handleComplete(day, exercise.name)}
                                    disabled={exercise.completed}
                                >
                                    {exercise.completed ? "Completed" : "Mark Complete"}
                                </button>
                            </ExerciseCard>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
