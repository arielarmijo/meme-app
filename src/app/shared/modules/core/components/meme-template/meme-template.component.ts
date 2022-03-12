import { Component, Input } from '@angular/core';
import { Meme } from 'src/app/meme/types/get-meme-response.interface';

@Component({
  selector: 'app-meme-template',
  templateUrl: './meme-template.component.html',
  styleUrls: ['./meme-template.component.css']
})
export class MemeTemplateComponent { 

  @Input('meme') memeProps!: Meme;

}