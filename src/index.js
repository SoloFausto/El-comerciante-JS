// Module imports
import bodyParser from "../node_modules/body-parser/index.js";
import express from "../node_modules/express/index.js";
import jwt from 'jsonwebtoken';

// constant declarations
const app = express(); 
app.use(express.json());
const PORT = process.env.PORT || 3000;
const config = process.env;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'));
//custom imports
import { searchUser,registerUser, loginUser } from './api/user/user.js';
import { listAllEnvases, deleteEnvase, createEnvase, listByIdEnvases, modifyEnvase } from './api/menu/envase.js';
import { createHelado, deleteHelado, listAllHelados, listByIdHelado, modifyHelado } from "./api/menu/helado.js";
import { createProducto, deleteProducto, listAllProductos, listByIdProducto, modifyProducto } from "./api/menu/producto.js";
import { createCombo, deleteCombo, modifyCombo,listByIdCombo,listAllCombos } from "./api/menu/combo.js";
import { listAllComanda, listByIdComanda, createComanda, modifyComanda, deleteComanda } from "./api/comanda/comanda.js";
// LOGIN Y otras pantallas

const verifyToken = (req, res, next) =>{
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token){
      return res.status(403).send("A token is required for authentication");
  } 
  try{
      const decodedToken = jwt.verify(token, config.TOKEN_KEY);
      req.user = decodedToken;
  } catch (err) {
      return res.status(401).send("Invalid Token");
  }
  return next();
};

app.get('/', (req, res) => {
  return res.redirect('/src/views/index.html');
});


app.post('/api/user/login',(req,res)=> {
  var { username, password } = req.body;
  if (!(username && password)){
    res.status(400).send("All inputs are required");
  }
  loginUser(username,password).then((userLogin)=>{
    if(userLogin == 400){
      res.status(400).send("Invalid Credentials")
    }else{
      res.status(200).json(userLogin);
    }
  });
});


app.post('/api/user/register', (req,res)=>{
  var { username, password } = req.body;
  if (!(username && password)){
    res.status(400).send("All inputs are required");
  }
  searchUser(username).then((olduser)=>{
    if (olduser){
      res.status(409).send("User already exists. Please login");
    }
    var registeredUser = registerUser(username,password);
    res.status(201).json(registeredUser);
  });
  
  
});
//Combos
app.get('/api/menu/combo', verifyToken, (req, res) => {
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

app.post('/api/menu/combo', verifyToken, (req, res) => {
  let recieviedCombo = req.body;
  createCombo(recieviedCombo).then((combo)=>{
    return res.send(combo);
  })
});
app.put('/api/menu/combo', verifyToken, (req, res) => {
  modifyCombo(req.body).then((combo)=>{
    return res.send(combo);
  });
});
app.delete('/api/menu/combo', verifyToken, (req, res) => {
  let id = req.body.id;
  deleteCombo(id);
  return res.send();
});


// Envases
app.get('/api/menu/envase', verifyToken, (req, res) => {
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

app.post('/api/menu/envase', verifyToken, (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let capacidad = req.body.capacidad;
  let precio = req.body.precio;
  createEnvase(nombre,descripcion,capacidad,precio).then((envase)=>{
    return res.send(envase);
  });

});
app.put('/api/menu/envase', verifyToken, (req, res) => {
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
app.delete('/api/menu/envase', verifyToken, (req, res) => {
  let id = req.body.id;
  deleteEnvase(id);
  return res.send();
});

// Helados
app.get('/api/menu/helado', verifyToken, (req, res) => {
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
app.post('/api/menu/helado', verifyToken, (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  createHelado(nombre,descripcion).then((helado)=>{
    return res.send(helado);
  })  
});
app.put('/api/menu/helado', verifyToken, (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let id = req.body.id;
  let activo = req.body.activo;
  modifyHelado(id,nombre,descripcion,activo).then((helado)=>{
    return res.send(helado);
  });
});
app.delete('/api/menu/helado', verifyToken, (req, res) => {
  let id = req.body.id;
  deleteHelado(id);
  return res.send();
});




//Productos
app.get('/api/menu/producto', verifyToken, (req, res) => {
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

app.post('/api/menu/producto', verifyToken, (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;
  createProducto(nombre,descripcion,precio).then((producto)=>{
    return res.send(producto);
  })  
});

app.put('/api/menu/producto', verifyToken, (req, res) => {
  let id = req.body.id;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;
  let activo = req.body.activo;
  modifyProducto(id,nombre,descripcion,precio,activo).then((producto)=>{
    return res.send(producto);
  });
});
app.delete('/api/menu/producto', verifyToken, (req, res) => {
  let id = req.body.id;
  deleteProducto(id);
  return res.send();
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//comandas

app.get('/api/comanda', verifyToken, (req, res) => {
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
app.post('/api/comanda', verifyToken,(req, res)=>{
  let recievedComanda = req.body;
  createComanda(recievedComanda).then((comanda)=>{
    return res.send(comanda);
  })
});
app.put('/api/comanda', verifyToken,(req,res)=>{
  let recievedComanda = req.body;
  modifyComanda(recievedComanda).then((comanda)=>{
    return res.send(comanda);
  });
});
app.delete('/api/comanda', verifyToken, (req, res) => {
  let id = req.body.id;
  deleteComanda(id);
  return res.send();
});
