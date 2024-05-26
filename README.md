# Recipe Helper
The Recipe Helper web application allows users to create, store, and share their favorite recipes online. Whether you’re a seasoned chef or a home cook, this platform provides a space to showcase your culinary creations and discover new recipes from others.

Features
1. User Authentication
Register: Users can create an account by providing their email and password.
Login: Secure login using JWT (JSON Web Tokens) for session management.
2. Recipe Management
Create Recipes: Users can create new recipes with the following details:
Title
Ingredients
Instructions
Optional image upload
Edit Recipes: Update existing recipes.
Delete Recipes: Remove recipes when no longer needed.
3. Admin Section
User Management:
View all users
Edit user profiles
Delete user accounts
Recipe Management:
View all recipes
Edit recipe details
Delete recipes
5. Recipe Reviews and Ratings
Rate Recipes:
Users can rate recipes (e.g., 1 to 5 stars).
Write Reviews:
Share your thoughts and experiences about a recipe.
Admin Moderation:
Admins can approve, reject, or edit reviews.
Technology Stack
Front-end:
React (bootstrapped with Vite)
Tailwind CSS for styling (Or use Adobe XD for UI/UX design)
React Router for navigation
Back-end:
Node.js
Express.js for API endpoints
MySQL database (using Sequelize ORM)
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
# In the backend directory
npm start

# In the frontend directory
The frontend is scaffolded with Vite using the react template 
 npm run dev

 in a web browser navigate to: http://localhost:5173

 By default Vite will run on port 5173. But if for some reason vite is running on a different port just replace the port number with what port vite is running on (The running port will be shown in the terminal window after running npm run dev)



License
This project is licensed under the MIT License - see the LICENSE file for details.
