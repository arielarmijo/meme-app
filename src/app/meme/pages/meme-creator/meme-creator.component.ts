import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MemeService } from 'src/app/meme/services/meme.service';
import { Meme } from 'src/app/meme/types/get-meme-response.interface';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.css']
})
export class MemeCreatorComponent {

  memes$: Observable<Meme[]>;
  currentPage = 0;
  itemsPerPage = 8;

  constructor(private memeService: MemeService) {
    this.memes$ = this.memeService.getMemes();
  }

  get start() {
    return this.currentPage * (this.itemsPerPage);
  }

  get end() {
    return this.start + (this.itemsPerPage);
  }
  
}