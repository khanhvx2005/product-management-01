const express = require('express')
const router = express.Router()
const multer = require('multer')

const fileUpload = multer()
const validate = require('../../validates/products.validate')

const uploadHelpers = require('../../middleware/uploadCloud.middleware')

const controller = require('../../controllers/admin/productsCategory.controller')

router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/create',
    fileUpload.single('thumbnail'),
    uploadHelpers.upload,
    validate.createPost,
    controller.createPost)
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id',
    fileUpload.single('thumbnail'),
    uploadHelpers.upload,
    validate.createPost,
    controller.editPatch)


module.exports = router;