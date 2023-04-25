import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function listAllCombos(){
    let getCombo = await prisma.combo.findMany();
    return getCombo;
}
export async function listByIdCombo(paramId){
    let comboId = parseInt(paramId);
    let getCombo = await prisma.combo.findUnique({
        where: {
            id: comboId
        }
    });
    return getCombo;
}
export async function createCombo(nombre,descripcion,precio){
    let precioInt = parseInt(precio);
    let combo = await prisma.combo.create({
        data: {
            nombre: nombre,
            descripcion: descripcion,
            precio: precioInt
        }
    });
    return combo;
}
export async function modifyCombo(id,nombre,descripcion,precio,activo){
    let idInt = parseInt(id);
    let precioInt = parseInt(precio);
    let activoBool = Boolean(activo);
    let updateCombo = await prisma.combo.update({
        where:{
            id: idInt
        },
        data:{
            nombre: nombre,
            descripcion: descripcion,
            precio: precioInt,
            activo: activoBool
        }
    })
    return updateCombo;
}

export async function deleteCombo(id){
    let idInt = parseInt(id);
    let deleteCombo = await prisma.combo.update({
        where: {
            id: idInt
        },
        data:{
            activo: 0
        }
    })
}

