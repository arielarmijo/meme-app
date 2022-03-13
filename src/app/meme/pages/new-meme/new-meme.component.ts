import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemeService } from 'src/app/meme/services/meme.service';
import { Meme } from 'src/app/meme/types/get-meme-response.interface';
import { NewMemeRequest } from 'src/app/meme/types/new-meme-request.interface';

@Component({
  selector: 'app-new-meme',
  templateUrl: './new-meme.component.html',
  styleUrls: ['./new-meme.component.css']
})
export class NewMemeComponent implements OnInit, OnDestroy {

  id!: string;
  meme!: Meme;
  memeForm: FormGroup;
  memeSubcription!: Subscription;

  constructor(private route: ActivatedRoute, private memeService: MemeService, private fb: FormBuilder) {
    this.memeForm = this.fb.group({
      text0: ['', [Validators.required]],
      text1: ['', [Validators.required]]
    });
  }
  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.memeSubcription = this.memeService.getMeme(this.id).subscribe(meme => {
      this.meme = meme as Meme;
    });
  }

  ngOnDestroy(): void {
    this.memeSubcription.unsubscribe();
  }

  handleSubmit() {
    const meme: NewMemeRequest = {
      template_id: this.id,
      text0: this.memeForm.get('text0')?.value,
      text1: this.memeForm.get('text1')?.value
    };
    this.memeForm.reset();
    this.memeService.newMeme(meme).subscribe(resp => {
      this.meme = {...this.meme, url: resp.url};
      this.memeService.saveMeme(this.meme);
    });
  }

}