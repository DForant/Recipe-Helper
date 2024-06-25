const express = require('express');
const syncAndReturnModel = require('../models/category');
const router = express.Router(); // Create a new router object

// Wrap the model synchronization in an async function
let Category; // Declare a variable to hold the User model
syncAndReturnModel().then(model => {
  Category = model; // Assign the synchronized model to User
}).catch(error => {
  console.error('Failed to sync the Category model:', error); // Log any errors during synchronization
});


// CREATE a new category
router.post('/categories', async (req, res) => {
    try {
        const existingCategory = await Category.findOne({ where: { name: req.body.name } });
        if (existingCategory) {
            return res.status(400).send('Category already exists');
        }
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ all categoies
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ a single category by ID
router.get('/categories/:category_id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.category_id);
        if (category) {
            res.status(200).send(category);
        } else {
            res.status(404).send('Category Not Found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
  });  


// EDIT a single category by id
router.put('/categories/:category_id', async (req, res) => {
    try {
        const existingCategory = await Category.findOne({ where: { category_id: req.params.category_id } });
        if (!existingCategory) {
            return res.status(404).send('Category not found');
        }
        
        // Check to make sure that the category name being edited does not already exist in the DB table
        const existingCategoryName = await Category.findOne({ where: { name: req.body.name } });
        if (existingCategoryName) {
            return res.status(400).send('Category already exists');
        }

        const updatedCategory = await existingCategory.update(req.body);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).send(error);
    }
});


// DELETE a category by ID
router.delete('/categories/:category_id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.category_id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router; // Export the router