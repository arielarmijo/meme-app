import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CoreModule } from '../shared/modules/core/core.module';
import { MemeCreatorComponent } from './components/meme-creator/meme-creator.component';
import { MemeImageComponent } from './components/meme-image/meme-image.component';
import { MemeTemplateComponent } from './components/meme-template/meme-template.component';
import { NewMemeComponent } from './components/new-meme/new-meme.component';
import { ViewMemeComponent } from './components/view-meme/view-meme.component';

const routes: Routes = [
  { path: 'view/:id', component: ViewMemeComponent },
  { path: 'create', component: MemeCreatorComponent, canActivate: [AuthGuard] },
  { path: 'create/:id', component: NewMemeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    MemeCreatorComponent,
    NewMemeComponent,
    MemeImageComponent,
    MemeTemplateComponent,
    ViewMemeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CoreModule
  ],
  exports: [
    MemeImageComponent,
    MemeTemplateComponent
  ]
})
export class MemeModule {}