const producto = require('../models').tbb_productos;

module.exports = {
    create(req, res){
        return producto
        .create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            precio: req.body.precio,
            stock: req.body.stock,
            id_categoria: req.body.id_categoria,
        })
        .then(productoItem => res.status(201).send(productoItem))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return producto.findAll()
        .then(productos => res.status(200).send(productos))
        .catch(error => res.status(400).send(error));
    },
    findById(req, res){
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({message: 'Debe proporcionar id para buscar'});
        }

        return producto.findByPk(id)
        .then(productoItem => {
            if (!productoItem) {
                return res.status(404).send({message: 'Producto no encontrado'});
            }
            return res.status(200).send(productoItem);
        })
        .catch(error => res.status(400).send(error));
    },
    findByName(req, res){
        const nombre = req.params.nombre;

        if (!nombre) {
            return res.status(400).send({message: 'Debe proporcionar nombre para buscar'});
        }

        return producto.findAll({
            where: { nombre }
        })
        .then(productos => res.status(200).send(productos))
        .catch(error => res.status(400).send(error));
    },
    update(req, res){
        const id = req.params.id;
        return producto.findByPk(id)
        .then(productoItem => {
            if (!productoItem) {
                return res.status(404).send({message: 'Producto no encontrado'});
            }
            return productoItem.update({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                precio: req.body.precio,
                stock: req.body.stock,
                id_categoria: req.body.id_categoria,
            })
            .then(updated => res.status(200).send(updated))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        const id = req.params.id;
        return producto.findByPk(id)
        .then(productoItem => {
            if (!productoItem) {
                return res.status(404).send({message: 'Producto no encontrado'});
            }
            return productoItem.destroy()
            .then(() => res.status(200).send({message: 'Producto eliminado'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
