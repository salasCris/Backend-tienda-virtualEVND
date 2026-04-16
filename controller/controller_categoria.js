const db = require('../models');
const categoria = db.tbc_categorias;

module.exports = {
    create(req, res){
        return categoria
        .create({
            nombre: req.body.nombre,
        })
        .then(categoriaItem => res.status(201).send(categoriaItem))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return categoria.findAll()
        .then(categorias => res.status(200).send(categorias))
        .catch(error => res.status(400).send(error));
    },
    findById(req, res){
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({message: 'Debe proporcionar id para buscar'});
        }

        return categoria.findByPk(id)
        .then(categoriaItem => {
            if (!categoriaItem) {
                return res.status(404).send({message: 'Categoria no encontrada'});
            }
            return res.status(200).send(categoriaItem);
        })
        .catch(error => res.status(400).send(error));
    },
    findByName(req, res){
        const nombre = req.params.nombre;

        if (!nombre) {
            return res.status(400).send({message: 'Debe proporcionar nombre para buscar'});
        }

        return categoria.findAll({
            where: { nombre }
        })
        .then(categorias => res.status(200).send(categorias))
        .catch(error => res.status(400).send(error));
    },
    update(req, res){
        const id = req.params.id;
        return categoria.update({
            nombre: req.body.nombre,
        }, {
            where: { id }
        })
        .then(([updatedRows]) => {
            if (updatedRows === 0) {
                return res.status(404).send({message: 'Categoria no encontrada'});
            }
            return res.status(200).send({message: 'Datos Actualizados'});
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        const id = req.params.id;
        return categoria.destroy({
            where:{ id }
        })
        .then(deletedRows => {
            if (deletedRows === 0) {
                return res.status(404).send({message: 'Categoria no encontrada'});
            }
            return res.status(200).send({message: 'Datos Eliminados'});
        })
        .catch(error => res.status(400).send(error));
    },
};
