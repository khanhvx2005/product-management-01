const Product = require('../../models/products.model')
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,

    }
    const sort = {
        position: "desc"
    }
    const records = await Product.find(find).sort(sort)
    records.forEach((item) => {
        item.priceNew = Math.ceil(item.price * ((100 - item.discountPercentage) / 100));
    })
    res.render("client/pages/products/index", { title: "Sản phẩm", records: records })
}