//alert('Hola mundo del Front de categorias');

//Vamos a crear funciones para comunicarnos con el back - API - END-POINT
//Creamos la funcion
let idEliminarProductos = 0;
let idActualizarProductos = 0;

function getURL() {
  let URL = window.location.protocol + "//" + window.location.hostname;
  if (window.location.port) URL += ":" + window.location.port;
  return URL;
}
 /*
function muestraUnaCategoriaFront(id) {
  let URL = getURL() + "/categorias/api/" + id; //params
  //alert(URL);
  $.ajax({
    method: "GET",
    url: URL,
    data: {}, //Body
    success: function (result) {
      if (result.estado == 1) {
        //Debemos mostrar la categoria en la ventana
        const categoria = result.categoria;

        document.getElementById("descripcionCategoriaVisualizar").value =
          categoria.descripcion;
        document.getElementById("observacionesCategoriaVisualizar").value =
          categoria.observaciones;
      } else {
        //Mostrar el mensaje de error
        alert(result.mensaje);
      }
    },
  });
}
*/
function agregarProductos() {
  const categorias = document.getElementById(
    "categoriasProductosAgregar"
  ).value;
  const proveedor = document.getElementById(
    "proveedorProductosAgregar"
  ).value;
  const descripcion = document.getElementById(
    "descripcionProductosAgregar"
  ).value;
  const precio = document.getElementById(
    "precioProductosAgregar"
  ).value;
  const URL = getURL() + "/prod/api";
  $.ajax({
    method: "POST", //Metodo
    url: URL, //End POINT
    data: {
      //Body
      categorias: categorias,
      proveedor: proveedor,
      descripcion: descripcion,
      precio: precio,
    },
    success: function (result) {
      if ((result.estado = 1)) {
        //Agregar la categoria a la tabla
        //Mandamos llamar a la categoria
        const productos = result.productos;
        let tabla = $("#tabla-productos").DataTable();
        let botones = generarBotones(productos);
        let nuevoRenglon = tabla.row
          .add([productos.categorias, botones])
          .node();
        //-----Linea agregada para el ID DEL RENGLON------------------------------
        $(nuevoRenglon).attr("id", "renglon_" + productos.id);
        //------------------------------------------------------------------------
        $(nuevoRenglon).find("td").addClass("table-td");
        tabla.draw(false);
        //Limpiamos los campos
        document.getElementById("categoriasProductosAgregar").value = "";
        document.getElementById("proveedorProductosAgregar").value = "";
        document.getElementById("descripcionProductosAgregar").value = "";
        document.getElementById("precioProductosAgregar").value = "";
       
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto guardada",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        alert(result.mensaje);
      }
    },
  });
}

function listaProductosFront() {
  let URL = getURL() + "/prod/api";
  
  //Vamos a usar la libreria JQUERY de Javascript
  $.ajax({
    method: "GET",
    url: URL,
    data: {},
    success: function (result) {
      let estado = result.estado;
      let mensaje = result.mensaje;
      //alert(mensaje)
      if (estado == 1) {
        //Vamos a mostrar las categorias
        let productos = result.productos;
        let tabla = $("#tabla-productos").DataTable();

        productos.forEach((productos) => {
          let Botones = generarBotones(productos);
          //alert(categoria.descripcion)
          //Aqui es donde debemos mostrar en la tabla
          //tabla.row.add([categoria.descripcion,Botones]).node.id = 'registro_'+categoria.id;
          let nuevoRenglon = tabla.row
            .add([productos.categorias, productos.proveedor, productos.descripcion, productos.precio
                ,Botones])
            .node();
          //-----Linea agregada para el ID DEL RENGLON
          $(nuevoRenglon).attr("id", "renglon_" + productos.id);
          //-------------------------------------------------------------
          $(nuevoRenglon).find("td").addClass("table-td");
          tabla.draw(false);
        });
      } else {
        alert(mensaje);
      }
    },
  });
}

