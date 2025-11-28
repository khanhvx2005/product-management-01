const Role = require('../../models/roles.model')
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await Role.find(find)
    res.render("admin/pages/roles/index", { title: "Nhóm quyền", records: records })
}
module.exports.create = (req, res) => {
    res.render("admin/pages/roles/create", { title: "Tạo mới nhóm quyền" })
}
module.exports.createPost = async (req, res) => {
    await Role.create(req.body)
    req.flash("success", "Tạo mới nhóm quyền thành công");
    const backURL = req.get("Referer");
    res.redirect(backURL);
}