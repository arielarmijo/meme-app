import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MemeService } from 'src/app/meme/services/meme.service';
import { Meme } from 'src/app/meme/types/get-meme-response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memes!: Meme[];
  currentPage = 0;
  itemsPerPage = 8;
 
  constructor(public auth: AuthService, private memeService: MemeService) {

  }

  ngOnInit(): void {
    this.memes = this.memeService.getMakedMemes();
  }

 

}