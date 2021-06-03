const express = require('express');
const { requiredSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const { addCategory, getAllCategories } = require('../controller/categoryController');

router.post('/category/create', requiredSignin, adminMiddleware, addCategory);
router.get('/category/getallcategories',getAllCategories);

module.exports = router;