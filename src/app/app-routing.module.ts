import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form/builder',
    pathMatch: 'full'
  },
  {
    path: 'form/builder',
    component: QuestionComponent,
  },
  {
    path: 'form/answer',
    component: AnswerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
