import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const prosConsDicusserUseCase = async(openai: OpenAI, options: Options) => {
    const { prompt } = options;
    const response = await openai.responses.create({
            model: "gpt-4.1",
            input: [
                {
                    role: "system",
                    content: `
                        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
                        la respuesta debe de ser en formato markdown,
                        los pros y contras deben de estar en una lista,
                    `
                },
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.3,
            max_output_tokens: 150,
        });


    return response.output[0];
}