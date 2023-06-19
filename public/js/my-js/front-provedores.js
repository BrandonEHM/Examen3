//alert('Hola mundo del Front de categorias');

//Vamos a crear funciones para comunicarnos con el back - API - END-POINT
//Creamos la funcion
let idEliminarProvedores = 0;
let idActualizarProvedores = 0;

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
function agregarProvedores() {
  const nombre = document.getElementById(
    "nombreProvedoresAgregar"
  ).value;
  const direccion = document.getElementById(
    "direccionProvedoresAgregar"
  ).value;
  const telefono = document.getElementById(
    "telefonoProvedoresAgregar"
  ).value;
  const URL = getURL() + "/prov/api";
  $.ajax({
    method: "POST", //Metodo
    url: URL, //End POINT
    data: {
      //Body
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
    },
    success: function (result) {
      if ((result.estado = 1)) {
        //Agregar la categoria a la tabla
        //Mandamos llamar a la categoria
        const provedores = result.provedores;
        let tabla = $("#tabla-provedores").DataTable();
        let botones = generarBotones(provedores);
        let nuevoRenglon = tabla.row
          .add([provedores.nombre, provedores.direccion, provedores.telefono, botones])
          .node();
        //-----Linea agregada para el ID DEL RENGLON------------------------------
        $(nuevoRenglon).attr("id", "renglon_" + provedores.id);
        //------------------------------------------------------------------------
        $(nuevoRenglon).find("td").addClass("table-td");
        tabla.draw(false);
        //Limpiamos los campos
        document.getElementById("nombreProvedoresAgregar").value = "";
        document.getElementById("direccionProvedoresAgregar").value = "";
        document.getElementById("telefonoProvedoresAgregar").value = "";
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Provedor guardada",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        alert(result.mensaje);
      }
    },
  });
}

function listaProvedoresFront() {
  let URL = getURL() + "/prov/api";
  
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
        let provedores = result.provedores;
        let tabla = $("#tabla-provedores").DataTable();

        provedores.forEach((provedores) => {
          let Botones = generarBotones(provedores);
          //alert(categoria.descripcion)
          //Aqui es donde debemos mostrar en la tabla
          //tabla.row.add([categoria.descripcion,Botones]).node.id = 'registro_'+categoria.id;
          let nuevoRenglon = tabla.row
            .add([provedores.nombre, provedores.direccion , provedores.telefono
                ,Botones])
            .node();
          //-----Linea agregada para el ID DEL RENGLON
          $(nuevoRenglon).attr("id", "renglon_" + provedores.id);
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

function eliminarProvedoresById() {
  $.ajax({
    method: "DELETE",
    url: getURL() + "/prov/api/" + idEliminarProvedores,
    data: {},
    success: function (result) {
      if ((result.estado = 1)) {
        //---------------------------------------------------------------
        //1.-Si se elimino de la DB
        //2.-Debemos eliminarlo de la tabla
        let tabla = $("#tabla-provedores").DataTable();
        tabla
          .row("#renglon_" + idEliminarProvedores)
          .remove()
          .draw();
        //---------------------------------------------------------------
        //3.-Mostrar el mensaje agradable
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Provedores eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        //Mostrar el mensaje de que no se elimino
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Provedores no eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });
}

function generarBotones(provedores) {
    let Botones = '<div class="action-button">';
    Botones +=' <a';
    Botones +=' href="javascript:void(0);"';
    Botones +='  data-bs-toggle="modal"';
    Botones +=' data-bs-target="#add-actualizar"';
    Botones +=' >';
    Botones +='  <button onclick="identificaIdActualizar('+provedores.id+')" type="button" class="btn btn-primary btn-icon-xxs">';
    Botones +='  <i class="fas fa-pencil-alt"></i>';
    Botones +='  </button>';
    Botones +=' </a>';
    Botones +=' <a';
    Botones +='href="javascript:void(0);"';
    Botones +=' data-bs-toggle="modal"';
    Botones +='  data-bs-target="#add-delete"';
    Botones +='>';
    Botones +='  <button onclick="identificaIdEliminar('+provedores.id+')"  type="button" class="btn btn-danger btn-icon-xxs">';
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
  idEliminarProvedores = id;
  //alert(idEliminarCategoria);
}

function actualizarProvedoresById() {
  let nombreProvedores= document.getElementById(
    "nombreProvedoresActualizar"
  ).value;
  let direccionProvedores= document.getElementById(
    "direccionProvedoresActualizar"
  ).value;
  let telefonoProvedores= document.getElementById(
    "telefonoProvedoresActualizar"
  ).value;
  $.ajax({
    method: "PUT",
    url: getURL() + "/prov/api/" + idActualizarProvedores,
    data: {
      nombre: nombreProvedores,
      direccion: direccionProvedores,
      telefono: telefonoProvedores,
      
    },
    success: function (result) {
      if ((result.estado = 1)) {
        //alert(result.mensaje)
        //Debemos actualizar la tabla
        let tabla = $("#tabla-provedores").DataTable();
        ////////////////////////////////////-------3 Pasos /////////
        let renglonTemporal = tabla
          .row("#renglon_" + idActualizarProvedores)
          .data();
        renglonTemporal[0] = nombreProvedores;
        renglonTemporal[1] = direccionProvedores;
        renglonTemporal[2] = telefonoProvedores;
        tabla
          .row("#renglon_" + idActualizarProvedores)
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
  idActualizarProvedores = id;
  $.ajax({
    method: "GET",
    url: getURL() + "/prov/api/" + idActualizarProvedores,
    data: {},
    success: function (result) {
      if ((result.estado = 1)) {
        let provedores = result.provedores;
        document.getElementById("nombreProvedoresActualizar").value =
          provedores.nombre;
        document.getElementById("direccionProvedoresActualizar").value =
          provedores.direccion;
          document.getElementById("telefonoProvedoresActualizar").value =
          provedores.telefono;

        //alert(categoria.descripcion)
      } else {
        alert(result.mensaje);
      }
    },
  });
}

//La mandamos llamar para que muestre el listado
listaProvedoresFront();

