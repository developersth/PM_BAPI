const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/PaymentController');

router.get('/', paymentsController.index)
router.get('/:id', paymentsController.findById)
router.post('/', paymentsController.store)
router.put('/:id', paymentsController.update)
router.delete('/:id', paymentsController.destroy)
router.delete('/delete/item', paymentsController.destroyItems)
module.exports = router;