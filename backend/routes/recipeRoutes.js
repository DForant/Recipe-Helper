const express = require('express');
const syncAndReturnModel = require('../models/recipe');
const router = express.Router(); // Create a new router object

// Wrap the model synchronization in an async function
let Recipe; // Declare a variable to hold the User model
syncAndReturnModel().then(model => {
  Recipe = model; // Assign the synchronized model to User
}).catch(error => {
  console.error('Failed to sync the Recipe model:', error); // Log any errors during synchronization
});


// CREATE a new recipe
router.post('/recipes', async (req, res) => {
    // Create new Recipe instance
    const newRecipe = {
        title: req.body.title,  
        description: req.body.description,
        instructions: req.body.instructions
    }

    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json({
            title: newRecipe.title,
            description: newRecipe.description,
            instructions: newRecipe.instructions,
            created_at: newRecipe.created_at    
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ all recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ a single recipe by ID
router.get('/recipes/:recipe_id', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.recipe_id);
        if (recipe) {
            res.status(200).send(recipe);
        } else {
            res.status(404).send('Recipe Not Found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
  });  


// EDIT a single recipe by id
router.put('/recipes/:id', async (req, res) => {
  try {
    // Find the recipe by its ID
    const recipe = await Recipe.findByPk(req.params.id);

    // Update the recipe with the new data from the request body
    if (recipe) {
      await recipe.update({
        title: req.body.title,
        description: req.body.description,
        instructions: req.body.instructions
      });
      res.status(200).json({ message: 'Recipe updated successfully' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
});


// DELETE a recipe by ID
router.delete('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    await recipe.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router; // Export the router