const bcrypt = require('bcrypt');
const models = require('./models');

async function hashearContraseñas() {
    try {
        const usuarios = await models.tbc_usuarios.findAll();
        
        for (const usuario of usuarios) {
            // Solo hashear si no está hasheada (si no comienza con $2a$ o $2b$)
            if (!usuario.password.startsWith('$2')) {
                const passwordHasheada = bcrypt.hashSync(usuario.password, 10);
                await usuario.update({ password: passwordHasheada });
                console.log(`✓ Contraseña hasheada para: ${usuario.email}`);
            }
        }
        
        console.log('✓ Todas las contraseñas han sido hasheadas correctamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al hashear contraseñas:', error);
        process.exit(1);
    }
}

hashearContraseñas();
