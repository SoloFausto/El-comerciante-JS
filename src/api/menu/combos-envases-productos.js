const prisma = new PrismaClient();
import { PrismaClient } from '../../../node_modules/@prisma/client/index.js';

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
        }
        else if (cantidadEnvase.cantidad == 1){
            console.log(cantidadEnvase.cantidad);
            prisma.combo_envase.delete({
                where:{
                    idCombo_idEnvase:{
                        idCombo: 1,
                        idEnvase: 1
                    }
                }
            })
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
