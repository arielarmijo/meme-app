import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Meme } from 'src/app/meme/types/get-meme-response.interface';

@Component({
  selector: 'app-meme-image',
  templateUrl: './meme-image.component.html',
  styleUrls: ['./meme-image.component.css']
})
export class MemeImageComponent implements OnChanges {
  
  loading = true;
  @Input('meme') memeProps!: Meme;

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
  }

}