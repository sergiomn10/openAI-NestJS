import * as path from 'path'; // segregar "* as " para que tome bien todo el path y no nulls"
import * as fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
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

    async textToAudio(textToAudioDto: TextToAudioDto){
        return await textToAudioUseCase(this.openai, {
            prompt: textToAudioDto.prompt, 
            voice: textToAudioDto.voice
        });
    }

    async prosConsDicusser({prompt}: ProsConsDiscusserDto){
        return await prosConsDicusserUseCase(this.openai, {prompt});
    }

    async prosConsDicusserStream({prompt}: ProsConsDiscusserDto){
        return await prosConsDicusserStreamUseCase(this.openai, {prompt});
    }

    async textToAudioGetter(fileId: string) {
        const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);
        
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException(`File ${fileId}  not found`);
        }      

        return filePath;
    }

}
