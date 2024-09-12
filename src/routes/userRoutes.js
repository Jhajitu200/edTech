 
const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
