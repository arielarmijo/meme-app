import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CoreModule } from '../shared/modules/core/core.module';
import { MakeMemeComponent } from './pages/make-meme/make-meme.component';
import { MyMemesComponent } from './pages/my-memes/my-memes.component';
import { NewMemeComponent } from './pages/new-meme/new-meme.component';
import { ViewMemeComponent } from './pages/view-meme/view-meme.component';

const routes: Routes = [
  { path: 'view/:id', component: ViewMemeComponent },
  { path: 'create', component: MakeMemeComponent, canActivate: [AuthGuard] },
  { path: 'create/:id', component: NewMemeComponent, canActivate: [AuthGuard] },
  { path: 'my-memes', component: MyMemesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    MakeMemeComponent,
    NewMemeComponent,
    ViewMemeComponent,
    MyMemesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CoreModule
  ],
  exports: []
})
export class MemeModule {}