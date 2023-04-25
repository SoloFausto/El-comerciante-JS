import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function listAllComanda(){
    let getComanda = await prisma.comanda.findMany();
    return getComanda;
}
export async function listByIdComanda(paramId){
    let productoId = parseInt(paramId);
    let getProducto = await prisma.comanda.findUnique({
        where: {
            id: productoId
        }
    });
    return getComanda;
}
export async function createComanda(mesa,total,estado,idUsuario,fecha,formaPago){
    let mesaInt = parseInt(mesa);
    let totalInt = parseInt(total);
    let estadoInt = parseInt(estado);
    let idUsuarioInt = parseInt(idUsuario);
    let createComanda = await prisma.comanda.create({
        data: {
            mesa: mesaInt,
            total: totalInt,
            idUsuario: idUsuarioInt,
            fecha: fecha,
            forma_pago: formaPago
        }
    });
    return createComanda;
};
export async function modifyComanda(id,mesa,total,estado,idUsuario,fecha,formaPago){
    let idInt = parseInt(id);
    let mesaInt = parseInt(mesa);
    let totalInt = parseInt(total);
    let estadoInt = parseInt(estado);
    let idUsuarioInt = parseInt(idUsuario);
    let updateComanda = await prisma.comanda.update({
        where:{
            id: idInt
        },
        data:{
            estado: estadoInt,
            mesa: mesaInt,
            total: totalInt,
            idUsuario: idUsuarioInt,
            fecha: fecha,
            forma_pago: formaPago
        }
    })
    return updateComanda;
}

export async function deleteComanda(id){
    let idInt = parseInt(id);
    let deleteProducto = await prisma.comanda.update({
        where: {
            id: idInt
        },
        data:{
            estado: 0
        }
    })
}