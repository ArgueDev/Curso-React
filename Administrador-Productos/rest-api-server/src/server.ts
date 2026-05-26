import express, {Express} from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors'

// Conexion a la BD
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.magenta('Conexion exitosa a la BD'))
    } catch (error) {
        console.log(colors.red.bold("Hubo un error al conectar a la BD"))
        // console.error(error)
    }
}

connectDB()

const server: Express = express();

// Leer datos del formulario
server.use(express.json())

server.use('/api/productos', router)


export default server;