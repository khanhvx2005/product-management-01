const express = require('express')
const multer = require('multer')
const fileUpload = multer()
const router = express.Router()
const controller = require('../../controllers/admin/products.controller')
const validate = require('../../validates/products.validate')
const uploadHelpers = require('../../middleware/uploadCloud.middleware')
router.get('/', controller.index)
router.patch('/change-status/:id/:status', controller.changeStatus)
router.patch('/change-multi', controller.changeMulti)
router.delete('/delete/:id', controller.deleteItem)
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
router.get('/details/:id', controller.detail)

module.exports = router;