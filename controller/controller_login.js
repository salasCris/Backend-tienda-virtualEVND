const usuario = require('../models').tbc_usuarios;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta_aqui';

module.exports = {
    login(req, res) {
        // Aceptar tanto "correo" como "email"
        const correo = req.body.correo || req.body.email;
        const contraseña = req.body.contraseña || req.body.password;

        // Validar que se envíen ambos datos
        if (!correo || !contraseña) {
            return res.status(400).send({
                message: 'Debe proporcionar correo y contraseña'
            });
        }

        // Buscar usuario por email
        return usuario.findOne({ where: { email: correo } })
            .then(usuarioItem => {
                if (!usuarioItem) {
                    return res.status(404).send({
                        message: 'Usuario no encontrado'
                    });
                }

                // Comparar contraseña
                const passwordValida = bcrypt.compareSync(contraseña, usuarioItem.password);
                
                if (!passwordValida) {
                    return res.status(401).send({
                        message: 'Contraseña incorrecta'
                    });
                }

                // Generar JWT
                const token = jwt.sign(
                    { 
                        id: usuarioItem.id, 
                        email: usuarioItem.email, 
                        rol: usuarioItem.rol 
                    },
                    SECRET_KEY,
                    { expiresIn: '24h' }
                );

                return res.status(200).send({
                    token: token
                });
            })
            .catch(error => res.status(500).send(error));
    }
};
