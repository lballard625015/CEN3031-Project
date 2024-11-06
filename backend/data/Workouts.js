const recommendedWorkouts = {
    "weight loss": [
        {
            name: "Full Body Fat Burn",
            workout: [
                { name: "Jumping Jacks", sets: 3, reps: 20 },
                { name: "Burpees", sets: 3, reps: 15 },
                { name: "Mountain Climbers", sets: 3, reps: 30 },
                { name: "Squat Jumps", sets: 3, reps: 15 }
            ]
        },
        {
            name: "Cardio Circuit",
            workout: [
                { name: "Running (Treadmill)", sets: 1, reps: 20 },
                { name: "Rowing Machine", sets: 1, reps: 15 },
                { name: "Jump Rope", sets: 3, reps: 50 }
            ]
        }
    ],
    "muscle gain": [
        {
            name: "Upper Body Strength",
            workout: [
                { name: "Bench Press", sets: 4, reps: 8 },
                { name: "Pull-Ups", sets: 4, reps: 10 },
                { name: "Shoulder Press", sets: 4, reps: 10 },
                { name: "Bicep Curls", sets: 4, reps: 12 }
            ]
        },
        {
            name: "Leg Day",
            workout: [
                { name: "Squats", sets: 4, reps: 8 },
                { name: "Leg Press", sets: 4, reps: 10 },
                { name: "Calf Raises", sets: 4, reps: 15 },
                { name: "Lunges", sets: 3, reps: 12 }
            ]
        }
    ],
    "toning": [
        {
            name: "Core and Abs",
            workout: [
                { name: "Plank", sets: 3, reps: 60 },
                { name: "Russian Twists", sets: 3, reps: 20 },
                { name: "Leg Raises", sets: 3, reps: 15 },
                { name: "Bicycle Crunches", sets: 3, reps: 20 }
            ]
        },
        {
            name: "Full Body Toning",
            workout: [
                { name: "Push-Ups", sets: 3, reps: 15 },
                { name: "Bodyweight Squats", sets: 3, reps: 20 },
                { name: "Lunges", sets: 3, reps: 15 },
                { name: "Jumping Jacks", sets: 3, reps: 30 }
            ]
        }
    ],
    "general health": [
        {
            name: "Low-Impact Cardio",
            workout: [
                { name: "Walking (Treadmill)", sets: 1, reps: 30 }, 
                { name: "Cycling", sets: 1, reps: 20 },
                { name: "Swimming", sets: 1, reps: 20 }
            ]
        },
        {
            name: "Mobility and Flexibility",
            workout: [
                { name: "Yoga Poses", sets: 1, reps: 20 }, 
                { name: "Stretching Routine", sets: 1, reps: 15 },
                { name: "Foam Rolling", sets: 1, reps: 10 }
            ]
        }
    ]
};

module.exports = recommendedWorkouts;
