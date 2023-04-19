const prisma = new PrismaClient();
import { PrismaClient } from '../../../node_modules/@prisma/client/index.js';

export async function addComboEnvase(paramIdCombo,paramIdEnvase){
    let idCombo = parseInt(paramIdCombo);
    let idEnvase = parseInt(paramIdEnvase);
    prisma.combo_envase.findUnique({
        where:{
            idCombo: idCombo,
            idEnvase: idEnvase
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
            prisma.combo.update({
                where:{
                    idCombo: idCombo,
                    idEnvase: idEnvase
                },
                data:{
                    cantidad: cantidadEnvase++
                }
            })
            .then((envaseCombo)=>{
                return envaseCombo;
            });
        };
    });
}
