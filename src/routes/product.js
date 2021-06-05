const express = require('express');
const router = express.Router();
const { createProduct } = require('../controller/productController');
const Product = require('../models/Product');
const multer = require('multer');
const { requiredSignin, adminMiddleware } = require('../common-middleware');
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

router.post('/product/create', requiredSignin, adminMiddleware, upload.array('productPricture'), createProduct);


module.exports = router;