# CEN3031-Project


WebFit - Fitness Tracking Website
Welcome to WebFit, a web-based application that helps users track their calorie intake, macros, and exercise routines. WebFit automatically generates workout routines based on users' personal goals, making it easier to embark on a fitness journey without stress.

Features

Personalized Workouts: Automatically generated workouts based on user fitness goals (weight loss, muscle gain, etc.).
Macro Tracker: Track daily calories, protein, carbs, and fat.
Progress Tracking: Monitor weekly progress and maintain workout streaks.
User Authentication: Secure registration and login system.


Installation and Setup

Backend Setup

1. Navigate to the backend directory: cd CEN3031-Project/backend
2. Install dependencies: npm install
3. Start the backend server: node index.js
4. (Optional) Populate the database with pre-existing food items: node test/foodRun.js

Frontend Setup

1. Navigate to the frontend directory: cd CEN3031-Project/frontend
2. Install dependencies: npm install
3. Start the frontend server: npm start
4. Open the application in your browser at: http://localhost:3000
   
Technologies Used

Frontend: React.js, Apollo Client
Backend: Node.js, Apollo Server, GraphQL
Database: MongoDB Atlas
Styling: CSS Modules
Testing: Jest

Usage

Register a new user by navigating to the registration page.
Log in using your credentials.
Access personalized workout plans and track your daily macros.
Use the macro tracker to add food items and monitor caloric intake.
Complete daily workouts and build streaks over time.

Testing

Navigate to the backend directory: cd CEN3031-Project/backend/test
Run the unit tests: software.test.js

