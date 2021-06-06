const shortid = require('shortid');
const Product = require('../models/Product');

exports.createProduct = (req, res) => {
    // res.status(200).json( { file: req.files, body: req.body } );
  try{
    const { name, price, description, category, quantity, createdBy } = req.body;
    let productPictures = [];
    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.path };
      });
    }
  console.log("this is files",req.files)
    const product = new Product({
      name: name,
      price,
      quantity,
      description,
      productPictures,
      category,
      createdBy: req.user._id,
    });
  
    product.save();
    res.status(201).json({product})
    }
    catch (e){
        console.log(e);
    }
  };