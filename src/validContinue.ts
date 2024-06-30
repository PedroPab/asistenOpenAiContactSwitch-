//validContinue
//miramos el contexto del mensaje , el origen del mensaje para saber si es valido o no

import { Context } from "@builderbot/bot";
import { BaileysProvider } from "@builderbot/provider-baileys";
import { listContactDisable } from "./listContactDisable";

// clase para guardar los contactos desactivados
export const validContinue = async (ctx: Context<BaileysProvider>) => {
  //miramos si esta en la lista de contactos desactivados
  const {from} = ctx;
  const listContactsDisable = listContactDisable.listContactsDisable
  if(listContactsDisable.includes(from)){
    return false;
  }
  return true;
};