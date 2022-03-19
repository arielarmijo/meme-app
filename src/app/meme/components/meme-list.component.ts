import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Meme } from '../types/get-meme-response.interface';

@Component({
  selector: 'app-meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {

  @Input('memes') memesProps!: Meme[];
  currentPage = 0;
  itemsPerPage = 4;

  constructor() { }

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
    this.itemsPerPage = 4;
  }

}
