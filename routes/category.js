var express = require('express');
var router = express.Router();
let controller = require('../controllers/category')
const multer = require("multer")
let admincontroller = require('../controllers/admin')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/category-image')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "."+file.originalname.split('.').pop())
    }
  })    
  
  const upload = multer({ storage: storage })

router.post('/creat',admincontroller.SECURE,upload.array('image',2),controller.categorycreate)
router.get('/read',controller.categoryread)
router.patch('/update/:id',admincontroller.SECURE,upload.array('image',2),controller.categoryupdate)
router.delete('/delete/:id',admincontroller.SECURE,controller.categorydelete)

module.exports = router;
