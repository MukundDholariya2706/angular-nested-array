import { QuestionPopComponent } from './../question-pop/question-pop.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  questionForm!: FormGroup;
  showPara = false;
  showCheck = false;

  get f() {
    return this.questionForm.controls;
  }

 get questions(): FormArray{
    return (this.questionForm.controls['question'] as FormArray);
  }

  answerOptionsList(empIndex: number): FormArray {
    return this.questions
      .at(empIndex)
      .get('answerOption') as FormArray;
  }


  constructor(public dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.intitForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(QuestionPopComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      if (result) {
        console.log(result, 'result');
        if (result.queType === 'paragraph') {
          // this.addControls(result);
        } else {
          // this.addControls(result);
          // if()
          (<FormArray>this.questionForm.get('question')).push(result);
        }
      }
    });
  }

  // Form
  private intitForm() {
    this.questionForm = this.fb.group({
      aboutYourSelf: ['', [Validators.required]],
      question: this.fb.array([])
    });
  }

  // submit method

  onReviewAns() {
    console.log('controls', this.questionForm.controls);
    console.log('data', this.questionForm.value);
  }


  // addControls(result: any) {
  //   if(result.queType === '"paragraph"'){
  //     this.questions.push(this.fb.group({
  //       queRequired : result.queRequired,
  //       question : result.question,
  //       queType : result.queType,  
  //     }))
  //   }
  //   else{
  //     this.questions.push(this.fb.group({
  //       queRequired : result.queRequired,
  //       question : result.question,
  //       queType : result.queType,
  //       ownAnswer : result.ownAnswer,
  //       answerOption : [result.answerOption]    
  //     }))

  //   }
  // }


}
