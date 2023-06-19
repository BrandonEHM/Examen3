
const express = require('express');
const productosControllerApi = require('../controllers/productos-controller-api');
const productosAPI = require('../controllers/productos-controller-api');
const router = express.Router();

//La Ruta (End Point) Get de todas las categorias
router.get('/',productosControllerApi.getTodasProductos);

//La Ruta (End Point) GET solo una categoria
//---router.get('/:id',categoriasControllerApi.getCategoriaById);

//La Ruta (End Point) AGREGAR = POST de una categoria
router.post('/',productosControllerApi.agregarProductos);

//La Ruta (End Point) UPDATE = PUT de una categoria
router.put('/:id',productosAPI.updateProductos);

//La Ruta (End Point) DELETE de una categoria
router.delete('/:id',productosControllerApi.deleteProductosById);

//Para poder usar el router en otro archivo .js o modulos
module.exports=router;



//router.put
