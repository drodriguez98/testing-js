import app from './app.js'
import { sequelize } from './database/database.js'

async function main() {

    try {

        //await sequelize.authenticate()
        //console.log('Connection has been established successfully.')

        // Crear tablas de los modelos si no existen (force: true para crearlas aunque ya existan)

        await sequelize.sync({ force: false }) 

        app.listen(4000)
        console.log('Server listening on port 4000')

    }    catch (error) { console.error('Unable to connect to the database:', error) }

}

main();