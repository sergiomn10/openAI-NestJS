import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;
  
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}: ${prompt}`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_output_tokens: 150,
  });

  return { message: response.output_text};
};
