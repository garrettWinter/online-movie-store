const router = require('express').Router();
const { Customer, LineItem, Product, Order, SavedCart } = require('../models');

//Renders logged in users cart.
router.get('/', async (req, res) => {

  try {
    const dbSavedCartData = await SavedCart.findAll({
      include: [
        {
            model: Product,
        },
    ],
      where: {
        customer_id: req.session.customer_id, 
      },
    });
    const cart = dbSavedCartData.map((cartLineItems) =>
  cartLineItems.get({ plain: true })
    );
    
    res.render('cart', {
      cart,
      logged_in: req.session.logged_in,
    });
   } catch (err) {
    res.status(500).json(err);
  
  }
}
)

module.exports = router;