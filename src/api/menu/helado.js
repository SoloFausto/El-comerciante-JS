import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function listAllHelados(){
    let getHelado = await prisma.helado.findMany();
    return getHelado;
}
export async function listByIdHelado(paramId){
    let heladoId = parseInt(paramId);
    let getHelado = await prisma.helado.findUnique({
        where: {
            id: heladoId
        }
    });
    return getHelado;
}
export async function createHelado(nombre,descripcion){
    let helado = await prisma.helado.create({
        data: {
            nombre: nombre,
            descripcion: descripcion
        }
    });
    return helado;
}
export async function modifyHelado(id,nombre,descripcion,activo){
    let idInt = parseInt(id);
    let activoBool = Boolean(activo);
    let updateHelado = await prisma.helado.update({
        where:{
            id: idInt
        },
        data:{
            nombre: nombre,
            descripcion: descripcion,
            activo: activoBool
        }
    })
    return updateHelado;
}

export async function deleteHelado(id){
    let idInt = parseInt(id);
    let deleteHelado = await prisma.helado.update({
        where: {
            id: idInt
        },
        data:{
            activo: 0
        }
    })
}