import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { MemeService } from '../../services/meme.service';
import { Meme } from '../../types/get-meme-response.interface';

@Component({
  selector: 'app-my-memes',
  templateUrl: './my-memes.component.html',
  styleUrls: ['./my-memes.component.css']
})
export class MyMemesComponent implements OnInit, OnDestroy {
  
  memes: Meme[] = [];
  currentPage = 0;
  itemsPerPage = 8;
  authSubscription!: Subscription;
  
  constructor(private memeService: MemeService, private auth: AuthService) {}
  
  ngOnInit(): void {
    this.authSubscription = this.auth.user$.subscribe(user => {
      this.memes = this.memeService.getMyMemes(user?.email as string);
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
