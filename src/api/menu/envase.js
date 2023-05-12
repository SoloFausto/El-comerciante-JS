const prisma = new PrismaClient();
import { PrismaClient } from '@prisma/client';
export async function listAllEnvases(){
    let getEnvase = await prisma.envase.findMany();
    return getEnvase;
}
export async function listByIdEnvases(paramId){
    let envaseId = parseInt(paramId);
    let getEnvase = await prisma.envase.findUnique({
        where: {
            id: envaseId
        }
    });
    return getEnvase;
}
export async function createEnvase(nombre,descripcion,capacidad,precio){
    let capacidadInt = parseInt(capacidad);
    let precioInt = parseInt(precio);
    let envase = await prisma.envase.create({
        data: {
            nombre: nombre,
            descripcion: descripcion,
            capacidad: capacidadInt,
            precio: precioInt,
            activo: true
        }
    });
    return envase;
}
export async function modifyEnvase(id,nombre,descripcion,capacidad,precio,activo){
    let capacidadInt = parseInt(capacidad);
    let precioInt = parseInt(precio);
    let activoBool = Boolean(activo);
    let idInt = parseInt(id);
    let updateEnvase = await prisma.envase.update({
        where: {
            id: idInt
        },
        data:{
            nombre: nombre,
            descripcion: descripcion,
            capacidad: capacidadInt,
            precio: precioInt,
            activo:activoBool
        }
    });
    return updateEnvase;

}
export async function deleteEnvase(id){
    let idInt = parseInt(id);
    let deleteEnvase = await prisma.envase.update({
        where: {
            id: idInt
        },
        data:{
            activo: false
        }
    });

}