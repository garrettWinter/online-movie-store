const router = require('express').Router();
const { Customer, LineItem, Product, Order } = require('../models');
const { Op } = require('sequelize');

// Search product title by likeness
router.get('/:term', async (req, res) => {
  try {
    const dbSearchData = await Product.findAll({
      where: {
        product_name: {
          [Op.like]: `%${req.params.term}%`
        }
      },
    });
    const results = dbSearchData.map((results) => {
      const product = results.get({ plain: true });
      return {
        product, logged_in: req.session.logged_in
      }
    });
    res.render('category', {
      results,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
}
)

module.exports = router;