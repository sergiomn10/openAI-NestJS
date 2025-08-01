import OpenAI from "openai";

interface Options {
    prompt: string;
}


export const orthographyCheckUseCase = async( openai: OpenAI, options: Options) => {
    

  const { prompt } = options;

    const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
        {
            role: "system",
            content: `
                Te serán proveídos textos con posibles errores ortográficos y gramaticales,
                Debes de responder en formato JSON,
                tu tarea es corregirlos y retornar información soluciones,
                también debes de dar un porcentaje de acierto por el usuario,

                Si no hay errores, debes de retornar un mensaje de felicitaciones.            

                Ejemplo de salida:
                {
                    userScore: number,
                    errors: string[], // ['error -> solucion']
                    message: string, // Usa emojis y texto parafelicitar al usuario
                }
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

    // console.log(response);

    return JSON.parse(response.output_text);
    
}