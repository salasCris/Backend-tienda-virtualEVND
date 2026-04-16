const models = require('./models');

async function addImagenField() {
  try {
    const sequelize = models.sequelize;
    
    await sequelize.query(`
      ALTER TABLE tbb_productos 
      ADD COLUMN imagen VARCHAR(255) NULL
    `);
    
    console.log('✓ Campo imagen agregado exitosamente a la tabla tbb_productos');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

addImagenField();
