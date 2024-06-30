//miramos el contexto del mensaje, ya sea texto, imagen o audio para devolver el mensaje en texto
import { Context } from "@builderbot/bot";
import { BaileysProvider } from "@builderbot/provider-baileys";

export const receiveMessage = async (ctx: Context<BaileysProvider>) => {
  const { from, body } = ctx;
  // if (body) {
  //   return body;
  // }
  //mira si es una imagen
  if (ctx.mediaType === "image") {
    return "imagen";
  }
  //mira si es un audio
  if (ctx.mediaType === "audio") {
    return "audio";
  }
  return null;
};