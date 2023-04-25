
import { PrismaClient } from '../../../node_modules/@prisma/client/index.js';
export async function verifyUser(username,password){
  const prisma = new PrismaClient();
    var getUser = await prisma.usuario.findMany({
      where: {
        nombre: username,
        contrasena: password
      }
    });
    return getUser;
  }
