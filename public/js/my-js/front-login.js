//alert('Hola mundo del Front de categorias');

//Vamos a crear funciones para comunicarnos con el back - API - END-POINT
//Creamos la funcion
let idEliminarCategoria = 0;
let idActualizarCategoria = 0;

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
function agregarLogin() {
  const usuario = document.getElementById("usuarioLoginAgregar").value;
  const nombre = document.getElementById("nombreLoginAgregar").value;
  const contraseña = document.getElementById("contraseñaLoginAgregar").value;
  const URL = getURL() + "/login/api";
  $.ajax({
    method: "POST", //Metodo
    url: URL, //End POINT
    data: {
      //Body
      usuario: usuario,
      nombre: nombre,
      contraseña: contraseña,
    },
    success: function (result) {
      if ((result.estado = 1)) {
        //Agregar la categoria a la tabla
        //Mandamos llamar a la categoria
        const login = result.categoria;
        let tabla = $("#tabla-loginfrom").DataTable();
        let botones = generarBotones(login);
        let nuevoRenglon = tabla.row.add([login.usuario, botones]).node();
        //-----Linea agregada para el ID DEL RENGLON------------------------------
        $(nuevoRenglon).attr("id", "renglon_" + login.id);
        //------------------------------------------------------------------------
        $(nuevoRenglon).find("td").addClass("table-td");
        tabla.draw(false);
        //Limpiamos los campos
        document.getElementById("usuarioLoginAgregar").value = "";
        document.getElementById("nombreLoginAgregar").value = "";
        document.getElementById("contraseñaLoginAgregar").value = "";
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cuenta guardada",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        alert(result.mensaje);
      }
    },
  });
}

function listaLoginFront() {
  let URL = getURL() + "/login/api";

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
        let login = result.login;
        let tabla = $("#tabla-loginfrom").DataTable();

        login.forEach((login) => {
          let Botones = generarBotones(login);
          //alert(categoria.descripcion)
          //Aqui es donde debemos mostrar en la tabla
          //tabla.row.add([categoria.descripcion,Botones]).node.id = 'registro_'+categoria.id;
          let nuevoRenglon = tabla.row
            .add([login.usuario, login.nombre, login.contraseña, Botones])
            .node();
          //-----Linea agregada para el ID DEL RENGLON
          $(nuevoRenglon).attr("id", "renglon_" + login.id);
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

function generarBotones(categoria) {
  let Botones = '<div class="form-group mt-3">';
  Botones += '<input id="password" name="dzName" required class="form-control" placeholder="Contraseña" type="text">';
  Botones += '</div>';

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

//La mandamos llamar para que muestre el listado
listaLoginFront();
//alert('Hola')
