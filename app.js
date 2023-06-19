const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');
const puerto = process.env.PORT || 3000;


//-----------------------------------------------------------------------
//Rutas personalizadas
const rutasCategoriasAPI = require('./src/routes/categorias-routes-api');
const rutasProductosAPI = require('./src/routes/productos-routes-api');
const rutasProvedoresAPI = require('./src/routes/provedores-routes-api');
// --- const rutasUsuarioAPI = require('./src/routes/usuarios-routes-api');
// --- const rutasAuthAPI = require('./src/routes/auth-routes-api');
//-----------------------------------------------------------------------

const app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials',()=>{});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extenden : true}));
app.use(bodyParser.json())

//Definir rutas: login, categorias, index y Not Found
//GETS o POST

app.get('/',(req,res)=>{
    res.render('index');    
})


app.get('/prod',(req,res)=>{
    res.render('productos');    
})

app.get('/login',(req,res)=>{
    res.render('login');    
})
app.get('/cat',(req,res)=>{
    res.render('categorias');    
})

app.get('/prov',(req,res)=>{
    res.render('provedores');    
})

app.get('/clientes',(req,res)=>{
    res.render('clientes');    
})

app.get('/venta',(req,res)=>{
    res.render('ventas');    
})

app.get('/ventana',(req,res)=>{
    res.render('ventanafact');    
})

app.get('/factura',(req,res)=>{
    res.render('facturas');    
})

app.get('/categorias',(req,res)=>{
    res.render('tabla_categorias');    
})

//-----------------------------------------------------------------------
//Me regresa en formato JSON los datos de categoria
app.use('/categorias/api',rutasCategoriasAPI);
app.use('/prod/api', rutasProductosAPI);
app.use('/prov/api',rutasProvedoresAPI);
// --- app.use('/usuarios/api',rutasUsuarioAPI);
// --- app.use('/auth/api',rutasAuthAPI);
//app.use('/productos/api',)



//-----------------------------------------------------------------------

app.get('*',(req,res)=>{
    res.render('404');
})

//Definir puerto en que se escuchan solicitudes
app.listen(puerto,()=>{
    console.log('El servidor esta corriendo en el puero: ' ,puerto);    
})