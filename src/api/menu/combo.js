import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function listAllCombos(){
    let getCombo = await prisma.combo.findMany();
    return getCombo;
}
export async function listByIdCombo(paramId){
    let getCombo = await prisma.combo.findUnique({
        where: {
            id: paramId
        }
    });
    return getCombo;
}
export async function createCombo(paramCombo){
    let precioInt = parseInt(paramCombo.precio);
    let combo = await prisma.combo.create({
        data: {
            nombre: paramCombo.nombre,
            descripcion: paramCombo.descripcion,
            precio: precioInt,
            productoIdCollection: paramCombo.productoIdCollection,
            envaseIdCollection: paramCombo.envaseIdCollection,
            activo: true
        }
    });
    return combo;
}
export async function modifyCombo(paramCombo){
    let precioInt = parseInt(paramCombo.precio);
    let activoBool = Boolean(paramCombo.activo);
    let updateCombo = await prisma.combo.update({
        where:{
            id: paramCombo.id
        },
        data:{
            nombre: paramCombo.nombre,
            descripcion: paramCombo.descripcion,
            precio: precioInt,
            activo: activoBool,
            productoIdCollection: paramCombo.productoIdCollection,
            envaseIdCollection: paramCombo.envaseIdCollection,
        }
    })
    return updateCombo;
}

export async function deleteCombo(paramid){
    let deleteCombo = await prisma.combo.update({
        where: {
            id: paramid
        },
        data:{
            activo: false
        }
    })
}

