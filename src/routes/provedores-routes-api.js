const express = require('express');
const provedoresControllerApi = require('../controllers/provedores-controller-api');
const provedoresAPI = require('../controllers/provedores-controller-api');
const router = express.Router();

//La Ruta (End Point) Get de todas las categorias
router.get('/',provedoresControllerApi.getTodasProvedores);

//La Ruta (End Point) GET solo una categoria
//---router.get('/:id',categoriasControllerApi.getCategoriaById);

//La Ruta (End Point) AGREGAR = POST de una categoria
router.post('/',provedoresControllerApi.agregarProvedores);

//La Ruta (End Point) UPDATE = PUT de una categoria
router.put('/:id',provedoresAPI.updateProvedores);

//La Ruta (End Point) DELETE de una categoria
router.delete('/:id',provedoresControllerApi.deleteProvedoresById);

//Para poder usar el router en otro archivo .js o modulos
module.exports=router;


//router.put