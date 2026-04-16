const usuario = require('../models').tbc_usuarios;

module.exports = {
    create(req, res){
        return usuario
        .create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol,
            fecha_registro: req.body.fecha_registro || new Date(),
        })
        .then(usuarioItem => res.status(201).send(usuarioItem))
        .catch(error => res.status(400).send(error));
    },
    list(_, res){
        return usuario.findAll()
        .then(usuarios => res.status(200).send(usuarios))
        .catch(error => res.status(400).send(error));
    },
    findById(req, res){
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({message: 'Debe proporcionar id para buscar'});
        }

        return usuario.findByPk(id)
        .then(usuarioItem => {
            if (!usuarioItem) {
                return res.status(404).send({message: 'Usuario no encontrado'});
            }
            return res.status(200).send(usuarioItem);
        })
        .catch(error => res.status(400).send(error));
    },
    findByEmail(req, res){
        const email = req.params.email;

        if (!email) {
            return res.status(400).send({message: 'Debe proporcionar email para buscar'});
        }

        return usuario.findAll({
            where: { email }
        })
        .then(usuarios => res.status(200).send(usuarios))
        .catch(error => res.status(400).send(error));
    },
    update(req, res){
        const id = req.params.id;
        return usuario.findByPk(id)
        .then(usuarioItem => {
            if (!usuarioItem) {
                return res.status(404).send({message: 'Usuario no encontrado'});
            }
            return usuarioItem.update({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password,
                rol: req.body.rol,
                fecha_registro: req.body.fecha_registro || usuarioItem.fecha_registro,
            })
            .then(updated => res.status(200).send(updated))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        const id = req.params.id;
        return usuario.findByPk(id)
        .then(usuarioItem => {
            if (!usuarioItem) {
                return res.status(404).send({message: 'Usuario no encontrado'});
            }
            return usuarioItem.destroy()
            .then(() => res.status(200).send({message: 'Usuario eliminado'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
