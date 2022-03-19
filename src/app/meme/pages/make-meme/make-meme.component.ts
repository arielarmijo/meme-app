import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MemeService } from 'src/app/meme/services/meme.service';
import { Meme } from 'src/app/meme/types/get-meme-response.interface';

@Component({
  selector: 'app-make-meme',
  templateUrl: './make-meme.component.html',
  styleUrls: ['./make-meme.component.css']
})
export class MakeMemeComponent {

  memes$: Observable<Meme[]>;

  constructor(private memeService: MemeService) {
    this.memes$ = this.memeService.getMemes();
  }
  
}