import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MemeService } from 'src/app/meme/services/meme.service';
import { Meme } from 'src/app/meme/types/get-meme-response.interface';

@Component({
  selector: 'app-make-meme',
  templateUrl: './make-meme.component.html',
  styleUrls: ['./make-meme.component.css']
})
export class MakeMemeComponent implements OnInit {

  memes$: Observable<Meme[]>;
  currentPage = 0;
  itemsPerPage = 4;

  constructor(private memeService: MemeService) {
    this.memes$ = this.memeService.getMemes();
  }

  ngOnInit(): void {
    this.setItemsPerPage(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.setItemsPerPage(event.target.innerWidth);
  }

  get start() {
    return this.currentPage * (this.itemsPerPage);
  }

  get end() {
    return this.start + (this.itemsPerPage);
  }

  private setItemsPerPage(windowWidth: number): void {
    console.log({windowWidth});
    if (windowWidth >= 1024) {
      this.itemsPerPage = 16;
      return;
    }
    if (windowWidth >= 768) {
      this.itemsPerPage = 9;
      return;
    }
    if (windowWidth >= 425) {
      this.itemsPerPage = 8;
      return;
    }
  }
  
}