import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
     

    
    private openai = new OpenAI({apiKey: process.env['OPENAI_API_KEY']});
    // solo va a llamar casos de uso 

    async orthographyCheck(orthographyDto: OrthographyDto){
        return  await orthographyCheckUseCase(this.openai,{
            prompt: orthographyDto.prompt
        });
    }

    async translate(translateDto: TranslateDto){
        return await translateUseCase(this.openai, {
            prompt: translateDto.prompt, 
            lang: translateDto.lang
        });
    }

    async prosConsDicusser({prompt}: ProsConsDiscusserDto){
        return await prosConsDicusserUseCase(this.openai, {prompt});
    }

    async prosConsDicusserStream({prompt}: ProsConsDiscusserDto){
        return await prosConsDicusserStreamUseCase(this.openai, {prompt});
    }

}
