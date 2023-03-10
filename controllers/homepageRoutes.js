const router = require('express').Router();
const { Customer, LineItem, Product, Order } = require('../models');

//Puts top ten movies on homepage.
router.get('/', async (req, res) => {
  try {
    const dbProductData = await Product.findAll({
      limit: 10,
    });
    const homepage = dbProductData.map((results) => {
      const product = results.get({ plain: true });
      return {
        product, logged_in: req.session.logged_in
      }
    });



    res.render('homepage', {
      homepage,
      logged_in: req.session.logged_in,
    });


  } catch (err) {
    res.status(500).json(err);
  }
}
)

// Making dropdown category list.
router.get('/genre', async (req, res) => {
  try {
    const dbProductData = await Product.findAll({

    });
    const homepage = dbProductData.map((product) =>
      product.get({ plain: true })
    );

    res.render('genre', {
      layout: 'main',
      homepage,
      logged_in: req.session.logged_in,
    });


  } catch (err) {
    res.status(500).json(err);
  }
}
)

module.exports = router;

