import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        //Datos ordenados
        order: [
            ['price', 'DESC']
        ],
        //Datos específicos
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: products })

}

export const getProductsById = async (req: Request, res: Response) => {
    //Desde id
    //Se accede al parametro de la URL con req.params.{nombre parametro}
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    res.json({ data: product })

}

export const createProduct = async (req: Request, res: Response) => {
    //De esta manera se crea el modelo en base a los datos envíados e
    //en la request
    //const product = new Product(req.body)
    //Se crea y se guarda en la BD en una unica línea
    const product = await Product.create(req.body)
    //Se guarda el producto en la BD
    //const savedProducto = await product.save()
    //Se regresa la respuesta en formato JSON
    res.status(201).json({ data: product })

}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //Actualizar 
    await product.update(req.body)
    await product.save()

    res.json({ data: product })
}


export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //Actualizar 
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //Eliminar 
    await product.destroy()

    res.json({ data: "Producto eliminado" })
}