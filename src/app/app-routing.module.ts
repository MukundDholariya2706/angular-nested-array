import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: '',
  redirectTo: 'form/builder',
  pathMatch: 'full'
} , 
{
  path: 'form',
  children: [
    {
      path: 'builder',
      component: QuestionComponent
    },
    {
      path: 'answer',
      component: AnswerComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
