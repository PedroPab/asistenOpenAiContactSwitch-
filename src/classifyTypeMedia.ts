//según la extension del archivo o url devolvemos el tipo de media
//img, video, audio
export const classifyTypeMedia = (url: string) => {
  const extension = url.split('.').pop();
  if (extension === 'jpg' || extension === 'png') {
    return 'img';
  }
  if (extension === 'mp4') {
    return 'video';
  }
  if (extension === 'mp3') {
    return 'audio';
  }
  return 'img';
}