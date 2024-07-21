import "dotenv/config";

import {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { toAsk, httpInject } from "@builderbot-plugins/openai-assistants";
import { typing } from "./utils/presence";
import { validContinue } from "./validContinue";
import { receiveMessage } from "./receiveMessage";
import { managerListContactDisable } from "./managerListContactDisable";
import { chunkIsCommand, extractURL} from "./sendMediaForMessages";
import { classifyTypeMedia } from "./classifyTypeMedia";

const PORT = process.env?.PORT ?? 3008;
const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? "";

const welcomeFlow = addKeyword<Provider, Database>(EVENTS.WELCOME).addAction(
  async (ctx, { flowDynamic, state, provider }) => {
    //agregar y eliminar contactos desactivados
    await managerListContactDisable(ctx);

    const isValidContinue = await validContinue(ctx);
    if (!isValidContinue) {
      return;
    }
    await typing(ctx, provider);

    const messageIncoming = await receiveMessage(ctx)||  ctx.body;

    const response = await toAsk(ASSISTANT_ID, messageIncoming, state);
    const chunks = response.split(/\n\n+/);
    for (const chunk of chunks) {
      if (chunkIsCommand(chunk)) {
        const numberPhone = ctx.key.remoteJid;
        const url = extractURL(chunk)
        const type = classifyTypeMedia(url);
        //los archivos deben estar en la carpeta public en al subcarpeta de su tipo
        const urlPublic = `public/${type}/${url}`;
        await provider.sendMedia(numberPhone, urlPublic , '');
        continue;
      }

      await flowDynamic([{ body: chunk.trim() }]);
    }
  }
);

const main = async () => {
  const adapterFlow = createFlow([welcomeFlow]);
  const adapterProvider = createProvider(Provider);
  const adapterDB = new Database();

  const { httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  httpInject(adapterProvider.server);
  httpServer(+PORT);
};

main();
