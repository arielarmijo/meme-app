import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Location } from '@angular/common'
import { MemeService } from '../../services/meme.service';
import { Meme } from '../../types/get-meme-response.interface';

@Component({
  selector: 'app-view-meme',
  templateUrl: './view-meme.component.html',
  styleUrls: ['./view-meme.component.css']
})
export class ViewMemeComponent implements OnInit {

  id!: string;
  meme!: Meme;

  constructor(
    private route: ActivatedRoute,
    private memeService: MemeService,
    public auth: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.meme = this.memeService.getMakedMeme(this.id) as Meme;
  }

  goBack() {
    this.location.back();
  }

  deleteMeme() {
    this.memeService.deleteMeme(this.id);
    this.router.navigateByUrl('/home');
  }

}
