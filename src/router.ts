import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/Product'
import { handleInputError } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor Curvo de 40 pulgadas
 *         price:
 *           type: number
 *           description: The product price
 *           example: 300
 *         availability:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */

//Routing

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *            200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'   
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrive 
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request - Invalid ID
 */             
router.get('/:id',
    //validar parametro
    param('id').isInt().withMessage("ID no válido"),
    handleInputError,
    getProductsById)


/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags: 
 *              - Products
 *          description: Return a new record in the database
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201:             
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 */     
router.post('/',
    //Validación del body de la solicitud
    body('name')
        .notEmpty().withMessage('El nombre de prodcuto no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El nombre de prodcuto no puede ir vacío')
        .custom(value => value > 0).withMessage('precio no válido'),
    handleInputError,
    createProduct)


/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with a user input
 *          tags: 
 *              - Products
 *          description: Returns te updated product
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrive 
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:             
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 */     
router.put('/:id',
    param('id').isInt().withMessage("ID no válido"),
    body('name')
        .notEmpty().withMessage('El nombre de prodcuto no puede ir vacío'),
    body('price')
        .notEmpty().withMessage('El nombre de prodcuto no puede ir vacío')
        .isNumeric().withMessage('El precio del producto no puede ir vacío')
        .custom(value => value > 0).withMessage('precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputError,
    updateProduct)


/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags: 
 *              - Products
 *          description: Returns the updated availability
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrive 
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:             
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID 
 *              404:
 *                  description: Product Not Found
 */     
router.patch('/:id',
    param('id').isInt().withMessage("ID no válido"),
    handleInputError,
    updateAvailability)


/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product by a given ID
 *          tags: 
 *              - Products
 *          description: Returns a confirmation message
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete 
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:             
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID 
 *              404:
 *                  description: Product Not Found
 */     
router.delete('/:id',
    param('id').isInt().withMessage("ID no válido"),
    handleInputError,
    deleteProduct
)

export default router