function eliminarProductosById() {
  $.ajax({
    method: "DELETE",
    url: getURL() + "/prod/api/" + idEliminarProductos,
    data: {},
    success: function (result) {
      if ((result.estado = 1)) {
        //---------------------------------------------------------------
        //1.-Si se elimino de la DB
        //2.-Debemos eliminarlo de la tabla
        let tabla = $("#tabla-productos").DataTable();
        tabla
          .row("#renglon_" + idEliminarProductos)
          .remove()
          .draw();
        //---------------------------------------------------------------
        //3.-Mostrar el mensaje agradable
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Productos eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        //Mostrar el mensaje de que no se elimino
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Productos no eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });
}

function generarBotones(productos) {
    let Botones = '<div class="action-button">';
    Botones +=' <a';
    Botones +=' href="javascript:void(0);"';
    Botones +='  data-bs-toggle="modal"';
    Botones +=' data-bs-target="#add-actualizar"';
    Botones +=' >';
    Botones +='  <button onclick="identificaIdActualizar('+productos.id+')" type="button" class="btn btn-primary btn-icon-xxs">';
    Botones +='  <i class="fas fa-pencil-alt"></i>';
    Botones +='  </button>';
    Botones +=' </a>';

    Botones +=' <a';
    Botones +='href="javascript:void(0);"';
    Botones +=' data-bs-toggle="modal"';
    Botones +='  data-bs-target="#add-delete"';
    Botones +='>';
    Botones +='  <button onclick="identificaIdEliminar('+productos.id+')"  type="button" class="btn btn-danger btn-icon-xxs">';
    Botones +='   <i class="fas fa-trash-alt"></i>';
    Botones +='  </button>';
    Botones +=' </a>';
    Botones +=' </div>;';
/*
  let Botones = '<div class="flex space-x-3 rtl:space-x-reverse">';

  Botones +=
    '<button onclick="muestraUnaCategoriaFront(' +
    categoria.id +
    ')" data-bs-toggle="modal" data-bs-target="#viewModal" class="action-btn" type="button" >';
  Botones += '<iconify-icon icon="heroicons:eye"></iconify-icon>';
  Botones += "</button>";

  Botones +=
    '<button onclick="identificaIdActualizar(' +
    categoria.id +
    ')" data-bs-toggle="modal" data-bs-target="#updateModal" class="action-btn" type="button">';
  Botones += '<iconify-icon icon="heroicons:pencil-square"></iconify-icon>';
  Botones += "</button>";

  Botones +=
    '<button onclick="identificaIdEliminar(' +
    categoria.id +
    ')" data-bs-toggle="modal" data-bs-target="#deleteModal" class="action-btn" type="button">';
  Botones += '<iconify-icon icon="heroicons:trash"></iconify-icon>';
  Botones += "</button>";

  Botones += "</div>";
  */
  return Botones;
}

function identificaIdEliminar(id) {
  idEliminarProductos = id;
  //alert(idEliminarCategoria);
}

function actualizarProductosById() {
  let categoriasProductos = document.getElementById(
    "categoriasProductosActualizar"
  ).value;
  let proveedorProductos = document.getElementById(
    "proveedorProductosActualizar"
  ).value;

  let descripcionProductos = document.getElementById(
    "descripcionProductosActualizar"
  ).value;

  let precioProductos = document.getElementById(
    "precioProductosActualizar"
  ).value;

  $.ajax({
    method: "PUT",
    url: getURL() + "/prod/api/" + idActualizarProductos,
    data: {
      categorias: categoriasProductos,
      proveedor: proveedorProductos,
      descripcion: descripcionProductos,
      precio: precioProductos,
    },
    success: function (result) {
      if ((result.estado = 1)) {
        //alert(result.mensaje)
        //Debemos actualizar la tabla
        let tabla = $("#tabla-productos").DataTable();
        ////////////////////////////////////-------3 Pasos /////////
        let renglonTemporal = tabla
          .row("#renglon_" + idActualizarProductos)
          .data();
        renglonTemporal[0] = categoriasProductos;
        renglonTemporal[1] = proveedorProductos;
        renglonTemporal[2] = descripcionProductos;
        renglonTemporal[3] = precioProductos;
        tabla
          .row("#renglon_" + idActualizarProductos)
          .data(renglonTemporal)
          .draw();
        ///////////////////////////////////-----
      } else {
        alert(result.mensaje);
      }
    },
  });
}

function identificaIdActualizar(id) {
  idActualizarProductos = id;
  $.ajax({
    method: "GET",
    url: getURL() + "/prod/api/" + idActualizarProductos,
    data: {},
    success: function (result) {
      if ((result.estado = 1)) {
        let productos = result.productos;
        document.getElementById("categoriasProductosActualizar").value =
        productos.categorias;
        document.getElementById("proveedorProductosActualizar").value =
        productos.proveedor;
        document.getElementById("descripcionProductosActualizar").value =
        productos.descripcion;
        document.getElementById("precioProductosActualizar").value =
        productos.precio;
        //alert(categoria.descripcion)
      } else {
        alert(result.mensaje);
      }
    },
  });
}

//La mandamos llamar para que muestre el listado
listaProductosFront();

