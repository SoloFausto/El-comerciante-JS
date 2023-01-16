// Module imports
import bodyParser from "../node_modules/body-parser/index.js";
import { PrismaClient } from '../node_modules/@prisma/client/index.js '
import express from "../node_modules/express/index.js";
// constant declarations
const app = express(); 
const PORT = process.env.PORT || 3000;
global.mysqlCredentials = '';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('src/views'));
//custom imports
import { verifyUser } from './api/users/login.js';

// LOGIN Y otras pantallas
app.get('/', (req, res) => {
  return res.send('/src/views/index.html');
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

//Menu
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

app.get('/menu/envases', (req, res) => {
  return res.send('GET HTTP method on user resource');
});
app.post('/menu/envases', (req, res) => {
  return res.send('POST HTTP method on user resource');
});
app.put('/menu/envases', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});
app.delete('/menu/envases', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});

app.get('/menu/helados', (req, res) => {
  return res.send('GET HTTP method on user resource');
});
app.post('/menu/helados', (req, res) => {
  return res.send('POST HTTP method on user resource');
});
app.put('/menu/helados', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});
app.delete('/menu/helados', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});

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