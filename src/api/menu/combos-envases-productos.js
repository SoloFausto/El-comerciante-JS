 
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
});
export async function addComboEnvase(paramIdCombo,paramIdEnvase){
    let idCombo = parseInt(paramIdCombo);
    let idEnvase = parseInt(paramIdEnvase);
    prisma.combo_envase.findUnique({
        where:{
            idCombo_idEnvase:{
                idCombo: idCombo,
                idEnvase: idEnvase
            }
        },
        select:{
            cantidad: true
        }
    }).then((cantidadEnvase)=>{
        
        if(cantidadEnvase == null){
            prisma.combo_envase.create({
                data:{
                    idCombo: idCombo,
                    idEnvase: idEnvase,
                    cantidad: 1
                }
            }).then((envaseCombo)=>{
                return envaseCombo;
            });
        }
        else{
            prisma.combo_envase.update({
                where:{
                    idCombo_idEnvase:{
                        idCombo: idCombo,
                        idEnvase: idEnvase
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
export async function deleteComboEnvase(paramIdCombo,paramIdEnvase){
    let idComboparsed  = parseInt(paramIdCombo);
    let idEnvaseparsed = parseInt(paramIdEnvase);
    console.log("find");
    prisma.combo_envase.findUnique({
        where:{
            idCombo_idEnvase:{
                idCombo: idComboparsed,
                idEnvase: idEnvaseparsed
            }
        },
        select:{
            cantidad: true
        }
    }).then((cantidadEnvase)=>{
    if (cantidadEnvase.cantidad == 1){
        console.log("delete");
        prisma.$executeRaw`DELETE FROM combo_envase WHERE idCombo = ${idComboparsed} AND idEnvase = ${idEnvaseparsed}`.then((result)=>{
            return result;
        });
    }
    else{
            console.log("Update");
            prisma.combo_envase.update({
                where:{
                    idCombo_idEnvase:{
                        idCombo: idComboparsed,
                        idEnvase: idEnvaseparsed
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

export async function addComboProducto(paramIdCombo,paramIdProducto){
    let idCombo = parseInt(paramIdCombo);
    let idProducto = parseInt(paramIdProducto);
    prisma.combo_producto.findUnique({
        where:{
            idCombo_idProducto:{
                idCombo: idCombo,
                idProducto: idProducto
            }
        },
        select:{
            cantidad: true
        }
    }).then((cantidadEnvase)=>{
        
        if(cantidadEnvase == null){
            prisma.combo_producto.create({
                data:{
                    idCombo: idCombo,
                    idProducto: idProducto,
                    cantidad: 1
                }
            }).then((envaseCombo)=>{
                return envaseCombo;
            });
        }
        else{
            prisma.combo_producto.update({
                where:{
                    idCombo_idProducto:{
                        idCombo: idCombo,
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
export async function deleteComboProducto(paramIdCombo,paramIdProducto){
    let idComboparsed  = parseInt(paramIdCombo);
    let idProductoParsed = parseInt(paramIdProducto);
    console.log("find");
    prisma.combo_producto.findUnique({
        where:{
            idCombo_idProducto:{
                idCombo: idComboparsed,
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
        prisma.$executeRaw`DELETE FROM combo_producto WHERE idCombo = ${idComboparsed} AND idProducto = ${idProductoParsed}`.then((result)=>{
            return result;
        });
        
        }
        else{
            console.log("Update");
            prisma.combo_producto.update({
                where:{
                    idCombo_idProducto:{
                        idCombo: idComboparsed,
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

