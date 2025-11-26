const Product = require('../../models/products.model')
module.exports.dashboard = (req, res) => {
    res.render("admin/pages/dashboard/index", { title: "Trang tổng quan" })
}