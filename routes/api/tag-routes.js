const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      res.status(200).json({ message: "Tag updated successfully" });
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "Tag deleted" });
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;