module.exports.createPost = (req, res, next) => {
    const backURL = req.get("Referer");
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tên sản phẩm");
        res.redirect(backURL);
        return;
    }
    next()
}