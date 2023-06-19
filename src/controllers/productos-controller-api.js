//Requerimos la conexion a la base de datos
//Destructuracion
const { request } = require('express');
const { miConexion } = require('../database/db')

//Objeto para manejar el CRUD de categorias
const productosAPI = {};

//El objeto categoriasAPI = C, R (Una o Todas), U, D
//C = PORT  R = GET  U = PUT  D = Delete
//Aqui vamos a eliminar una categoria
productosAPI.deleteProductosById = async (req=request,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM productos WHERE id = ?',[id])
        if(resultado[0].affectedRows > 0){
            res.status(200).json({
                estado:1,
                mensaje:"Producto eliminada"
            });
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Producto no eliminada",
                productos:[]
            });
        }
    } catch (error){
        next(error)
    }
}
//Aqui que nos regrese una categoria por su ID
/*categoriasAPI.getCategoriaById = async (req=request,res,next)=>{
    try{
        //Recuperar el id de la categoria
        const { id } = req.params;
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM categoria WHERE id = ?',[id])
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Categoria encontrada",
                categoria:rows[0]
            });
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada",
                categoria:[]
            });
        }
    } catch (error) {
        next(error);
    }
}
*/

//Vamos a update una categoria
productosAPI.updateProductos = async(req,res,next)=>{
    try{
        const { categorias, proveedor, descripcion, precio } = req.body;
        const { id } = req.params;
        if(id==undefined || categorias==undefined || proveedor==undefined || descripcion==undefined || precio==undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE productos SET categorias = ?, proveedor = ?, descripcion = ?, precio = ? WHERE id = ?',[categorias,proveedor, descripcion, precio,id]);
            if(resultado[0].affectedRows>0){
                res.status(200).json({
                    estado:1,
                    mensaje:"Producto Actualizado",
                    categorias:categorias,
                    proveedor:proveedor,
                    descripcion:descripcion,
                    precio:precio
                });
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Producto no Actualizado"
                })
            }
            }
        }catch (error){
        next(error);
    }
}

//Vamos a agregar una categoria
productosAPI.agregarProductos = async (req=request,res,next)=>{
    try{
        const { categorias, proveedor, descripcion, precio } = req.body;
        //Verficiar que la solicitud se realice correctamente 
        //Que nos mande los dos campos 
        if(categorias==undefined || proveedor==undefined || descripcion==undefined|| precio==undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO productos(categorias,proveedor, descripcion, precio) values(?,?,?,?)',[categorias,proveedor, descripcion, precio]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1,
                    mensaje:"Producto creado",
                    productos:{
                        id           :  resultado[0].insertId,
                        categorias  :  categorias,
                        proveedor  :  proveedor,
                        descripcion  :  descripcion,
                        precio:  precio
                    }
                });
            }
        }
    }catch (error){
        next(error);
    }
}

//Aqui es para regresar Todas las Categorias
productosAPI.getTodasProductos = async (req,res,next)=>{
    try{
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM productos');
        //Comprobar si existen registros
        if(rows.length==0){
            res.status(404).json({
                estado:0,
                mansaje:"Registros no encontrados",
                productos:rows
            });
        }else{
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                productos:rows
            });
        }
    } catch (error) {
        next(error)
    }
}

//Exportar para poder usarlo en otro modulo
module.exports=productosAPI;
