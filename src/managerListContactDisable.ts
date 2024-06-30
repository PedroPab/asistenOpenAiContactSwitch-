//managerListContactDisable , recoger el contexto , y mira si el mensaje esta en un formato especifico , con nuestro pseudo lenguaje para agregar o eliminar contactos desactivados

// import { Context } from "@builderbot/bot";
// import { BaileysProvider } from "@builderbot/provider-baileys";
import { listContactDisable } from "./listContactDisable";

export const managerListContactDisable = async (ctx: any):Promise<any> => {
  const { body } = ctx;

  const action = body.split("=>")[0];
  const contactsInArray = body.split("=>")[1]
  //le quitamos lo corchetes y lo separamos por comas
  const contacts = contactsInArray?.replace("[", "").replace("]", "").split(",");

  switch (action) {
    case "Agregar":
      contacts?.forEach(contact => listContactDisable.addContactDisable(contact.trim()));
      break;
    case "Eliminar":
      contacts?.forEach(contact => listContactDisable.removeContactDisable(contact.trim()));
      break;
    case "Borrar todos los contactos desactivados":
      listContactDisable.removeAllContactDisable();
      break;
  }
}