// Module imports
import bodyParser from "../node_modules/body-parser/index.js";
import express from "../node_modules/express/index.js";
// constant declarations
const app = express(); 
const PORT = process.env.PORT || 3000;
global.mysqlCredentials = '';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));
//custom imports
import { verifyUser } from './api/users/login.js';
import { listAllEnvases, deleteEnvase, createEnvase, listByIdEnvases, modifyEnvase } from './api/menu/envases.js';
import { createHelado, deleteHelado, listAllHelados, listByIdHelado, modifyHelado } from "./api/menu/helados.js";

// LOGIN Y otras pantallas
app.get('/', (req, res) => {
  return res.redirect('/src/views/index.html');
});
app.post('/api/users/login',(req,res)=> {
  console.log(req.body.user);
  console.log(req.body.pass);
  verifyUser(req.body.user,req.body.pass).then((usuario)=>{
    if(usuario.length == 1){
      return res.redirect('/menu/envases');
    }
    else{
      return res.redirect('/src/views/index.html');
    }
      
  });
});

//Combos
app.get('/menu/combos', (req, res) => {
  return res.send('GET HTTP method on user resource');
});

app.post('/menu/combos', (req, res) => {
  return res.send('POST HTTP method on user resource');
});
app.put('/menu/combos', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});
app.delete('/menu/combos', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});




// Envases
app.get('/menu/envases', (req, res) => {
  let id = req.body.id;
  
  if(id != null){
    listByIdEnvases(id).then((envase)=>{
      return res.send((envase));
    });
    
  }
  else{
    listAllEnvases().then((envases)=>{
      return res.send(envases);
    });
  }
});

app.post('/menu/envases', (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let capacidad = req.body.capacidad;
  let precio = req.body.precio;
  createEnvase(nombre,descripcion,capacidad,precio).then((envase)=>{
    return res.send(envase);
  });

});
app.put('/menu/envases', (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let capacidad = req.body.capacidad;
  let precio = req.body.precio;
  let id = req.body.id;
  let activo = req.body.activo;
  modifyEnvase(id,nombre,descripcion,capacidad,precio,activo).then((envase)=>{
    return res.send(envase);
  });

});
app.delete('/menu/envases', (req, res) => {
  let id = req.body.id;
  deleteEnvase(id);
  return res.send();
});





// Helados
app.get('/menu/helados', (req, res) => {
  let id = req.body.id;
  
  if(id != null){
    listByIdHelado(id).then((envase)=>{
      return res.send((envase));
    });
    
  }
  else{
    listAllHelados().then((envases)=>{
      return res.send(envases);
    });
  }
});
app.post('/menu/helados', (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  createHelado(nombre,descripcion).then((helado)=>{
    return res.send(helado);
  })  
});
app.put('/menu/helados', (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let id = req.body.id;
  let activo = req.body.activo;
  modifyHelado(id,nombre,descripcion,activo).then((helado)=>{
    return res.send(helado);
  });
});
app.delete('/menu/helados', (req, res) => {
  let id = req.body.id;
  deleteHelado(id);
  return res.send();
});




//Productos
app.get('/menu/productos', (req, res) => {
  return res.send('GET HTTP method on user resource');
});
app.post('/menu/productos', (req, res) => {
  return res.send('POST HTTP method on user resource');
});
app.put('/menu/productos', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});
app.delete('/menu/productos', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});