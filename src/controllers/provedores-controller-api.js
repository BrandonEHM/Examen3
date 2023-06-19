
//Requerimos la conexion a la base de datos
//Destructuracion
const { request } = require('express');
const { miConexion } = require('../database/db')

//Objeto para manejar el CRUD de categorias
const provedoresAPI = {};

//El objeto categoriasAPI = C, R (Una o Todas), U, D
//C = PORT  R = GET  U = PUT  D = Delete
//Aqui vamos a eliminar una categoria
provedoresAPI.deleteProvedoresById = async (req=request,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM provedores WHERE id = ?',[id])
        if(resultado[0].affectedRows > 0){
            res.status(200).json({
                estado:1,
                mensaje:"Provedor eliminado"
            });
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Provedor no eliminado",
                provedores:[]
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
provedoresAPI.updateProvedores = async(req,res,next)=>{
    try{
        const { nombre, direccion, telefono } = req.body;
        const { id } = req.params;
        if(id==undefined || nombre==undefined || direccion==undefined || telefono==undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE provedores SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?',[nombre,direccion, telefono,id]);
            if(resultado[0].affectedRows>0){
                res.status(200).json({
                    estado:1,
                    mensaje:"Provedor Actualizado",
                    nombre:nombre,
                    direccion:direccion,
                    telefono:telefono
                });
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Provedor no Actualizado"
                })
            }
            }
        }catch (error){
        next(error);
    }
}

//Vamos a agregar una categoria
provedoresAPI.agregarProvedores = async (req=request,res,next)=>{
    try{
        const { nombre, direccion, telefono } = req.body;
        //Verficiar que la solicitud se realice correctamente 
        //Que nos mande los dos campos 
        if(nombre==undefined || direccion==undefined || telefono==undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta: Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO provedores(nombre,direccion,telefono) values(?,?,?)',[nombre,direccion,telefono]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1,
                    mensaje:"Provedores creada",
                    provedores:{
                        id           :  resultado[0].insertId,
                        nombre  :  nombre,
                        direccion:  direccion,
                        telefono:  telefono
                    }
                });
            }
        }
    }catch (error){
        next(error);
    }
}

//Aqui es para regresar Todas las Categorias
provedoresAPI.getTodasProvedores = async (req,res,next)=>{
    try{
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM provedores');
        //Comprobar si existen registros
        if(rows.length==0){
            res.status(404).json({
                estado:0,
                mansaje:"Registros no encontrados",
                provedores:rows
            });
        }else{
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                provedores:rows
            });
        }
    } catch (error) {
        next(error)
    }
}

//Exportar para poder usarlo en otro modulo
module.exports=provedoresAPI;
