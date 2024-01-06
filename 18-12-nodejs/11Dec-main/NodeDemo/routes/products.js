var express = require('express');
var router = express.Router();
const { model } = require('mongoose');
var responseData = require('../helper/responseData');
var modelProduct = require('../models/product')
var validate = require('../validates/product')
const {validationResult} = require('express-validator');
router.get('/', async function (req, res, next) {
  
  var productsAll = await modelProduct.getall(req.query);
  responseData.responseReturn(res, 200, true, productsAll);
});
router.get('/:id', async function (req, res, next) {// get by ID
  try {
    var product = await modelProduct.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});
router.post('/add',validate.validator(),
  async function (req, res, next) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
      responseData.responseReturn(res, 400, false, errors.array().map(error=>error.msg));
      return;
    }
  // var user = await modelProduct.getByName(req.body.userName);
  // if (user) {
  //   responseData.responseReturn(res, 404, false, "product da ton tai");
  // } else {
    const newUser = await modelProduct.createProduct({
      name: req.body.name,
      desc: req.body.email,
      image: req.body.password,
      price: req.body.price
    })
    responseData.responseReturn(res, 200, true, newUser);
  // }
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    var user = await modelProduct.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.delete('/delete/:id', function (req, res, next) {//delete by Id
  try {
    var user = modelProduct.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});


module.exports = router;