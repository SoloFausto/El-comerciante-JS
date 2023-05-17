import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function listAllHelados(){
    let getHelado = await prisma.helado.findMany();
    return getHelado;
}
export async function listByIdHelado(paramId){
    console.log(typeof paramId);
    let getHelado = await prisma.helado.findUnique({
        where: {
            id: paramId
        }
    });
    return getHelado;
}
export async function createHelado(nombre,descripcion){
    let helado = await prisma.helado.create({
        data: {
            activo: true,
            nombre: nombre,
            descripcion: descripcion
        }
    });
    return helado;
}
export async function modifyHelado(paramId,nombre,descripcion,activo){
    let activoBool = Boolean(activo);
    let updateHelado = await prisma.helado.update({
        where:{
            id: paramId
        },
        data:{
            nombre: nombre,
            descripcion: descripcion,
            activo: activoBool
        }
    })
    return updateHelado;
}

export async function deleteHelado(paramId){
    await prisma.helado.update({
        where: {
            id: paramId
        },
        data:{
            activo: false
        }
    })
}