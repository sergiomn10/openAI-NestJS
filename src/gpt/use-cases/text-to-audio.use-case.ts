import OpenAI from 'openai';
import * as path from 'path'; // segregar "* as " para que tome bien todo el path y no nulls"
import * as fs from 'fs';

interface Options {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (
  openai: OpenAI,
  { prompt, voice }: Options,
) => {
  if (!voice) {
    voice = 'alloy';
  }

  const voices = {
    alloy: 'alloy',
    ash: 'ash',
    ballad: 'ballad',
    coral: 'coral',
    echo: 'echo',
    sage: 'sage',
    shimmer: 'shimmer',
    verse: 'verse',
  };

  const selectedVoice = voices[voice] ?? 'alloy';

  const folderPath = path.resolve(__dirname, '../../../generated/audios/');
  const speechfile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true }); // por si no existe la carpeta, la crea recursivamente

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: prompt,
    response_format: 'mp3',
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.writeFileSync(speechfile, buffer);

  return speechfile;
};
