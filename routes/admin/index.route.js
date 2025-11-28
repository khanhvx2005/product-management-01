const dashboardRoute = require('./dashboard.route')
const productsRoute = require('./products.route')
const productsCategoryRoute = require('./productsCategory.route')
const rolesRoute = require('./roles.route')

module.exports = (app) => {
    app.use('/admin/dashboard', dashboardRoute)
    app.use('/admin/products', productsRoute)
    app.use('/admin/products-category', productsCategoryRoute)
    app.use('/admin/roles', rolesRoute)

}
