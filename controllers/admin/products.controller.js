const Product = require('../../models/products.model')
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const filter = [
        {
            name: "Tất cả",
            status: "",
            selected: false
        },
        {
            name: "Hoạt động",
            status: "active",
            selected: false
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            selected: false
        }
    ]
    if (req.query.status) {
        find.status = req.query.status;
        const index = filter.findIndex((item) => item.status == req.query.status);
        filter[index].selected = true;
    } else {
        const index = filter.findIndex((item) => item.status == "");
        filter[index].selected = true;
    }
    let keyword = "";
    if (req.query.keyword) {
        keyword = req.query.keyword;
        const re = new RegExp(req.query.keyword, "i");
        find.title = re;
    }
    const pagination = {
        currentPage: 1,
        limitItem: 4
    }
    const count = await Product.countDocuments(find);
    pagination.totalPage = Math.ceil(count / pagination.limitItem);
    if (req.query.page) {
        pagination.currentPage = parseInt(req.query.page);
        pagination.skip = (pagination.currentPage - 1) * pagination.limitItem;
    }
    const sort = {
        position: "desc"
    }
    const records = await Product.find(find).limit(pagination.limitItem).skip(pagination.skip).sort(sort)
    res.render("admin/pages/products/index", { title: "Trang sản phẩm", records: records, filter: filter, keyword: keyword, pagination: pagination })

}
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    const backURL = req.get("Referer");
    try {
        await Product.updateOne({ _id: id }, { status: status })
        req.flash('success', 'Cập nhập thành công')
        res.redirect(backURL);
    } catch (error) {
        req.flash('error', 'Cập nhập thất bại')
        res.redirect(backURL);

    }
}
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    const backURL = req.get("Referer");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash("success", "Cập nhập trạng thái sản phẩm thành công ")

            res.redirect(backURL);

            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash("success", "Cập nhập trạng thái phẩm thành công ")

            res.redirect(backURL);

            break;
        case "delete-all":
            await Product.deleteMany({ _id: { $in: ids } })
            req.flash("success", "Xóa sản phẩm thành công ")

            res.redirect(backURL);

            break;
        case "change-position":
            for (const element of ids) {
                let [id, position] = element.split("-");
                position = parseInt(position)
                await Product.updateOne({ _id: id }, { position: position })
            }
            req.flash("success", "Thay đổi vị trí sản phẩm thành công ")

            res.redirect(backURL);
            break;

        default:
            break;
    }
}
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    const backURL = req.get("Referer");

    try {
        await Product.deleteOne({ _id: id });
        req.flash("success", "Xóa sản phẩm thành công ")
        res.redirect(backURL);

    } catch (error) {
        res.redirect(backURL);

    }
}
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", { title: "Trang thêm mới sản phẩm" })
}
module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if (req.body.position == "") {
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position)
    }

    await Product.create(req.body)
    req.flash("success", "Tạo mới sản phẩm thành công");
    const backURL = req.get("Referer");
    res.redirect(backURL);


}
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const records = await Product.findOne({
        deleted: false,
        _id: id
    })
    res.render('admin/pages/products/edit', { title: "Trang chỉnh sửa sản phẩm", records: records })
}
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    await Product.updateOne({ _id: req.params.id }, req.body)
    req.flash("success", "Chỉnh sửa thành công !");
    res.redirect("/admin/products")
}
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const records = await Product.findOne({
        deleted: false,
        _id: id
    })
    res.render("admin/pages/products/detail", { title: records.slug, records: records })
}