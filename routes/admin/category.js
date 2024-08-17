const express = require('express');
const router = express.Router();
const Category = require('../../models/Category/Category');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/categories/:id
// @desc    Get a category by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/categories
// @desc    Create a new category
// @access  Public
router.post('/create', async (req, res) => {
    const { category_name, category_description } = req.body;

    try {
        const newCategory = new Category({
            category_name,
            category_description,
            category_type
        });

        const category = await newCategory.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT /api/categories/:id
// @desc    Update a category by ID
// @access  Public
router.put('/:id', async (req, res) => {
    const { category_name, category_description } = req.body;

    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        if (category_name) category.category_name = category_name;
        if (category_description) category.category_description = category_description;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/categories/:id
// @desc    Delete a category by ID
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.remove();
        res.json({ message: 'Category removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
