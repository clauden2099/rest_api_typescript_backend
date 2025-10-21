import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

//Conectar a BD
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue.bold("Conexión exitosa a la BD"))
    } catch (error) {
        console.log(colors.red.bold("Error en la BD"))
    }
}
connectDB()
//Instancia de express
const server = express()
//Permitir conexiones CORS
const corsOptions : CorsOptions= {
    origin: function(origin, callback){
        console.log(origin)
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))
//Leer datos de formularios
server.use(express.json())
server.use(morgan('dev'))
server.use('/api/products',router)

//Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server