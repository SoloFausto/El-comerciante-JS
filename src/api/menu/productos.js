import { PrismaClient } from '../../../node_modules/@prisma/client/index.js';
const prisma = new PrismaClient();


export async function listAllProductos(){
    let getProducto = await prisma.producto.findMany();
    return getProducto;
}
export async function listByIdProducto(paramId){
    let productoId = parseInt(paramId);
    let getProducto = await prisma.producto.findUnique({
        where: {
            id: productoId
        }
    });
    return getProducto;
}
export async function createProducto(nombre,descripcion,precio){
    let precioInt = parseInt(precio);
    let producto = await prisma.producto.create({
        data: {
            nombre: nombre,
            descripcion: descripcion,
            precio: precioInt
        }
    });
    return producto;
}
export async function modifyProducto(id,nombre,descripcion,precio,activo){
    let idInt = parseInt(id);
    let precioInt = parseInt(precio);
    let activoBool = Boolean(activo);
    let updateProducto = await prisma.producto.update({
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
    return updateProducto;
}

export async function deleteProducto(id){
    let idInt = parseInt(id);
    let deleteProducto = await prisma.producto.delete({
        where: {
            id: idInt
        }
    })
}