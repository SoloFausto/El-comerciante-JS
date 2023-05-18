// Module imports
import bodyParser from "../node_modules/body-parser/index.js";
import express from "../node_modules/express/index.js";
// constant declarations
const app = express(); 
app.use(express.json());
const PORT = process.env.PORT || 3000;
global.mysqlCredentials = '';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));
//custom imports
import { verifyUser } from './api/user/login.js';
import { listAllEnvases, deleteEnvase, createEnvase, listByIdEnvases, modifyEnvase } from './api/menu/envase.js';
import { createHelado, deleteHelado, listAllHelados, listByIdHelado, modifyHelado } from "./api/menu/helado.js";
import { createProducto, deleteProducto, listAllProductos, listByIdProducto, modifyProducto } from "./api/menu/producto.js";
import { createCombo, deleteCombo, modifyCombo,listByIdCombo,listAllCombos } from "./api/menu/combo.js";
import { addComboEnvase, deleteComboEnvase, addComboProducto, deleteComboProducto} from "./api/menu/combos-envases-productos.js";
import { listAllComanda, listByIdComanda, createComanda, modifyComanda, deleteComanda } from "./api/comanda/comanda.js";
import { addComandaProducto, deleteComandaProducto, listAllProductoComanda } from "./api/comanda/producto.js";
import { addComandaCombo, deleteComandaCombo, listAllComboComanda } from "./api/comanda/combo.js";
// LOGIN Y otras pantallas
app.get('/', (req, res) => {
  return res.redirect('/src/views/index.html');
});
app.post('/api/user/login',(req,res)=> {
  console.log(req.body.user);
  console.log(req.body.pass);
  verifyUser(req.body.user,req.body.pass).then((usuario)=>{
    if(usuario.length == 1){
      return res.redirect('/menu/envase');
    }
    else{
      return res.redirect('/src/views/index.html');
    }
      
  });
});

//Combos
app.get('/api/menu/combo', (req, res) => {
  let id = req.body.id;
  
  if(id != null){
    listByIdCombo(id).then((combo)=>{
      return res.send((combo));
    });
    
  }
  else{
    listAllCombos().then((combo)=>{
      return res.send(combo);
    });
  }
});

app.post('/api/menu/combo', (req, res) => {
  let recieviedCombo = req.body;
  createCombo(recieviedCombo).then((combo)=>{
    return res.send(combo);
  })
});
app.put('/api/menu/combo', (req, res) => {
  modifyCombo(req.body).then((combo)=>{
    return res.send(combo);
  });
});
app.delete('/api/menu/combo', (req, res) => {
  let id = req.body.id;
  deleteCombo(id);
  return res.send();
});


// combo-envase
app.get('/api/menu/combo', (req, res) => {
  let idCombo = req.body.idCombo;
  let idEnvase = req.body.idEnvase;
  
});
app.post('/api/menu/combo/envase',(req, res)=>{
  let idCombo = req.body.idCombo;
  let idEnvase = req.body.idEnvase;
  addComboEnvase(idCombo,idEnvase);
  return res.send();
});
app.delete('/api/menu/combo/envase',(req,res)=>{
  let idCombo = req.body.idCombo;
  let idEnvase = req.body.idEnvase;
  deleteComboEnvase(idCombo,idEnvase);
  return res.send();
});
//combo-producto
app.post('/api/menu/combo/producto',(req, res)=>{
  let idCombo = req.body.idCombo;
  let idProducto = req.body.idProducto;
  addComboProducto(idCombo,idProducto);
  return res.send();
});
app.delete('/api/menu/combo/producto',(req,res)=>{
  let idCombo = req.body.idCombo;
  let idProducto = req.body.idProducto;
  deleteComboProducto(idCombo,idProducto);
  return res.send();
})


