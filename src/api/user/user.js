import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export async function searchUser(username){
  var getUser = await prisma.usuario.findFirst({
    where: {
      nombre: username,
    }
  });
  return getUser;
};

export async function registerUser(username,password){
  let encryptedPassword = await bcrypt.hash(password, 10);
  let user = await prisma.usuario.create({
    data:{
      nombre: username,
      contrasena: encryptedPassword,
      permComandas: false,
      permSoloLeerComandas: false,
      permMenu: false,
      permUsuario: false,
      permTableta: false,
      activo: true,
      token:""
    }
  })
  const token = jwt.sign(
    {user_id: user.id, user_password: encryptedPassword},
    process.env.TOKEN_KEY,
    {expiresIn: "2h"}
  );
  
  let usertoken =  await prisma.usuario.update({
    where:{
      id: user.id
    },
    data:{
      token: token
    }
  });
  return usertoken
}

export async function loginUser(username,password){
  var getUser = await prisma.usuario.findFirst({
    where: {
      nombre: username,
    }
  });
  if (getUser &&(await bcrypt.compare(password, getUser.contrasena))){
    const token = jwt.sign(
      {user_id: getUser.id, user_password: getUser.contrasena},
      process.env.TOKEN_KEY,
      {expiresIn: "2h"}
    );
    let usertoken =  await prisma.usuario.update({
      where:{
        id: getUser.id
      },
      data:{
        token: token
      }
    });
    return usertoken;
  }
  return 400;
}