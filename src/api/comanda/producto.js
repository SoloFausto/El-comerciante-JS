import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listAllProductoComanda(idComanda){
    let comandaId = parseInt(paramId);
    let getProducto = await prisma.producto_comanda.findUnique({
        where: {
            numComanda: comandaId
        }
    });
    return getProducto;
}
export async function deleteComandaProducto(paramIdComanda,paramIdProducto){
    let idComandaParsed  = parseInt(paramIdComanda);
    let idProductoParsed = parseInt(paramIdProducto);
    console.log("find");
    prisma.producto_comanda.findUnique({
        where:{
            idProducto_numComanda:{
                numComanda: idComandaParsed,
                idProducto: idProductoParsed
            }
        },
        select:{
            cantidad: true
        }
    }).then((cantidadProducto)=>{
        console.log(cantidadProducto);
    if (cantidadProducto.cantidad == 1){
        console.log("delete");
        prisma.$executeRaw`DELETE FROM producto_comanda WHERE idProducto = ${idProductoParsed} AND numComanda = ${idComandaParsed}`.then((result)=>{
            return result;
        });
        
        }
        else{
            console.log("Update");
            prisma.producto_comanda.update({
                where:{
                    idProducto_numComanda:{
                        numComanda: idComandaParsed,
                        idProducto: idProductoParsed
                    }
                },
                data:{
                    cantidad: {
                        decrement: 1
                    }
                }
            })
            .then((envaseCombo)=>{
                return envaseCombo;
            });
        };
    });
};
export async function addComandaProducto(paramIdComanda,paramIdProducto){
    let idComandaParsed = parseInt(paramIdComanda);
    let idProducto = parseInt(paramIdProducto);
    prisma.producto_comanda.findUnique({
        where:{
            idProducto_numComanda:{
                numComanda: idComandaParsed,
                idProducto: idProducto
            }
        },
        select:{
            cantidad: true
        }
    }).then((cantidadEnvase)=>{
        
        if(cantidadEnvase == null){
            prisma.producto_comanda.create({
                data:{
                    numComanda: idComandaParsed,
                    idProducto: idProducto,
                    cantidad: 1
                }
            }).then((envaseCombo)=>{
                return envaseCombo;
            });
        }
        else{
            prisma.producto_comanda.update({
                where:{
                    idProducto_numComanda:{
                        numComanda: idComandaParsed,
                        idProducto: idProducto
                    }
                },
                data:{
                    cantidad: {
                        increment: 1
                    }
                }
            })
            .then((envaseCombo)=>{
                return envaseCombo;
            });
        };
    });
};