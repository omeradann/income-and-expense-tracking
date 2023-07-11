const router = require('express').Router();
const incomeController = require('../controllers/incomeController');

router.get("/" , incomeController.listIncome);
router.post("/" , incomeController.addIncome);
router.delete("/:income_id" , incomeController.deleteIncome);

module.exports = router;