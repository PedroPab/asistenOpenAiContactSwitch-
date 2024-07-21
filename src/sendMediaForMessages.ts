//miramos si el chunk del mensaje es un comando para agregar una imagen o un video

export const chunkIsCommand = (chunk: string) => {
  //el comando debe es cuando el mensaje empieza con corchetes y termina con corchetes con una url en medio
  const regex = /\[(.*?)\]/;
  return regex.test(chunk);
}

//extraemos la url de la cadena de texto
export const extractURL = (chunk: string) => {
  const regex = /\[(.*?)\]/;
  const url = chunk.match(regex);
  return url ? url[1] : null;
}