import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private route: ActivatedRoute, private memeService: MemeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.meme = this.memeService.getMakedMeme(this.id) as Meme;
  }

}
