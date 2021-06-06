const express = require('express');
const { requiredSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const { addCategory, getAllCategories } = require('../controller/categoryController');

const multer = require('multer');
const shortid = require('shortid');
const path =  require('path');


const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });

const upload = multer({ storage });

router.post('/category/create', requiredSignin, adminMiddleware, upload.single('categoryImg'), addCategory);
router.get('/category/getallcategories',getAllCategories);

module.exports = router; 
