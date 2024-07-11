const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!category) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (categoryUpdate[0] === 0) {
      res
        .status(404)
        .json({
          message: "No category found with this id, or no new data provided!",
        });
      return;
    }

    res.status(200).json({ message: "Category updated successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});
  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryDelete = await Category.destroy({
      where: { id: req.params.id },
    });

    if (!categoryDelete) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;