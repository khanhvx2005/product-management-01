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
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const data = await ProductsCategory.findOne({
        deleted: false,
        _id: id
    })
    const records = await ProductsCategory.find({
        deleted: false,

    })

    const newRecords = createTreeHelper.tree(records)
    res.render('admin/pages/productsCategory/edit', { title: "Trang chỉnh sửa sản phẩm", data: data, records: newRecords })
}
module.exports.editPatch = async (req, res) => {

    req.body.position = parseInt(req.body.position)
    await ProductsCategory.updateOne({ _id: req.params.id }, req.body)
    req.flash("success", "Chỉnh sửa thành công !");
    res.redirect("/admin/products-category")
}