import {Request, Response} from 'express'
import Producto from '../models/Product.model'

export const crearProducto = async (req: Request, res: Response) => {
    
    const producto = await Producto.create(req.body)

    res.json({
        data: producto
    });

}