import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listAllComboComanda(idComanda){
    let comandaId = parseInt(idComanda);
    prisma.$executeRaw`SELECT * FROM combo_comanda WHERE numComanda = ${comandaId}`.then((result)=>{
        return result;
    });
}
export async function deleteComandaCombo(paramIdComanda,paramIdCombo){
    let idComandaParsed  = parseInt(paramIdComanda);
    let idComboParsed = parseInt(paramIdCombo);
    console.log("find");
    prisma.combo_comanda.findUnique({
        where:{
            idCombo_numComanda:{
                numComanda: idComandaParsed,
                idCombo: idComboParsed
            }
        },
        select:{
            cantidad: true
        }
    }).then((cantidadCombo)=>{
    if (cantidadCombo.cantidad == 1){
        prisma.$executeRaw`DELETE FROM producto_comanda WHERE idCombo = ${idComboParsed} AND numComanda = ${idComandaParsed}`.then((result)=>{
            return result;
        });
        
        }
        else{
            console.log("Update");
            prisma.producto_comanda.update({
                where:{
                    idCombo_numComanda:{
                        numComanda: idComandaParsed,
                        idCombo: idComboParsed
                    }
                },
                data:{
                    cantidad: {
                        decrement: 1
                    }
                }
            })
            .then((comandaCombo)=>{
                return comandaCombo;
            });
        };
    });
};
export async function addComandaCombo(paramIdComanda,paramIdCombo){
    let idComandaParsed = parseInt(paramIdComanda);
    let idComboParsed = parseInt(paramIdCombo);
    prisma.$executeRaw`SELECT cantidad FROM combo_comanda WHERE idCombo = ${idComboParsed} AND numComanda = ${idComandaParsed}`.then((cantidadCombo)=>{
        if(cantidadCombo == null){
            prisma.producto_comanda.create({
                data:{
                    idComanda: idComandaParsed,
                    idCombo: idComboParsed,
                    cantidad: 1
                }
            }).then((comboComanda)=>{
                return comboComanda;
            });
        }
        else{
            prisma.producto_comanda.update({
                where:{
                    idCombo_numComanda:{
                        numComanda: idComandaParsed,
                        idCombo: idComboParsed
                    }
                },
                data:{
                    cantidad: {
                        increment: 1
                    }
                }
            })
            .then((comandaCombo)=>{
                return comandaCombo;
            });
        };
    });
};