// Envases
app.get('/api/menu/envase', (req, res) => {
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

app.post('/api/menu/envase', (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let capacidad = req.body.capacidad;
  let precio = req.body.precio;
  createEnvase(nombre,descripcion,capacidad,precio).then((envase)=>{
    return res.send(envase);
  });

});
app.put('/api/menu/envase', (req, res) => {
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
app.delete('/api/menu/envase', (req, res) => {
  let id = req.body.id;
  deleteEnvase(id);
  return res.send();
});

// Helados
app.get('/api/menu/helado', (req, res) => {
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
app.post('/api/menu/helado', (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  createHelado(nombre,descripcion).then((helado)=>{
    return res.send(helado);
  })  
});
app.put('/api/menu/helado', (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let id = req.body.id;
  let activo = req.body.activo;
  modifyHelado(id,nombre,descripcion,activo).then((helado)=>{
    return res.send(helado);
  });
});
app.delete('/api/menu/helado', (req, res) => {
  let id = req.body.id;
  deleteHelado(id);
  return res.send();
});




//Productos
app.get('/api/menu/producto', (req, res) => {
  let id = req.body.id;
  if(id != null){

    listByIdProducto(id).then((envase)=>{
      return res.send((envase));
    });
    
  }
  else{
    listAllProductos().then((envases)=>{
      return res.send(envases);
    });
  }
});

app.post('/api/menu/producto', (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;
  createProducto(nombre,descripcion,precio).then((producto)=>{
    return res.send(producto);
  })  
});

app.put('/api/menu/producto', (req, res) => {
  let id = req.body.id;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;
  let activo = req.body.activo;
  modifyProducto(id,nombre,descripcion,precio,activo).then((producto)=>{
    return res.send(producto);
  });
});
app.delete('/api/menu/producto', (req, res) => {
  let id = req.body.id;
  deleteProducto(id);
  return res.send();
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//comandas

app.get('/api/comanda', (req, res) => {
  let id = req.body.id;
  
  if(id != null){
    listByIdComanda(id).then((envase)=>{
      return res.send((envase));
    });
    
  }
  else{
    listAllComanda().then((envases)=>{
      return res.send(envases);
    });
  }
});
app.post('/api/comanda',(req, res)=>{
  let mesa = req.body.mesa;
  let total = req.body.total;
  let estado = req.body.estado;
  let idUsuario = req.body.idUsuario;
  let fecha = new Date();
  let formaPago = req.body.formaPago;
  createComanda(mesa,total,estado,idUsuario,fecha,formaPago).then((comanda)=>{
    return res.send(comanda);
  })
});
app.put('/api/comanda',(req,res)=>{
  let id = req.body.id;
  let mesa = req.body.mesa;
  let total = req.body.total;
  let estado = req.body.estado;
  let idUsuario = req.body.idUsuario;
  let formaPago = req.body.forma_pago;
  modifyComanda(id,mesa,total,estado,idUsuario,formaPago).then((comanda)=>{
    return res.send(comanda);
  });
});
app.delete('/api/comanda', (req, res) => {
  let id = req.body.id;
  deleteComanda(id);
  return res.send();
});
//comanda producto
app.get('/api/comanda/producto',(req, res)=>{
  let idComanda = req.body.idComanda;
  listAllProductoComanda(idComanda).then((producto)=>{
    return res.send(producto);
  });

});
app.post('/api/comanda/producto',(req, res)=>{
  let idComanda = req.body.idComanda;
  let idProducto = req.body.idProducto;
  addComandaProducto(idComanda,idProducto);
  return res.send();
});
app.delete('/api/comanda/producto',(req,res)=>{
  let idComanda = req.body.idComanda;
  let idProducto = req.body.idProducto;
  deleteComandaProducto(idComanda,idProducto);
  return res.send();
});
//comanda combo
app.get('/api/comanda/combo',(req, res)=>{
  let idComanda = req.body.idComanda;
  listAllComboComanda(idComanda).then((producto)=>{
    return res.send(producto);
  });

});
app.post('/api/comanda/combo',(req, res)=>{
  let idComanda = req.body.idComanda;
  let idCombo = req.body.idCombo;
  addComandaCombo(idComanda,idCombo);
  return res.send();
});
app.delete('/api/comanda/combo',(req,res)=>{
  let idComanda = req.body.idComanda;
  let idCombo = req.body.idCombo;
  deleteComandaCombo(idComanda,idCombo);
  return res.send();
});