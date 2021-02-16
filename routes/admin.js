const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const productCon = require('../controllers/productsCon')

router.get('/',productCon.dashboard);
router.get('/signin',adminController.signIn);
router.get('/signup',adminController.signUp);
router.get('/clothes', adminController.clothes);
router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/admin',productCon.admin);
router.post("/product",productCon.createProduct);
router.post("/product/:id",productCon.deleteProduct);
router.get("/",productCon.getAllProduct);
router.get("/clothes/:id",productCon.displayClothes);

module.exports = router;