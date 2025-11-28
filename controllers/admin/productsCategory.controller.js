const ProductsCategory = require('../../models/products-category.model')
const createTreeHelper = require('../../helpers/createTree.helper')
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,

    }
    const records = await ProductsCategory.find(find);
    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/productsCategory/index', { title: "Trang danh mục sản phẩm", records: newRecords })
}
module.exports.create = async (req, res) => {
    const find = {
        deleted: false,

    }

    const records = await ProductsCategory.find(find);

    const newRecords = createTreeHelper.tree(records);
    res.render('admin/pages/productsCategory/create', { title: "Trang tạo mới danh mục", records: newRecords })
}
module.exports.createPost = async (req, res) => {

    if (req.body.position == "") {
        const count = await ProductsCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position)
    }
    await ProductsCategory.create(req.body)
    req.flash("success", "Tạo mới danh mục thành công");
    const backURL = req.get("Referer");
    res.redirect(backURL);
}