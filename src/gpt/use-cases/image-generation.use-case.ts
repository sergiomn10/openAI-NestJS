import * as fs from 'fs';
import OpenAI from 'openai';
import path from 'path';
import { downloadBase64ImageAsPng, downloadImageAsPng } from 'src/helpers';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, originalImage, maskImage } = options;

  // ToDo: verificar original image
  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      prompt: prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    // ToDo: guardar la imagen en FileSystem.
    const filename = await downloadImageAsPng(
      Array.isArray(response.data) && response.data[0]?.url
        ? response.data[0].url
        : '',
    );

    const url = `${process.env.SERVER_URL}/gpt/image-generation/${filename}`;

    return {
      url: url,
      openAIUrl:
        Array.isArray(response.data) && response.data[0]?.url
          ? response.data[0].url
          : '',
      revised_prompt:
        Array.isArray(response.data) && response.data[0]?.revised_prompt
          ? response.data[0].revised_prompt
          : '',
    };
  }

  const pngImagePath = await downloadImageAsPng(originalImage, true);
  const maskPath = await downloadBase64ImageAsPng(maskImage, true);

  //ToDo: Verificar el modelo para que genere la edicion en OpenAI con mask porque esta fallando. Es un ISSUE del API
  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt: prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskPath),
    n: 1,
    size: '1024x1024',
    // quality: 'standard',
    response_format: 'url',
  });

  console.log(response);
  const localImagePath = await downloadImageAsPng(
    Array.isArray(response.data) && response.data[0]?.url
      ? response.data[0].url
      : '',
  );

  const filename = path.basename(localImagePath);
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${filename}`;

  return {
    url: url,
    openAIUrl:
      Array.isArray(response.data) && response.data[0]?.url
        ? response.data[0].url
        : '',
    revised_prompt:
      Array.isArray(response.data) && response.data[0]?.revised_prompt
        ? response.data[0].revised_prompt
        : '',
  };
};
