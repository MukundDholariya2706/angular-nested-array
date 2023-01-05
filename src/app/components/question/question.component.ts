import { QuestionPopupComponent } from './../question-popup/question-popup.component';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface QuestionList {
  questionType: string
  question: string
  ownAnswer?: boolean
  questionRequried?: boolean
  answerOption: AnswerOption[]
}

export interface ModelResult {
  data: QuestionList
}

export interface AnswerOption {
  name: string
  isChecked: any
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  questionListForm!: FormGroup;
  result: any;
  questionList: QuestionList[] = [];

  // get Form Controls
  get f(): { [key: string]: AbstractControl } {
    return this.questionListForm.controls;
  }

  get questionListArray(): FormArray {
    return this.questionListForm.controls['questionList'] as FormArray;
  }

  questionGroup(index: number): { [key: string]: AbstractControl } {
    return (this.questionListArray.at(index) as FormGroup).controls;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  // form declear
  private initForm(): void {
    this.questionListForm = this.fb.group({
      aboutYourSelf: ['', [Validators.required]],
      questionList: new FormArray([]),
    });
  }

  //open Question pop-up
  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: ModelResult) => {
      if (!result?.data?.question) {
        //result is empty
        return;
      }

      if (result?.data) {
        this.result = { ...result.data };
        this.questionList.push(this.result);
        console.log('this.questionList :>> ', this.questionList);
        if (this.result.questionType == 'paragraph') {
          this.queParagraph();
        } else {
          this.queCheckbox();
        }
      }
    });
  }

  // submit button
  onReviewAns(): void {
    this.router.navigateByUrl('/form/answer', {
      state: { answer: this.questionListForm.value },
    });
  }

  queParagraph(): void {
    let c = new FormGroup({
      question: new FormControl(this.result.question),
      answer: new FormControl(
        '',
        this.result.questionRequried ? Validators.required : null
      ),
    });

    (<FormArray>this.questionListForm.get('questionList')).push(c);
  }

  queCheckbox(): void {
    let c = new FormGroup({
      question: new FormControl(this.result.question),
      answer: new FormArray(
        [],
        this.result.questionRequried ? Validators.required : null
      ),
      ownAnswer: new FormControl(),
    });

    (<FormArray>this.questionListForm.get('questionList')).push(c);
  }

  onCheckboxChange(e: any, index: number): void {
    const checkArray: FormArray = this.questionGroup(index)[
      'answer'
    ] as FormArray;
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

  updateValidation(event: any, index: number): void {
    if (!this.questionList[index].questionRequried) return;
    if (event.target.value != '') {
      (this.questionGroup(index)['answer'] as FormArray).setValidators(null);
      (
        this.questionGroup(index)['answer'] as FormArray
      ).updateValueAndValidity();
    } else {
      (this.questionGroup(index)['answer'] as FormArray).setValidators(
        Validators.required
      );
      (
        this.questionGroup(index)['answer'] as FormArray
      ).updateValueAndValidity();
    }
  }
}
