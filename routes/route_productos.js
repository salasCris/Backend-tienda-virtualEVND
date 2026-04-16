const productoController = require('../controller/controller_producto');

module.exports = (app) => {
    app.get('/api/productos', productoController.list);
    app.get('/api/productos/:id', productoController.findById);
    app.get('/api/productos/nombre/:nombre', productoController.findByName);
    app.post('/api/productos', productoController.create);
    app.put('/api/productos/:id', productoController.update);
    app.delete('/api/productos/:id', productoController.delete);
};
