import { QuestionPopupComponent } from './../question-popup/question-popup.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  questionListForm!: FormGroup;
  result: any;
  questionList: any[] = [];

  // get Form Controls
  get f() {
    return this.questionListForm.controls;
  }

  get questionListArray() {
    return this.questionListForm.controls['questionList'] as FormArray;
  }

  questionGroup(index: number){
    return (this.questionListArray.at(index) as FormGroup).controls;
  }

  constructor(
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  // form declear
  private initForm() {
    this.questionListForm = this.fb.group({
      aboutYourSelf: ['', [Validators.required]],
      questionList: new FormArray([])
    });
  }

  //open Question pop-up
  openDialog() {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result?.data?.question) {
        //result is empty
        return
      }

      if (result?.data) {
        this.result = {...result.data};
        this.questionList.push(this.result);
        if(this.result.questionType == "paragraph") {
          this.queParagraph();
        }
        else{
          this.queCheckbox();
        }
      }
    });
  }

  // submit button
  onReviewAns() {
    this.router.navigateByUrl('/form/answer', {state: { answer: this.questionListForm.value}})
  }

  queParagraph(){
    let c = new FormGroup({
      question: new FormControl(this.result.question),
      answer: new FormControl('', this.result.questionRequried ? Validators.required : null)
    });

    (<FormArray>this.questionListForm.get('questionList')).push(c);
  }

  queCheckbox(){
    let c = new FormGroup({
      question: new FormControl(this.result.question),
      answer: new FormArray([], this.result.questionRequried ? Validators.required : null),
      ownAnswer: new FormControl()
    });
    
    (<FormArray>this.questionListForm.get('questionList')).push(c);
  }

  onCheckboxChange(e: any, index: number) {
    const checkArray: FormArray = this.questionGroup(index)['answer'] as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  updateValidation(event: any, index: number){
    if(!this.questionList[index].questionRequried) return;
    if(event.target.value != ''){
      (this.questionGroup(index)['answer'] as FormArray).setValidators(null);
      (this.questionGroup(index)['answer'] as FormArray).updateValueAndValidity();
    } else {
      (this.questionGroup(index)['answer'] as FormArray).setValidators(Validators.required);
      (this.questionGroup(index)['answer'] as FormArray).updateValueAndValidity();
    }
  }
}
