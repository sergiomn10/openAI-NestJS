import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistantId = 'asst_z9tgcTf0b0X8Pxho5fetGUjL' } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    // instructions:  sobre escribe el asistente, ojo a lo que se indique aqui
  });

  console.log(run);

  return run;
};
