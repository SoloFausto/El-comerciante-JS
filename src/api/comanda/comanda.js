import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// {
//     "mesa": 1,
//     "precio": 1,
//     "activo": true,
//     "idUsuario": "",
//     "fecha":"",
//     "formaPago": "",
//     "productoIdCollection": [
//       {
//         "productoId": "",
//         "notas": ""
//       },
//       {
//         "productoId": "",
//         "notas": ""
//       }
//     ],
//     "heladoEnvaseCollection": [
//       {
//         "envaseId": "",
//         "notas":"",
//         "heladoIdCollection": [""]
//       }
//     ],
//     "comboCollection": [
//       {
//         "comboId": "",
//         "notas": "",
//         "filledEnvaseCollection":[
//           {
//             "envaseId": "",
//             "heladoIdCollection": []
//           }
//         ]
//       }
//     ]
//  }

export async function listAllComanda(){
    let getComanda = await prisma.comanda.findMany();
    return getComanda;
}
export async function listByIdComanda(paramId){
    let getComanda = await prisma.comanda.findUnique({
        where: {
            id: paramId
        }
    });
    return getComanda;
}
export async function createComanda(paramComanda){
    let createComanda = await prisma.comanda.create({
        data:{
            mesa: paramComanda.mesa,
            precio: paramComanda.precio,
            activo: true,
            idUsuario: paramComanda.idUsuario,
            fecha: paramComanda.fecha,
            formaPago: paramComanda.formaPago,
            productoIdCollection: paramComanda.productoIdCollection,
            heladoEnvaseCollection: paramComanda.heladoEnvaseCollection,
            comboCollection: paramComanda.comboCollection
        }
    });
    return createComanda;
};
export async function modifyComanda(paramComanda){

    let updateComanda = await prisma.comanda.update({
        where:{
            id: paramComanda.id
        },
        data:{
            mesa: paramComanda.mesa,
            precio: paramComanda.precio,
            activo: true,
            idUsuario: paramComanda.idUsuario,
            fecha: paramComanda.fecha,
            formaPago: paramComanda.formaPago,
            productoIdCollection: paramComanda.productoIdCollection,
            heladoEnvaseCollection: paramComanda.heladoEnvaseCollection,
            comboCollection: paramComanda.comboCollection
        }
    });
    return updateComanda;
}

export async function deleteComanda(paramid){

    let deleteProducto = await prisma.comanda.update({
        where: {
            id: paramid
        },
        data:{
            activo: ""
        }
    });
}