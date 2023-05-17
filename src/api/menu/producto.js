import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function listAllProductos(){
    let getProducto = await prisma.producto.findMany();
    return getProducto;
}
export async function listByIdProducto(paramId){
    let getProducto = await prisma.producto.findUnique({
        where: {
            id: paramId
        }
    });
    return getProducto;
}
export async function createProducto(nombre,descripcion,precio){
    let precioInt = parseInt(precio);
    let producto = await prisma.producto.create({
        data: {
            activo: true,
            nombre: nombre,
            descripcion: descripcion,
            precio: precioInt
        }
    });
    return producto;
}
export async function modifyProducto(paramid,nombre,descripcion,precio,activo){
    let precioInt = parseInt(precio);
    let activoBool = Boolean(activo);
    let updateProducto = await prisma.producto.update({
        where:{
            id: paramid
        },
        data:{
            nombre: nombre,
            descripcion: descripcion,
            precio: precioInt,
            activo: activoBool
        }
    })
    return updateProducto;
}

export async function deleteProducto(paramid){
    await prisma.producto.update({
        where: {
            id: paramid
        },
        data:{
            activo: false
        }
    })
}