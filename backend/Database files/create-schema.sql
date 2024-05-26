-- Create Users table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create Recipes table
CREATE TABLE Recipes (
    recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Categories table
CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Create User_Recipes table (many-to-many relationship)
CREATE TABLE User_Recipes (
    user_id INT,
    recipe_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    PRIMARY KEY (user_id, recipe_id)
);

-- Create Ratings table
CREATE TABLE Ratings (
    rating_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    recipe_id INT,
    rating DECIMAL(3, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);

-- Create Admins table
CREATE TABLE Admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create Recipe_Categories table (many-to-many relationship)
CREATE TABLE Recipe_Categories (
    recipe_id INT,
    category_id INT,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    PRIMARY KEY (recipe_id, category_id)
);

-- Create Reviews table
CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    recipe_id INT,
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);

-- Create Ingredients table
CREATE TABLE Ingredients (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Create Recipe_Ingredients table (many-to-many relationship)
CREATE TABLE Recipe_Ingredients (
    recipe_id INT,
    ingredient_id INT,
    quantity DECIMAL(10, 2),
    unit VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
    PRIMARY KEY (recipe_id, ingredient_id)
);

-- Create Recipe_Images table
CREATE TABLE Recipe_Images (
    recipe_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    PRIMARY KEY (recipe_id)
);


-- Seed data

-- Seed data for Users
INSERT INTO Users (username, email, password)
VALUES
    ('alice', 'alice@example.com', 'hashed_password1'),
    ('bob', 'bob@example.com', 'hashed_password2');

-- Seed data for Categories
INSERT INTO Categories (name)
VALUES
    ('Appetizers'),
    ('Desserts'),
    ('Main Dishes');

-- Seed data for Recipes
INSERT INTO Recipes (title, description, instructions)
VALUES
    ('Classic Guacamole', 'A simple and delicious guacamole recipe.', 'Mix avocados, lime juice, onion, and salt.');

-- Seed data for Recipe_Categories (linking recipes to categories)
INSERT INTO Recipe_Categories (recipe_id, category_id)
VALUES
    (1, 1); -- Guacamole belongs to Appetizers

-- Seed data for Ingredients
INSERT INTO Ingredients (name)
VALUES
    ('Avocado'),
    ('Lime Juice'),
    ('Onion'),
    ('Salt');

-- Seed data for Recipe_Ingredients (linking recipes to ingredients)
INSERT INTO Recipe_Ingredients (recipe_id, ingredient_id, quantity, unit)
VALUES
    (1, 1, 2, 'ripe avocados'),
    (1, 2, 1, 'tablespoon'),
    (1, 3, 0.5, 'medium onion'),
    (1, 4, 0.5, 'teaspoon');

-- Seed data for Ratings
INSERT INTO Ratings (user_id, recipe_id, rating)
VALUES
    (1, 1, 4.5), -- Alice rates the guacamole
    (2, 1, 5.0); -- Bob rates the guacamole

-- Seed data for Reviews
INSERT INTO Reviews (user_id, recipe_id, review_text)
VALUES
    (1, 1, 'Delicious! I make this all the time.'),
    (2, 1, 'Best guacamole ever!');

-- Seed data for Admins (if needed)
INSERT INTO Admins (username, email, password)
VALUES
    ('admin', 'admin@example.com', 'admin_password');

