import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}

export const checkCompleteStatusUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { threadId, runId } = options;

  // La firma correcta es retrieve(runID, { thread_id })
  const runStatus = await openai.beta.threads.runs.retrieve(runId, {
    thread_id: threadId,
  });

  console.log({ status: runStatus.status });

  if (runStatus.status === 'completed') {
    return runStatus;
  } 

  // esperar 1 segundo para consultar de nuevo el estatus
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkCompleteStatusUseCase(openai, options);
};
