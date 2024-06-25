Recipe Helper
The Recipe Helper web application allows a user to create and organize their recoipes that they can then retrieve via desktop, tablets, or mobile phone.

Features

This app is meant for a single user but it will allow the user to access it via desktop or mobile. Its meant to be for a single user. There is no need for a user registration process but I would like the ability for the user to be able to securely access the recipes over the devices via the web.

Recipe Management
Create Recipes: Users can create new recipes with the following details:

Title
Ingredients
Instructions
Optional image upload
Edit Recipes: Update existing recipes.
Delete Recipes: Remove recipes when no longer needed.
Technology Stack

Front-end:
React (bootstrapped with Vite)
Tailwind CSS for styling (Or use Adobe XD for UI/UX design)
.NET for routing and navigation
- Back-end:
  - .NET
  - Entity Framework
  - MySQL database
Deployment:

Deploy front-end and back-end separately (e.g., Heroku, Vercel, AWS)
Testing:
Unit tests for API endpoints (using Jest)
Getting Started
Clone this repository.
Set up your MySQL database and configure the connection in the back-end.
Install dependencies:
cd backend
npm install
cd ../frontend
npm install
Start the development servers:

In the backend directory
npm start

In the frontend directory
The frontend is scaffolded with Vite using the react template
npm run dev

in a web browser navigate to: http://localhost:5173 

By default Vite will run on port 5173. But if for some reason vite is running on a different port just replace the port number with what port vite is running on (The running port will be shown in the terminal window after running npm run dev)

License
This project is licensed under the MIT License - see the LICENSE file for details.